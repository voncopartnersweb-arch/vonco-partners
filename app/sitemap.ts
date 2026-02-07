import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const BASE_URL = 'https://vonco.partners';

  // Всі твої мови
  const locales = ['uk', 'pl', 'en', 'hy', 'be', 'ro', 'ka', 'uz', 'kk', 'az'];

  // Всі твої основні сторінки
  const paths = [
    '', // Головна
    '/about', // Про нас
    '/cars', // Наші авто
    '/work', // Робота
    '/contacts', // Контакти
  ];

  // Створюємо масив записів для кожної мови та кожної сторінки
  const entries = locales.flatMap((lang) =>
    paths.map((path) => ({
      url: `${BASE_URL}/${lang}${path}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: path === '' ? 1.0 : 0.8,
    })),
  );

  return entries;
}
