import { Metadata } from 'next';
import Script from 'next/script';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { buildLanguageAlternates, getLocalizedPath, getLocalizedUrl } from '@/lib/seo';
import { APP_PAGES, CITY_PAGES, getCityBySlug } from '@/data/landingPages';
import { COMPANY } from '@/data/company';
import styles from '../CitiesPage.module.css';

type PageProps = {
  params: Promise<{ lang: string; city: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  return CITY_PAGES.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  const t = await getTranslations({ locale: lang, namespace: 'CitiesPage.city' });
  const tData = await getTranslations({ locale: lang, namespace: 'CitiesPage' });

  if (!city) {
    return { title: 'City not found', robots: { index: false, follow: false } };
  }

  const cityLabel = tData(`cities.${city.slug}.name`);
  const inCity = tData(`cities.${city.slug}.inCity`);
  const title = t('seoTitle', { inCity, cityLabel });
  const description = t('seoDescription', { inCity, cityLabel });

  return {
    title,
    description,
    keywords: [
      `taxi ${cityLabel}`,
      `praca taxi ${cityLabel}`,
      `uber ${cityLabel}`,
      `bolt ${cityLabel}`,
      `wynajem auta ${cityLabel}`,
      `auto pod wykup ${cityLabel}`,
    ],
    alternates: {
      canonical: getLocalizedPath(lang, `/cities/${city.slug}`),
      languages: buildLanguageAlternates(`/cities/${city.slug}`),
    },
    openGraph: {
      title,
      description,
      url: getLocalizedUrl(lang, `/cities/${city.slug}`),
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

export default async function CityLandingPage({ params }: PageProps) {
  const { lang, city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  const t = await getTranslations({ locale: lang, namespace: 'CitiesPage.city' });
  const tData = await getTranslations({ locale: lang, namespace: 'CitiesPage' });
  const cityLabel = tData(`cities.${city.slug}.name`);
  const inCity = tData(`cities.${city.slug}.inCity`);
  const title = t('seoTitle', { inCity, cityLabel });
  const description = t('seoDescription', { inCity, cityLabel });

  const faqItems = [
    { q: t('q1', { inCity, cityLabel }), a: t('a1', { inCity, cityLabel }) },
    { q: t('q2', { inCity, cityLabel }), a: t('a2', { inCity, cityLabel }) },
    { q: t('q3', { inCity, cityLabel }), a: t('a3', { inCity, cityLabel }) },
    { q: t('q4', { inCity, cityLabel }), a: t('a4', { inCity, cityLabel }) },
    { q: t('q5', { inCity, cityLabel }), a: t('a5', { inCity, cityLabel }) },
    { q: t('q6', { inCity, cityLabel }), a: t('a6', { inCity, cityLabel }) },
    { q: t('q7', { inCity, cityLabel }), a: t('a7', { inCity, cityLabel }) },
    { q: t('q8', { inCity, cityLabel }), a: t('a8', { inCity, cityLabel }) },
  ];

  const stepItems = [
    t('processStep1', { inCity }),
    t('processStep2', { inCity }),
    t('processStep3', { inCity }),
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
          <h2 className={styles.blockTitle}>{cityLabel}</h2>
          <p className={styles.subtitle}>{tData(`cities.${city.slug}.demandText`)}</p>
          <ul className={styles.list}>
            <li>{t('labelHotspots')}: {tData(`cities.${city.slug}.hotspots`)}</li>
            <li>{t('labelDistricts')}: {tData(`cities.${city.slug}.districts`)}</li>
            <li>{t('labelFleet')}: {tData(`cities.${city.slug}.fleetFocus`)}</li>
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
          <h2 className={styles.blockTitle}>{t('localProcessTitle')}</h2>
          <ul className={styles.list}>
            {stepItems.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.block}>
        <div className={styles.container}>
          <h2 className={styles.blockTitle}>{t('appIntroLabel')}</h2>
          <div className={styles.links}>
            {APP_PAGES.map((app) => (
              <Link key={app.slug} href={`/cities/${city.slug}/${app.slug}`} className={`${styles.linkBtn} ${styles.linkBtnPrimary}`}>
                {app.name}
              </Link>
            ))}
            {CITY_PAGES.filter((item) => item.slug !== city.slug).map((otherCity) => (
              <Link key={otherCity.slug} href={`/cities/${otherCity.slug}`} className={styles.linkBtn}>
                {tData(`cities.${otherCity.slug}.name`)}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.block}>
        <div className={styles.container}>
          <div className={styles.links}>
            <Link href={COMPANY.links.contacts} className={`${styles.linkBtn} ${styles.linkBtnPrimary}`}>
              {t('labelContacts')}
            </Link>
            <Link href={COMPANY.links.cars} className={styles.linkBtn}>
              {t('labelCars')}
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
        id={`city-faq-${city.slug}-${lang}`}
        type='application/ld+json'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Service',
                name: `Taxi car rental ${inCity}`,
                provider: { '@type': 'Organization', name: COMPANY.name },
                areaServed: { '@type': 'City', name: cityLabel },
                serviceType: 'Taxi car rental and driver onboarding',
                url: getLocalizedUrl(lang, `/cities/${city.slug}`),
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
