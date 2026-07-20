import { NextResponse } from 'next/server';
import {
  convertToModelMessages,
  streamText,
  validateUIMessages,
  type UIMessage,
} from 'ai';

import { buildAiSystemPrompt } from '@/data/ai';
import { SUPPORTED_LOCALES, type SupportedLocale } from '@/lib/seo';

export const maxDuration = 30;

const MAX_MESSAGE_LENGTH = 1500;
const MAX_HISTORY_ITEMS = 12;
const MAX_REQUEST_BYTES = 60_000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 12;

const requestLog = new Map<string, number[]>();
let lastRateLimitCleanup = 0;

const NO_STORE_HEADERS = {
  'Cache-Control': 'private, no-store, max-age=0',
  Vary: 'Origin',
};

function jsonResponse(
  body: Record<string, unknown>,
  init: { status?: number; headers?: Record<string, string> } = {},
) {
  return NextResponse.json(body, {
    status: init.status,
    headers: { ...NO_STORE_HEADERS, ...init.headers },
  });
}

function getClientIp(req: Request) {
  const forwardedFor = req.headers.get('x-forwarded-for');
  return forwardedFor?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown';
}

function isRateLimited(ip: string, now: number) {
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

function getText(message: UIMessage) {
  return message.parts
    .filter((part): part is Extract<typeof part, { type: 'text' }> => part.type === 'text')
    .map((part) => part.text)
    .join('\n')
    .trim();
}

function sanitizeMessages(messages: UIMessage[]) {
  return messages
    .filter((message) => message.role === 'user' || message.role === 'assistant')
    .map((message) => ({
      ...message,
      parts: [{ type: 'text' as const, text: getText(message).slice(0, MAX_MESSAGE_LENGTH) }],
    }))
    .filter((message) => message.parts[0].text.length > 0)
    .slice(-MAX_HISTORY_ITEMS);
}

export async function POST(req: Request) {
  const origin = req.headers.get('origin');
  if (origin && origin !== new URL(req.url).origin) {
    return jsonResponse({ error: 'Request origin is not allowed.' }, { status: 403 });
  }

  if (!(req.headers.get('content-type') || '').toLowerCase().includes('application/json')) {
    return jsonResponse({ error: 'JSON request expected.' }, { status: 415 });
  }

  const contentLength = Number(req.headers.get('content-length') || 0);
  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
    return jsonResponse({ error: 'Request is too large.' }, { status: 413 });
  }

  if (isRateLimited(getClientIp(req), Date.now())) {
    return jsonResponse(
      { error: 'Too many requests. Please try again in a minute.' },
      { status: 429, headers: { 'Retry-After': '60' } },
    );
  }

  try {
    const payload = (await req.json()) as Record<string, unknown>;
    const validatedMessages = await validateUIMessages({ messages: payload.messages });
    const messages = sanitizeMessages(validatedMessages);
    const lastMessage = messages.at(-1);

    if (!lastMessage || lastMessage.role !== 'user' || !getText(lastMessage)) {
      return jsonResponse({ error: 'A user message is required.' }, { status: 400 });
    }

    const localeCandidate =
      typeof payload.locale === 'string' ? payload.locale.toLowerCase() : '';
    const locale = SUPPORTED_LOCALES.includes(localeCandidate as SupportedLocale)
      ? (localeCandidate as SupportedLocale)
      : 'uk';
    const currentPath =
      typeof payload.currentPath === 'string' && /^\/[a-z0-9/_-]*$/i.test(payload.currentPath)
        ? payload.currentPath.slice(0, 200)
        : '/';

    const result = streamText({
      model: 'openai/gpt-5.4-mini',
      system: buildAiSystemPrompt(locale, currentPath),
      messages: await convertToModelMessages(messages),
      maxOutputTokens: 900,
      timeout: 25_000,
      providerOptions: {
        gateway: {
          models: ['google/gemini-3-flash', 'anthropic/claude-haiku-4.5'],
          tags: ['vonco-assistant', 'knowledge-2026-07-20-4'],
        },
      },
      onError: ({ error }) => {
        console.error('Vonco assistant stream error:', error);
      },
    });

    return result.toUIMessageStreamResponse({
      headers: NO_STORE_HEADERS,
      onError: () => 'The assistant is temporarily unavailable.',
    });
  } catch (error) {
    console.error('Vonco assistant request error:', error);
    return jsonResponse({ error: 'Invalid chat request.' }, { status: 400 });
  }
}
