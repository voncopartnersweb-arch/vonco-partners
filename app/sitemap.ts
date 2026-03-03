import { MetadataRoute } from 'next';
import { cars } from '@/data/cars';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const BASE_URL = 'https://vonco.partners';

  // Всі твої мови
  const locales = [
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

  // Всі твої основні сторінки
  const paths = [
    '', // Головна
    '/about', // Про нас
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

    return acc.concat(staticPages, carPages);
  }, [] as MetadataRoute.Sitemap);

  return entries;
}
