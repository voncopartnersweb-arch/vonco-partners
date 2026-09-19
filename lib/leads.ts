import {
  PREFERRED_CONTACT_METHODS,
  type PreferredContactMethod,
} from './contact-methods';

export type DriverLead = {
  name: string;
  phoneNumber: string;
  email: string;
  city: string;
  preferredContactMethods: PreferredContactMethod[];
  locale: string;
  pagePath: string;
};

const CITY_LABELS: Record<string, string> = {
  katowice: 'Katowice',
  krakow: 'Krakow',
  gdansk: 'Gdansk',
  gdynia: 'Gdynia',
  sopot: 'Sopot',
  bielsko_biala: 'Bielsko-Biala',
  oswiecim: 'Oswiecim',
  zakopane: 'Zakopane',
  zator: 'Zator',
};

const SUPPORTED_LOCALES = new Set([
  'uk',
  'pl',
  'en',
  'ru',
  'es',
  'hy',
  'be',
  'ro',
  'ka',
  'uz',
  'kk',
  'az',
  'tg',
]);

const PREFERRED_CONTACT_METHOD_SET = new Set<string>(
  PREFERRED_CONTACT_METHODS,
);

const PREFERRED_CONTACT_METHOD_LABELS: Record<PreferredContactMethod, string> = {
  telegram: 'Telegram',
  viber: 'Viber',
  whatsapp: 'WhatsApp',
  call: 'Phone call',
  sms: 'SMS',
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function cleanString(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
      })[character] || character,
  );
}

export function parseLeadPayload(payload: unknown):
  | { status: 'valid'; lead: DriverLead }
  | { status: 'invalid' }
  | { status: 'spam' } {
  if (!isRecord(payload)) return { status: 'invalid' };
  if (cleanString(payload.company, 100)) return { status: 'spam' };

  const name = cleanString(payload.name, 100);
  const phoneNumber = cleanString(payload.phoneNumber, 40);
  const email = cleanString(payload.email, 254).toLowerCase();
  const city = cleanString(payload.city, 40);
  const preferredContactMethods = Array.isArray(
    payload.preferredContactMethods,
  )
    ? [
        ...new Set(
          payload.preferredContactMethods
            .map((method) => cleanString(method, 20).toLowerCase())
            .filter((method): method is PreferredContactMethod =>
              PREFERRED_CONTACT_METHOD_SET.has(method),
            ),
        ),
      ]
    : [];
  const locale = cleanString(payload.locale, 10).toLowerCase();
  const rawPagePath = cleanString(payload.pagePath, 500);
  const pagePath = /^\/[a-z0-9/_?&=.%+-]*$/i.test(rawPagePath)
    ? rawPagePath
    : '/';

  const hasValidName = !name || name.length >= 2;
  const hasValidPhone =
    !phoneNumber || /^[+\d][\d\s().-]{5,39}$/.test(phoneNumber);
  const hasValidEmail =
    !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const hasValidCity = !city || Object.hasOwn(CITY_LABELS, city);
  const hasValidLocale = SUPPORTED_LOCALES.has(locale);
  const hasContact = Boolean(phoneNumber || email);

  if (
    !hasContact ||
    !hasValidName ||
    !hasValidPhone ||
    !hasValidEmail ||
    !hasValidCity ||
    !hasValidLocale
  ) {
    return { status: 'invalid' };
  }

  return {
    status: 'valid',
    lead: {
      name,
      phoneNumber,
      email,
      city,
      preferredContactMethods,
      locale,
      pagePath,
    },
  };
}

export function buildLeadEmail(lead: DriverLead) {
  const cityLabel = CITY_LABELS[lead.city] || lead.city;
  const fallback = 'Not provided';
  const preferredContact = lead.preferredContactMethods.length
    ? lead.preferredContactMethods
        .map((method) => PREFERRED_CONTACT_METHOD_LABELS[method])
        .join(', ')
    : fallback;
  const rows = [
    ['Name', lead.name || fallback],
    ['Phone', lead.phoneNumber || fallback],
    ['Email', lead.email || fallback],
    ['City', cityLabel || fallback],
    ['Preferred contact', preferredContact],
    ['Language', lead.locale],
    ['Source', lead.pagePath],
  ];

  return {
    subject: cityLabel
      ? `New driver application - ${cityLabel}`
      : 'New driver application',
    text: rows.map(([label, value]) => `${label}: ${value}`).join('\n'),
    html: `
      <div style="font-family:Arial,sans-serif;color:#172033">
        <h1 style="font-size:22px">New driver application</h1>
        <table style="border-collapse:collapse">
          <tbody>
            ${rows
              .map(
                ([label, value]) =>
                  `<tr><th style="padding:8px 12px 8px 0;text-align:left;vertical-align:top">${escapeHtml(label)}</th><td style="padding:8px 0">${escapeHtml(value)}</td></tr>`,
              )
              .join('')}
          </tbody>
        </table>
      </div>
    `.trim(),
  };
}

export function isSameOriginRequest(request: Request) {
  const origin = request.headers.get('origin');
  if (!origin) return false;

  try {
    const requestUrl = new URL(request.url);
    const requestHost =
      request.headers.get('x-forwarded-host')?.split(',')[0]?.trim() ||
      request.headers.get('host') ||
      requestUrl.host;
    const requestProtocol =
      request.headers.get('x-forwarded-proto')?.split(',')[0]?.trim() ||
      requestUrl.protocol.replace(':', '');
    const expectedOrigin = `${requestProtocol.toLowerCase()}://${requestHost.toLowerCase()}`;

    return new URL(origin).origin.toLowerCase() === expectedOrigin;
  } catch {
    return false;
  }
}
