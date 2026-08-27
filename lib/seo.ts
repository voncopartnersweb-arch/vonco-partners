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
// Russian is the primary acquisition language for new driver leads. The public
// root remains Polish to preserve already indexed URLs, while x-default and
// sitemap weighting point search engines to the Russian commercial content.
export const SEO_PRIORITY_LOCALE: SupportedLocale = 'ru';
// Georgian content currently contains a large block of Armenian fallback copy.
// Keep the route available to users, but do not advertise it to search engines
// until the translation has been independently reviewed.
export const INDEXABLE_LOCALES = SUPPORTED_LOCALES.filter(
  (locale): locale is Exclude<SupportedLocale, 'ka'> => locale !== 'ka',
);
// Vercel serves the www host directly and permanently redirects the apex host.
// Keep every generated canonical, hreflang, sitemap, and structured-data URL on
// the serving host so crawlers never have to cross a redirect.
export const SITE_URL = 'https://www.vonco.partners';
export const SITE_NAME = 'Vonco Partners';
export const SEO_TITLE_MAX_LENGTH = 60;
export const SEO_DESCRIPTION_MAX_LENGTH = 160;

function truncateAtWord(value: string, maxLength: number) {
  const chars = Array.from(value.trim());
  if (chars.length <= maxLength) return chars.join('');

  const candidate = chars.slice(0, maxLength + 1).join('');
  const lastSpace = candidate.lastIndexOf(' ');
  const cutAt = lastSpace >= Math.floor(maxLength * 0.65) ? lastSpace : maxLength;
  return Array.from(candidate).slice(0, cutAt).join('').trim();
}

function cleanTitleBoundary(value: string) {
  return value
    .replace(/[\s:;,.|/–—-]+$/u, '')
    .replace(/\s+(?:and|or|i|oraz|і|та|й|и|або|lub|или|y|e|և|და|va|және|və)$/iu, '')
    .trim();
}

export function buildTitle(
  rawTitle: string,
  options: { includeBrand?: boolean; maxLength?: number } = {},
) {
  const includeBrand = options.includeBrand ?? true;
  const maxLength = options.maxLength ?? SEO_TITLE_MAX_LENGTH;
  const normalized = rawTitle.replace(/\s+/g, ' ').trim();
  const brandSuffixPattern = /\s*(?:\||—|–|-)\s*Vonco Partners\s*$/i;
  const withoutSuffix = normalized.replace(brandSuffixPattern, '').trim();
  const alreadyContainsBrand = withoutSuffix.toLowerCase().includes(SITE_NAME.toLowerCase());

  if (!includeBrand || alreadyContainsBrand) {
    return cleanTitleBoundary(truncateAtWord(withoutSuffix, maxLength));
  }

  const suffix = ` | ${SITE_NAME}`;
  const available = Math.max(1, maxLength - Array.from(suffix).length);
  return `${cleanTitleBoundary(truncateAtWord(withoutSuffix, available))}${suffix}`;
}

export function buildDescription(rawDescription: string, maxLength = SEO_DESCRIPTION_MAX_LENGTH) {
  return truncateAtWord(rawDescription.replace(/\s+/g, ' ').trim(), maxLength);
}

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

export function buildLanguageAlternates(
  path: string,
  locales: readonly SupportedLocale[] = INDEXABLE_LOCALES,
) {
  const normalizedPath = normalizeLocalizedPath(path);
  const indexableLocales = locales.filter((locale) => locale !== 'ka');

  const languages = indexableLocales.reduce<Record<string, string>>(
    (acc, locale) => {
      acc[HREFLANG_BY_LOCALE[locale]] = getLocalizedPath(locale, normalizedPath);
      return acc;
    },
    {},
  );

  const fallbackLocale = indexableLocales.some(
    (locale) => locale === SEO_PRIORITY_LOCALE,
  )
    ? SEO_PRIORITY_LOCALE
    : indexableLocales.some((locale) => locale === DEFAULT_LOCALE)
      ? DEFAULT_LOCALE
      : indexableLocales[0];

  if (fallbackLocale) {
    languages['x-default'] = getLocalizedPath(fallbackLocale, normalizedPath);
  }
  return languages;
}

export function buildLanguageAlternateUrls(
  path: string,
  locales: readonly SupportedLocale[] = INDEXABLE_LOCALES,
) {
  const normalizedPath = normalizeLocalizedPath(path);
  const indexableLocales = locales.filter((locale) => locale !== 'ka');

  const languages = indexableLocales.reduce<Record<string, string>>(
    (acc, locale) => {
      acc[HREFLANG_BY_LOCALE[locale]] = getLocalizedUrl(locale, normalizedPath);
      return acc;
    },
    {},
  );

  const fallbackLocale = indexableLocales.some(
    (locale) => locale === SEO_PRIORITY_LOCALE,
  )
    ? SEO_PRIORITY_LOCALE
    : indexableLocales.some((locale) => locale === DEFAULT_LOCALE)
      ? DEFAULT_LOCALE
      : indexableLocales[0];

  if (fallbackLocale) {
    languages['x-default'] = getLocalizedUrl(fallbackLocale, normalizedPath);
  }
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

export function isIndexableLocale(locale: string): locale is SupportedLocale {
  return INDEXABLE_LOCALES.some((candidate) => candidate === locale);
}
