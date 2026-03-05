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
  const normalizedPath =
    path === '' || path === '/' ? '' : path.startsWith('/') ? path : `/${path}`;

  const languages = SUPPORTED_LOCALES.reduce<Record<string, string>>(
    (acc, locale) => {
      acc[HREFLANG_BY_LOCALE[locale]] = `/${locale}${normalizedPath}`;
      return acc;
    },
    {},
  );

  languages['x-default'] = `/en${normalizedPath}`;
  return languages;
}
