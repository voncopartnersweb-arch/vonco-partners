export const SUPPORTED_LOCALES = [
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
] as const;

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: SupportedLocale = 'pl';
export const SITE_URL = 'https://vonco.partners';

const HREFLANG_BY_LOCALE: Record<SupportedLocale, string> = {
  uk: 'uk-UA',
  pl: 'pl-PL',
  en: 'en-US',
  ru: 'ru-RU',
  es: 'es-ES',
  hy: 'hy-AM',
  be: 'be-BY',
  ro: 'ro-RO',
  ka: 'ka-GE',
  uz: 'uz-UZ',
  kk: 'kk-KZ',
  az: 'az-AZ',
  tg: 'tg-TJ',
};

export function buildLanguageAlternates(path: string) {
  const normalizedPath = normalizeLocalizedPath(path);

  const languages = SUPPORTED_LOCALES.reduce<Record<string, string>>(
    (acc, locale) => {
      acc[HREFLANG_BY_LOCALE[locale]] = getLocalizedPath(locale, normalizedPath);
      return acc;
    },
    {},
  );

  languages['x-default'] = getLocalizedPath(DEFAULT_LOCALE, normalizedPath);
  return languages;
}

export function normalizeLocalizedPath(path: string) {
  return path === '' || path === '/' ? '' : path.startsWith('/') ? path : `/${path}`;
}

export function getLocalizedPath(locale: SupportedLocale | string, path = '') {
  const normalizedPath = normalizeLocalizedPath(path);
  return locale === DEFAULT_LOCALE ? normalizedPath || '/' : `/${locale}${normalizedPath}`;
}

export function getLocalizedUrl(locale: SupportedLocale | string, path = '') {
  return `${SITE_URL}${getLocalizedPath(locale, path)}`;
}
