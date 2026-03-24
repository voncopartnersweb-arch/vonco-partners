import { Metadata } from 'next';
import Script from 'next/script';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { buildLanguageAlternates, getLocalizedPath, getLocalizedUrl } from '@/lib/seo';
import { APP_PAGES, CITY_PAGES } from '@/data/landingPages';
import styles from './CitiesPage.module.css';

type PageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'CitiesPage.hub' });

  return {
    title: t('seoTitle'),
    description: t('seoDescription'),
    alternates: {
      canonical: getLocalizedPath(lang, '/cities'),
      languages: buildLanguageAlternates('/cities'),
    },
    openGraph: {
      title: t('seoTitle'),
      description: t('seoDescription'),
      url: getLocalizedUrl(lang, '/cities'),
      type: 'website',
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: t('seoTitle') }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('seoTitle'),
      description: t('seoDescription'),
      images: ['/og-image.jpg'],
    },
  };
}

export default async function CitiesHubPage({ params }: PageProps) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'CitiesPage.hub' });
  const tData = await getTranslations({ locale: lang, namespace: 'CitiesPage' });

  const itemList = CITY_PAGES.map((city, idx) => ({
    '@type': 'ListItem',
    position: idx + 1,
    name: tData(`cities.${city.slug}.name`),
    url: getLocalizedUrl(lang, `/cities/${city.slug}`),
  }));

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.title}>{t('h1')}</h1>
          <p className={styles.subtitle}>{t('subtitle')}</p>
        </div>
      </section>

      <section className={styles.block}>
        <div className={styles.container}>
          <h2 className={styles.blockTitle}>{t('cityTitle')}</h2>
          <div className={styles.grid}>
            {CITY_PAGES.map((city) => {
              const cityName = tData(`cities.${city.slug}.name`);
              return (
                <article key={city.slug} className={styles.card}>
                  <h3>{cityName}</h3>
                  <p>{tData(`cities.${city.slug}.demandText`)}</p>
                  <div className={styles.links}>
                    <Link href={`/cities/${city.slug}`} className={`${styles.linkBtn} ${styles.linkBtnPrimary}`}>
                      {cityName}
                    </Link>
                    {APP_PAGES.map((app) => (
                      <Link key={app.slug} href={`/cities/${city.slug}/${app.slug}`} className={styles.linkBtn}>
                        {app.name}
                      </Link>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.block}>
        <div className={styles.container}>
          <h2 className={styles.blockTitle}>{t('appTitle')}</h2>
          <ul className={styles.list}>
            {APP_PAGES.map((app) => (
              <li key={app.slug}>{tData(`apps.${app.slug}.partnerLabel`)}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.block}>
        <div className={styles.container}>
          <h2 className={styles.blockTitle}>{t('tipsTitle')}</h2>
          <ul className={styles.list}>
            <li>{t('tip1')}</li>
            <li>{t('tip2')}</li>
            <li>{t('tip3')}</li>
          </ul>
        </div>
      </section>

      <Script
        id='cities-hub-schema'
        type='application/ld+json'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: t('h1'),
            itemListElement: itemList,
          }),
        }}
      />
    </main>
  );
}
