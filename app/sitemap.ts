import { MetadataRoute } from 'next';
import { cars } from '@/data/cars';
import {
  buildLanguageAlternateUrls,
  getLocalizedUrl,
  INDEXABLE_LOCALES,
  SEO_PRIORITY_LOCALE,
} from '@/lib/seo';
import {
  CITY_PAGES,
  getAppsForCity,
  isCityEnabledForLocale,
} from '@/data/landingPages';
import {
  BLOG_LOCALES,
  getArticleLocales,
  getArticles,
  isBlogLocale,
} from '@/data/blog';
import {
  DOCUMENT_GUIDE_LOCALES,
  isDocumentGuideLocale,
} from '@/data/documentsContent';

const CONTENT_LAST_MODIFIED = new Date('2026-07-29');

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = [...INDEXABLE_LOCALES];
  const paths = [
    '',
    '/cities',
    '/about',
    '/services',
    '/cars',
    '/work',
    '/programs',
    '/vykup-avto',
    '/contacts',
    '/privacy-policy',
  ];

  const entries = locales.reduce((acc, lang) => {
    const isSeoPriorityLocale = lang === SEO_PRIORITY_LOCALE;
    const staticPages = paths.map((path) => ({
      url: getLocalizedUrl(lang, path),
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: 'weekly' as const,
      priority: path === ''
        ? 1.0
        : isSeoPriorityLocale && ['/work', '/cars', '/cities', '/services', '/blog'].includes(path)
          ? 0.95
          : 0.8,
      alternates: {
        languages: buildLanguageAlternateUrls(path),
      },
    }));

    const carPages = cars.map((car) => ({
      url: getLocalizedUrl(lang, `/cars/${car.slug}`),
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: 'weekly' as const,
      priority: isSeoPriorityLocale ? 0.8 : 0.7,
      alternates: {
        languages: buildLanguageAlternateUrls(`/cars/${car.slug}`),
      },
    }));

    const enabledCities = CITY_PAGES.filter((city) => isCityEnabledForLocale(city, lang));

    const cityPages = enabledCities.map((city) => ({
      url: getLocalizedUrl(lang, `/cities/${city.slug}`),
      lastModified: new Date(city.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: isSeoPriorityLocale ? 0.9 : 0.8,
      alternates: {
        languages: buildLanguageAlternateUrls(`/cities/${city.slug}`, city.enabledLocales),
      },
    }));

    const cityAppPages = enabledCities.flatMap((city) =>
      getAppsForCity(city, true).map((app) => ({
        url: getLocalizedUrl(lang, `/cities/${city.slug}/${app.slug}`),
        lastModified: new Date(city.updatedAt),
        changeFrequency: 'weekly' as const,
        priority: isSeoPriorityLocale ? 0.9 : 0.75,
        alternates: {
          languages: buildLanguageAlternateUrls(
            `/cities/${city.slug}/${app.slug}`,
            city.enabledLocales,
          ),
        },
      })),
    );

    const blogPages = isBlogLocale(lang)
      ? [
          {
            url: getLocalizedUrl(lang, '/blog'),
            lastModified: CONTENT_LAST_MODIFIED,
            changeFrequency: 'weekly' as const,
            priority: isSeoPriorityLocale ? 0.95 : 0.7,
            alternates: {
              languages: buildLanguageAlternateUrls('/blog', BLOG_LOCALES),
            },
          },
          ...getArticles(lang).map((article) => ({
            url: getLocalizedUrl(lang, `/blog/${article.slug}`),
            lastModified: new Date(article.updatedAt),
            changeFrequency: 'monthly' as const,
            priority: isSeoPriorityLocale ? 0.85 : 0.65,
            alternates: {
              languages: buildLanguageAlternateUrls(
                `/blog/${article.slug}`,
                getArticleLocales(article.slug),
              ),
            },
          })),
        ]
      : [];

    const documentPages = isDocumentGuideLocale(lang)
      ? [
          {
            url: getLocalizedUrl(lang, '/documents-for-taxi-work'),
            lastModified: CONTENT_LAST_MODIFIED,
            changeFrequency: 'monthly' as const,
            priority: isSeoPriorityLocale ? 0.95 : 0.8,
            alternates: {
              languages: buildLanguageAlternateUrls(
                '/documents-for-taxi-work',
                DOCUMENT_GUIDE_LOCALES,
              ),
            },
          },
        ]
      : [];

    return acc.concat(
      staticPages,
      carPages,
      cityPages,
      cityAppPages,
      blogPages,
      documentPages,
    );
  }, [] as MetadataRoute.Sitemap);

  return entries;
}
