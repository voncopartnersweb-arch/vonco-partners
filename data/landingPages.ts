export type CityConfig = {
  slug: string;
};

export type AppConfig = {
  slug: 'uber' | 'bolt' | 'freenow';
  name: string;
};

export const CITY_PAGES: CityConfig[] = [
  { slug: 'krakow' },
  { slug: 'katowice' },
  { slug: 'zakopane' },
  { slug: 'gdansk' },
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
