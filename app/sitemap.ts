import { MetadataRoute } from 'next';
import { cars } from '@/data/cars';
import { buildLanguageAlternateUrls, getLocalizedUrl, SUPPORTED_LOCALES } from '@/lib/seo';
import { APP_PAGES, CITY_PAGES } from '@/data/landingPages';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const locales = [...SUPPORTED_LOCALES];
  const paths = [
    '',
    '/cities',
    '/about',
    '/services',
    '/cars',
    '/work',
    '/contacts',
    '/privacy-policy',
  ];

  const entries = locales.reduce((acc, lang) => {
    const staticPages = paths.map((path) => ({
      url: getLocalizedUrl(lang, path),
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: path === '' ? 1.0 : 0.8,
      alternates: {
        languages: buildLanguageAlternateUrls(path),
      },
    }));

    const carPages = cars.map((car) => ({
      url: getLocalizedUrl(lang, `/cars/${car.slug}`),
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
      alternates: {
        languages: buildLanguageAlternateUrls(`/cars/${car.slug}`),
      },
    }));

    const cityPages = CITY_PAGES.map((city) => ({
      url: getLocalizedUrl(lang, `/cities/${city.slug}`),
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      alternates: {
        languages: buildLanguageAlternateUrls(`/cities/${city.slug}`),
      },
    }));

    const cityAppPages = CITY_PAGES.flatMap((city) =>
      APP_PAGES.map((app) => ({
        url: getLocalizedUrl(lang, `/cities/${city.slug}/${app.slug}`),
        lastModified,
        changeFrequency: 'weekly' as const,
        priority: 0.75,
        alternates: {
          languages: buildLanguageAlternateUrls(`/cities/${city.slug}/${app.slug}`),
        },
      })),
    );

    return acc.concat(staticPages, carPages, cityPages, cityAppPages);
  }, [] as MetadataRoute.Sitemap);

  return entries;
}
