import type { SupportedLocale } from '@/lib/seo';

const ALL_LOCALES: SupportedLocale[] = [
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
];

export type CityConfig = {
  slug: string;
  enabledLocales: SupportedLocale[];
  platforms: AppConfig['slug'][];
  indexablePlatforms: AppConfig['slug'][];
  updatedAt: string;
};

export type AppConfig = {
  slug: 'uber' | 'bolt' | 'freenow';
  name: string;
};

export const CITY_PAGES: CityConfig[] = [
  {
    slug: 'krakow',
    enabledLocales: ALL_LOCALES,
    platforms: ['uber', 'bolt', 'freenow'],
    indexablePlatforms: ['uber', 'bolt', 'freenow'],
    updatedAt: '2026-03-30',
  },
  {
    slug: 'katowice',
    enabledLocales: ALL_LOCALES,
    platforms: ['uber', 'bolt', 'freenow'],
    indexablePlatforms: ['uber', 'bolt', 'freenow'],
    updatedAt: '2026-03-30',
  },
  {
    slug: 'zakopane',
    enabledLocales: ALL_LOCALES,
    platforms: ['uber', 'bolt', 'freenow'],
    indexablePlatforms: ['uber', 'bolt', 'freenow'],
    updatedAt: '2026-03-30',
  },
  {
    slug: 'gdansk',
    enabledLocales: ALL_LOCALES,
    platforms: ['uber', 'bolt', 'freenow'],
    indexablePlatforms: ['uber', 'bolt', 'freenow'],
    updatedAt: '2026-03-30',
  },
  {
    slug: 'bielsko-biala',
    enabledLocales: ALL_LOCALES,
    platforms: ['uber', 'bolt', 'freenow'],
    indexablePlatforms: ['uber', 'bolt', 'freenow'],
    updatedAt: '2026-07-17',
  },
  {
    slug: 'gdynia',
    enabledLocales: ALL_LOCALES,
    platforms: ['uber', 'bolt', 'freenow'],
    indexablePlatforms: ['uber', 'bolt', 'freenow'],
    updatedAt: '2026-07-17',
  },
  {
    slug: 'sopot',
    enabledLocales: ALL_LOCALES,
    platforms: ['uber', 'bolt', 'freenow'],
    indexablePlatforms: ['uber', 'bolt', 'freenow'],
    updatedAt: '2026-07-17',
  },
  {
    slug: 'oswiecim',
    enabledLocales: ALL_LOCALES,
    platforms: ['uber', 'bolt', 'freenow'],
    indexablePlatforms: ['uber', 'bolt', 'freenow'],
    updatedAt: '2026-07-20',
  },
  {
    slug: 'zator',
    enabledLocales: ALL_LOCALES,
    platforms: ['uber', 'bolt', 'freenow'],
    indexablePlatforms: ['uber', 'bolt', 'freenow'],
    updatedAt: '2026-07-20',
  },
];

export const APP_PAGES: AppConfig[] = [
  { slug: 'uber', name: 'Uber' },
  { slug: 'bolt', name: 'Bolt' },
  { slug: 'freenow', name: 'Free Now' },
];

export function getCityBySlug(slug: string): CityConfig | undefined {
  return CITY_PAGES.find((city) => city.slug === slug);
}

export function getAppBySlug(slug: string): AppConfig | undefined {
  return APP_PAGES.find((app) => app.slug === slug);
}

export function getAppsForCity(city: CityConfig, indexableOnly = false) {
  const slugs = indexableOnly ? city.indexablePlatforms : city.platforms;
  return slugs
    .map((slug) => getAppBySlug(slug))
    .filter((app): app is AppConfig => Boolean(app));
}

export function isCityEnabledForLocale(city: CityConfig, locale: string) {
  return city.enabledLocales.some((enabledLocale) => enabledLocale === locale);
}
