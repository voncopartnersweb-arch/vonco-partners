import { Metadata } from 'next';
import Script from 'next/script';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import {
  buildDescription,
  buildLanguageAlternates,
  buildTitle,
  getLocalizedPath,
  getLocalizedUrl,
} from '@/lib/seo';
import {
  CITY_PAGES,
  getAppBySlug,
  getAppsForCity,
  getCityBySlug,
  isCityEnabledForLocale,
} from '@/data/landingPages';
import { COMPANY } from '@/data/company';
import { buildBreadcrumbSchema, LOCAL_BUSINESS_ID } from '@/lib/schema';
import Breadcrumbs from '@/Components/Breadcrumbs/Breadcrumbs';
import EngagementTracker from '@/Components/Analytics/EngagementTracker';
import { pageStyles as styles } from '@/lib/uiStyles';
import { getDedicatedCityContent } from '@/data/cityContent';

type PageProps = {
  params: Promise<{ lang: string; city: string; app: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  return CITY_PAGES.flatMap((city) =>
    getAppsForCity(city, true).map((app) => ({ city: city.slug, app: app.slug })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, city: citySlug, app: appSlug } = await params;
  const city = getCityBySlug(citySlug);
  const app = getAppBySlug(appSlug);
  const t = await getTranslations({ locale: lang, namespace: 'CitiesPage.cityApp' });
  const tData = await getTranslations({ locale: lang, namespace: 'CitiesPage' });
  if (
    !city ||
    !app ||
    !isCityEnabledForLocale(city, lang) ||
    !city.indexablePlatforms.includes(app.slug)
  ) {
    return { title: 'Page not found', robots: { index: false, follow: false } };
  }

  const dedicated = getDedicatedCityContent(city.slug, lang);
  const cityLabel = dedicated?.name ?? tData(`cities.${city.slug}.name`);
  const inCity = dedicated?.inCity ?? tData(`cities.${city.slug}.inCity`);
  const isPlatformConfirmed = city.platforms.includes(app.slug);
  const title = buildTitle(
    isPlatformConfirmed
      ? t('seoTitle', { appName: app.name, inCity, cityLabel })
      : `${app.name} ${cityLabel}: ${t('availabilityTitle')}`,
  );
  const description = buildDescription(
    isPlatformConfirmed
      ? t('seoDescription', { appName: app.name, inCity, cityLabel })
      : t('availabilityUnconfirmed', { appName: app.name, cityLabel }),
  );

  return {
    title,
    description,
    alternates: {
      canonical: getLocalizedPath(lang, `/cities/${city.slug}/${app.slug}`),
      languages: buildLanguageAlternates(
        `/cities/${city.slug}/${app.slug}`,
        city.enabledLocales,
      ),
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

  if (
    !city ||
    !app ||
    !isCityEnabledForLocale(city, lang) ||
    !city.indexablePlatforms.includes(app.slug)
  ) {
    notFound();
  }

  const t = await getTranslations({ locale: lang, namespace: 'CitiesPage.cityApp' });
  const tData = await getTranslations({ locale: lang, namespace: 'CitiesPage' });
  const tNav = await getTranslations({ locale: lang, namespace: 'Navbar' });
  const dedicated = getDedicatedCityContent(city.slug, lang);
  const cityLabel = dedicated?.name ?? tData(`cities.${city.slug}.name`);
  const inCity = dedicated?.inCity ?? tData(`cities.${city.slug}.inCity`);
  const hotspots = dedicated?.hotspots ?? tData(`cities.${city.slug}.hotspots`);
  const fleetFocus = dedicated?.fleetFocus ?? tData(`cities.${city.slug}.fleetFocus`);
  const seoText = dedicated?.seoText ?? tData(`cities.${city.slug}.seoText`);
  const earningsText =
    dedicated?.earningsText ?? tData(`cities.${city.slug}.earningsText`);
  const isPlatformConfirmed = city.platforms.includes(app.slug);
  const title = isPlatformConfirmed
    ? t('seoTitle', { appName: app.name, inCity, cityLabel })
    : `${app.name} ${cityLabel}: ${t('availabilityTitle')}`;
  const description = isPlatformConfirmed
    ? t('seoDescription', { appName: app.name, inCity, cityLabel })
    : t('availabilityUnconfirmed', { appName: app.name, cityLabel });

  const faqItems = [
    {
      q: t('q1', { appName: app.name, inCity, cityLabel }),
      a: isPlatformConfirmed
        ? t('a1', { appName: app.name, inCity, cityLabel })
        : t('availabilityUnconfirmed', { appName: app.name, cityLabel }),
    },
    {
      q: t('q2', { appName: app.name, inCity, cityLabel }),
      a: isPlatformConfirmed
        ? t('a2', { appName: app.name, inCity, cityLabel })
        : t('availabilityUnconfirmed', { appName: app.name, cityLabel }),
    },
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
      <EngagementTracker city={city.slug} locale={lang} platform={app.slug} />
      <Breadcrumbs
        items={[
          { label: tNav('home'), href: '/' },
          { label: tNav('cities'), href: '/cities' },
          { label: cityLabel, href: `/cities/${city.slug}` },
          { label: app.name },
        ]}
      />
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{description}</p>
        </div>
      </section>

      <section className={styles.block}>
        <div className={styles.container}>
          {!isPlatformConfirmed ? (
            <div className={styles.noticeBlock}>
              <h2 className={styles.noticeTitle}>{t('availabilityTitle')}</h2>
              <p className={styles.noticeText}>
                {t('availabilityUnconfirmed', { appName: app.name, cityLabel })}
              </p>
            </div>
          ) : null}
          {isPlatformConfirmed ? (
            <>
              <h2 className={styles.blockTitle}>
                {tData(`apps.${app.slug}.partnerLabel`)}
              </h2>
              <p className={styles.subtitle}>{tData(`apps.${app.slug}.fitText`)}</p>
            </>
          ) : null}
          <ul className={styles.list}>
            <li>{t('labelCity')}: {cityLabel}</li>
            <li>{t('labelHotspots')}: {hotspots}</li>
            <li>{t('labelFleet')}: {fleetFocus}</li>
          </ul>
        </div>
      </section>

      {isPlatformConfirmed ? (
        <section className={styles.block}>
          <div className={styles.container}>
            <h2 className={styles.blockTitle}>
              {t('sectionTitle', { appName: app.name, inCity, cityLabel })}
            </h2>
            <ul className={styles.list}>
              {steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className={styles.block}>
        <div className={styles.container}>
          <h2 className={styles.blockTitle}>{t('labelMarket')}</h2>
          <p className={styles.subtitle}>{seoText}</p>
          <h3 className={styles.blockTitle}>{t('labelEarnings')}</h3>
          <p className={styles.subtitle}>{earningsText}</p>
          <p className={styles.subtitle}>{t('labelEarningsNote')}</p>
        </div>
      </section>

      <section className={styles.block}>
        <div className={styles.container}>
          <div className={styles.links}>
            <Link href={`/cities/${city.slug}`} className={styles.linkBtn}>
              {cityLabel}
            </Link>
            {getAppsForCity(city, true).filter((item) => item.slug !== app.slug).map((item) => (
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
                name: isPlatformConfirmed
                  ? `${app.name} taxi work ${inCity}`
                  : `${app.name} availability in ${cityLabel}`,
                serviceType: isPlatformConfirmed
                  ? `${app.name} onboarding and taxi car rental`
                  : 'Platform availability information',
                provider: { '@id': LOCAL_BUSINESS_ID },
                areaServed: { '@type': 'City', name: cityLabel },
                url: getLocalizedUrl(lang, `/cities/${city.slug}/${app.slug}`),
              },
              buildBreadcrumbSchema([
                { name: tNav('home'), url: getLocalizedUrl(lang) },
                { name: t('labelCities'), url: getLocalizedUrl(lang, '/cities') },
                { name: cityLabel, url: getLocalizedUrl(lang, `/cities/${city.slug}`) },
                {
                  name: app.name,
                  url: getLocalizedUrl(lang, `/cities/${city.slug}/${app.slug}`),
                },
              ]),
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
