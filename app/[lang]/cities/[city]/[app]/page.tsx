import { Metadata } from 'next';
import Script from 'next/script';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { buildLanguageAlternates, getLocalizedPath, getLocalizedUrl } from '@/lib/seo';
import { APP_PAGES, CITY_PAGES, getAppBySlug, getCityBySlug } from '@/data/landingPages';
import { COMPANY } from '@/data/company';
import styles from '../../CitiesPage.module.css';

type PageProps = {
  params: Promise<{ lang: string; city: string; app: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  return CITY_PAGES.flatMap((city) => APP_PAGES.map((app) => ({ city: city.slug, app: app.slug })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, city: citySlug, app: appSlug } = await params;
  const city = getCityBySlug(citySlug);
  const app = getAppBySlug(appSlug);
  const t = await getTranslations({ locale: lang, namespace: 'CitiesPage.cityApp' });
  const tData = await getTranslations({ locale: lang, namespace: 'CitiesPage' });

  if (!city || !app) {
    return { title: 'Page not found', robots: { index: false, follow: false } };
  }

  const cityLabel = tData(`cities.${city.slug}.name`);
  const inCity = tData(`cities.${city.slug}.inCity`);
  const title = t('seoTitle', { appName: app.name, inCity, cityLabel });
  const description = t('seoDescription', { appName: app.name, inCity, cityLabel });

  return {
    title,
    description,
    keywords: [
      `${app.name} ${cityLabel}`,
      `${app.name} driver ${cityLabel}`,
      `taxi ${cityLabel}`,
      `car rental ${cityLabel}`,
      `lease to own ${cityLabel}`,
    ],
    alternates: {
      canonical: getLocalizedPath(lang, `/cities/${city.slug}/${app.slug}`),
      languages: buildLanguageAlternates(`/cities/${city.slug}/${app.slug}`),
    },
    openGraph: {
      title,
      description,
      url: getLocalizedUrl(lang, `/cities/${city.slug}/${app.slug}`),
      type: 'website',
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.jpg'],
    },
  };
}

export default async function CityAppLandingPage({ params }: PageProps) {
  const { lang, city: citySlug, app: appSlug } = await params;
  const city = getCityBySlug(citySlug);
  const app = getAppBySlug(appSlug);

  if (!city || !app) notFound();

  const t = await getTranslations({ locale: lang, namespace: 'CitiesPage.cityApp' });
  const tData = await getTranslations({ locale: lang, namespace: 'CitiesPage' });
  const cityLabel = tData(`cities.${city.slug}.name`);
  const inCity = tData(`cities.${city.slug}.inCity`);
  const title = t('seoTitle', { appName: app.name, inCity, cityLabel });
  const description = t('seoDescription', { appName: app.name, inCity, cityLabel });

  const faqItems = [
    { q: t('q1', { appName: app.name, inCity, cityLabel }), a: t('a1', { appName: app.name, inCity, cityLabel }) },
    { q: t('q2', { appName: app.name, inCity, cityLabel }), a: t('a2', { appName: app.name, inCity, cityLabel }) },
    { q: t('q3', { appName: app.name, inCity, cityLabel }), a: t('a3', { appName: app.name, inCity, cityLabel }) },
    { q: t('q4', { appName: app.name, inCity, cityLabel }), a: t('a4', { appName: app.name, inCity, cityLabel }) },
    { q: t('q5', { appName: app.name, inCity, cityLabel }), a: t('a5', { appName: app.name, inCity, cityLabel }) },
    { q: t('q6', { appName: app.name, inCity, cityLabel }), a: t('a6', { appName: app.name, inCity, cityLabel }) },
    { q: t('q7', { appName: app.name, inCity, cityLabel }), a: t('a7', { appName: app.name, inCity, cityLabel }) },
    { q: t('q8', { appName: app.name, inCity, cityLabel }), a: t('a8', { appName: app.name, inCity, cityLabel }) },
  ];

  const steps = [
    t('step1', { appName: app.name, inCity, cityLabel }),
    t('step2', { appName: app.name, inCity, cityLabel }),
    t('step3', { appName: app.name, inCity, cityLabel }),
  ];

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{description}</p>
        </div>
      </section>

      <section className={styles.block}>
        <div className={styles.container}>
          <h2 className={styles.blockTitle}>{tData(`apps.${app.slug}.partnerLabel`)}</h2>
          <p className={styles.subtitle}>{tData(`apps.${app.slug}.fitText`)}</p>
          <ul className={styles.list}>
            <li>{t('labelCity')}: {cityLabel}</li>
            <li>{t('labelHotspots')}: {tData(`cities.${city.slug}.hotspots`)}</li>
            <li>{t('labelFleet')}: {tData(`cities.${city.slug}.fleetFocus`)}</li>
          </ul>
        </div>
      </section>

      <section className={styles.block}>
        <div className={styles.container}>
          <h2 className={styles.blockTitle}>{t('sectionTitle', { appName: app.name, inCity, cityLabel })}</h2>
          <ul className={styles.list}>
            {steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.block}>
        <div className={styles.container}>
          <h2 className={styles.blockTitle}>{t('labelMarket')}</h2>
          <p className={styles.subtitle}>{tData(`cities.${city.slug}.seoText`)}</p>
          <h3 className={styles.blockTitle}>{t('labelEarnings')}</h3>
          <p className={styles.subtitle}>{tData(`cities.${city.slug}.earningsText`)}</p>
          <p className={styles.subtitle}>{t('labelEarningsNote')}</p>
        </div>
      </section>

      <section className={styles.block}>
        <div className={styles.container}>
          <div className={styles.links}>
            <Link href={`/cities/${city.slug}`} className={styles.linkBtn}>
              {cityLabel}
            </Link>
            {APP_PAGES.filter((item) => item.slug !== app.slug).map((item) => (
              <Link key={item.slug} href={`/cities/${city.slug}/${item.slug}`} className={styles.linkBtn}>
                {item.name}
              </Link>
            ))}
            <Link href={COMPANY.links.contacts} className={`${styles.linkBtn} ${styles.linkBtnPrimary}`}>
              {t('labelContacts')}
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.block}>
        <div className={styles.container}>
          <h2 className={styles.blockTitle}>{t('faqTitle')}</h2>
          <ul className={styles.list}>
            {faqItems.map((item) => (
              <li key={item.q}>
                <strong>{item.q}</strong>
                <p className={styles.subtitle}>{item.a}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Script
        id={`city-app-schema-${city.slug}-${app.slug}-${lang}`}
        type='application/ld+json'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Service',
                name: `${app.name} taxi work ${inCity}`,
                serviceType: `${app.name} onboarding and taxi car rental`,
                provider: { '@type': 'Organization', name: COMPANY.name },
                areaServed: { '@type': 'City', name: cityLabel },
                url: getLocalizedUrl(lang, `/cities/${city.slug}/${app.slug}`),
              },
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  {
                    '@type': 'ListItem',
                    position: 1,
                    name: t('labelCities'),
                    item: getLocalizedUrl(lang, '/cities'),
                  },
                  {
                    '@type': 'ListItem',
                    position: 2,
                    name: cityLabel,
                    item: getLocalizedUrl(lang, `/cities/${city.slug}`),
                  },
                  {
                    '@type': 'ListItem',
                    position: 3,
                    name: app.name,
                    item: getLocalizedUrl(lang, `/cities/${city.slug}/${app.slug}`),
                  },
                ],
              },
              {
                '@type': 'FAQPage',
                mainEntity: faqItems.map((item) => ({
                  '@type': 'Question',
                  name: item.q,
                  acceptedAnswer: { '@type': 'Answer', text: item.a },
                })),
              },
            ],
          }),
        }}
      />
    </main>
  );
}
