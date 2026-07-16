import { NextResponse } from 'next/server';

import { generateText } from 'ai';
import 'dotenv/config';
import { AI_SYSTEM_PROMPT, COMPANY_POLICY } from '@/data/ai';
import { COMPANY } from '@/data/company';
import { cars, formatCarBuyoutPrice, formatCarWeeklyRent } from '@/data/cars';
import { SUPPORTED_LOCALES, type SupportedLocale } from '@/lib/seo';

const MAX_MESSAGE_LENGTH = 1500;
const MAX_HISTORY_ITEMS = 12;
const MAX_HISTORY_ITEM_LENGTH = 1200;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 12;
const MAX_REQUEST_BYTES = 50_000;

const requestLog = new Map<string, number[]>();
let lastRateLimitCleanup = 0;

const NO_STORE_HEADERS = {
  'Cache-Control': 'private, no-store, max-age=0',
  Vary: 'Origin',
};

function jsonResponse(
  body: Record<string, unknown>,
  init: { status?: number } = {},
) {
  return NextResponse.json(body, {
    ...init,
    headers: NO_STORE_HEADERS,
  });
}

function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() || 'unknown';
  }

  return req.headers.get('x-real-ip') || 'unknown';
}

function isRateLimited(ip: string, now: number): boolean {
  if (now - lastRateLimitCleanup >= RATE_LIMIT_WINDOW_MS) {
    for (const [loggedIp, timestamps] of requestLog) {
      const recent = timestamps.filter(
        (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
      );
      if (recent.length) requestLog.set(loggedIp, recent);
      else requestLog.delete(loggedIp);
    }
    lastRateLimitCleanup = now;
  }

  const recent = (requestLog.get(ip) || []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  );
  recent.push(now);
  requestLog.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX_REQUESTS;
}

export async function POST(req: Request) {
  try {
    const origin = req.headers.get('origin');
    if (origin && origin !== new URL(req.url).origin) {
      return jsonResponse({ error: 'Недозволене джерело запиту' }, { status: 403 });
    }

    const contentType = req.headers.get('content-type') || '';
    if (!contentType.toLowerCase().includes('application/json')) {
      return jsonResponse(
        { error: 'Очікується запит у форматі JSON' },
        { status: 415 },
      );
    }

    const contentLength = Number(req.headers.get('content-length') || 0);
    if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
      return jsonResponse({ error: 'Запит завеликий' }, { status: 413 });
    }

    const now = Date.now();
    const clientIp = getClientIp(req);

    if (isRateLimited(clientIp, now)) {
      return jsonResponse(
        { error: 'Забагато запитів. Спробуйте ще раз трохи пізніше.' },
        { status: 429 }
      );
    }

    let data: unknown;
    try {
      data = await req.json();
    } catch {
      return jsonResponse({ error: 'Некоректний JSON' }, { status: 400 });
    }

    const payload = data && typeof data === 'object'
      ? (data as Record<string, unknown>)
      : {};
    const message =
      typeof payload.message === 'string'
        ? payload.message.trim().slice(0, MAX_MESSAGE_LENGTH)
        : '';
    const history = Array.isArray(payload.history)
      ? payload.history
          .filter(
            (item: unknown): item is { role: 'user' | 'assistant'; content: string } =>
              !!item &&
              typeof item === 'object' &&
              typeof (item as { role?: unknown }).role === 'string' &&
              ['user', 'assistant'].includes((item as { role: string }).role) &&
              typeof (item as { content?: unknown }).content === 'string'
          )
          .map((item: { role: 'user' | 'assistant'; content: string }) => ({
            role: item.role,
            content: item.content.slice(0, MAX_HISTORY_ITEM_LENGTH),
          }))
          .slice(-MAX_HISTORY_ITEMS)
      : [];
    const localeCandidate =
      typeof payload.locale === 'string' ? payload.locale.toLowerCase() : '';
    const locale = SUPPORTED_LOCALES.includes(localeCandidate as SupportedLocale)
      ? (localeCandidate as SupportedLocale)
      : 'uk';

    if (!message) {
      return jsonResponse(
        { error: 'Повідомлення порожнє' },
        { status: 400 }
      );
    }

    const cityHint = /катов|katow/i.test(message)
      ? `\n\nДОДАТКОВО: якщо питання про Катовіце, використовуй контакт ${COMPANY.phones.katowiceRegion.display}.`
      : '';
    const localizedPath = (path: string) => `/${locale}${path}`;
    const linksHint = `

🌐 ЛОКАЛІЗОВАНІ ПОСИЛАННЯ (використовуй їх у відповідях):
- Про нас: ${localizedPath(COMPANY.links.about)}
- Послуги: ${localizedPath(COMPANY.links.services)}
- Усі авто: ${localizedPath(COMPANY.links.cars)}
- Контакти: ${localizedPath(COMPANY.links.contacts)}
- Робота: ${localizedPath(COMPANY.links.work)}
- Політика конфіденційності: ${localizedPath(COMPANY.links.privacyPolicy)}
`;
    const fleetHint = `

🚗 АКТУАЛЬНИЙ ФЛОТ (джерело: data/cars.tsx)
${cars
  .map(
    (car) =>
      `- ${car.name}: оренда ${formatCarWeeklyRent(car, 'uk')}; орієнтовний викуп ${formatCarBuyoutPrice(car, 'uk')}; категорії ${car.rideCategories.join(', ')}`
  )
  .join('\n')}
`;
    const languagePolicyHint = `

🌐 МОВНЕ ПРАВИЛО (АКТУАЛЬНЕ):
- Відповідай мовою користувача.
- Підтримувані мови сайту: uk, pl, en, ru, es, be, ro, ka, uz, tg, kk, az, hy.
- Не відмовляй у відповіді російською чи іспанською.
`;

    const result = await generateText({
      model: 'google/gemini-2.5-flash-lite',
      system:
        AI_SYSTEM_PROMPT +
        COMPANY_POLICY +
        cityHint +
        linksHint +
        fleetHint +
        languagePolicyHint,

      messages: [
        ...history,
        { role: 'user', content: message },
      ],
    });

    return jsonResponse({
      status: 'ok',
      text: result.text,
    });
  } catch (err) {
    console.error('AI Error:', err);
    return jsonResponse({ error: 'Помилка генерації' }, { status: 500 });
  }
}
