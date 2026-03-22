import { MetadataRoute } from 'next';
import { cars } from '@/data/cars';
import { SUPPORTED_LOCALES } from '@/lib/seo';
import { APP_PAGES, CITY_PAGES } from '@/data/landingPages';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const BASE_URL = 'https://vonco.partners';

  // Всі твої мови
  const locales = [...SUPPORTED_LOCALES];

  // Всі твої основні сторінки
  const paths = [
    '', // Головна
    '/cities', // Міста та апки
    '/about', // Про нас
    '/services', // Послуги
    '/cars', // Наші авто
    '/work', // Робота
    '/contacts', // Контакти
    '/privacy-policy', // Політика конфіденційності
  ];

  // Створюємо масив записів для кожної мови та кожної сторінки
  // Avoid using `flatMap` to reduce need for polyfills in some environments
  const entries = locales.reduce((acc, lang) => {
    const staticPages = paths.map((path) => ({
      url: `${BASE_URL}/${lang}${path}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: path === '' ? 1.0 : 0.8,
    }));

    const carPages = cars.map((car) => ({
      url: `${BASE_URL}/${lang}/cars/${car.slug}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    const cityPages = CITY_PAGES.map((city) => ({
      url: `${BASE_URL}/${lang}/cities/${city.slug}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    const cityAppPages = CITY_PAGES.flatMap((city) =>
      APP_PAGES.map((app) => ({
        url: `${BASE_URL}/${lang}/cities/${city.slug}/${app.slug}`,
        lastModified,
        changeFrequency: 'weekly' as const,
        priority: 0.75,
      })),
    );

    return acc.concat(staticPages, carPages, cityPages, cityAppPages);
  }, [] as MetadataRoute.Sitemap);

  return entries;
}
