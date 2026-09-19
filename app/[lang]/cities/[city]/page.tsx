import { Metadata } from 'next';
import JsonLd from '@/Components/JsonLd';
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
  getAppsForCity,
  getCityBySlug,
  isCityEnabledForLocale,
} from '@/data/landingPages';
import { COMPANY } from '@/data/company';
import { LOCAL_BUSINESS_ID } from '@/lib/schema';
import { buildBreadcrumbSchema } from '@/lib/schema';
import Breadcrumbs from '@/Components/Breadcrumbs/Breadcrumbs';
import { getDedicatedCityContent } from '@/data/cityContent';
import EngagementTracker from '@/Components/Analytics/EngagementTracker';
import { pageStyles as styles } from '@/lib/uiStyles';
import OpenDriverFormButton from '@/Components/OpenDriverFormButton';

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
  if (!city || !isCityEnabledForLocale(city, lang)) {
    return { title: 'City not found', robots: { index: false, follow: false } };
  }

  const dedicated = getDedicatedCityContent(city.slug, lang);
  const cityLabel = dedicated?.name ?? tData(`cities.${city.slug}.name`);
  const inCity = dedicated?.inCity ?? tData(`cities.${city.slug}.inCity`);
  const platforms = new Intl.ListFormat(lang, {
    style: 'long',
    type: 'conjunction',
  }).format(getAppsForCity(city).map((app) => app.name));
  const title = buildTitle(t('seoTitle', { inCity, cityLabel, platforms }));
  const description = buildDescription(t('seoDescription', { inCity, cityLabel, platforms }));

  return {
    title,
    description,
    alternates: {
      canonical: getLocalizedPath(lang, `/cities/${city.slug}`),
      languages: buildLanguageAlternates(`/cities/${city.slug}`, city.enabledLocales),
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
  if (!city || !isCityEnabledForLocale(city, lang)) notFound();

  const t = await getTranslations({ locale: lang, namespace: 'CitiesPage.city' });
  const tData = await getTranslations({ locale: lang, namespace: 'CitiesPage' });
  const tNav = await getTranslations({ locale: lang, namespace: 'Navbar' });
  const dedicated = getDedicatedCityContent(city.slug, lang);
  const cityLabel = dedicated?.name ?? tData(`cities.${city.slug}.name`);
  const inCity = dedicated?.inCity ?? tData(`cities.${city.slug}.inCity`);
  const demandText = dedicated?.demandText ?? tData(`cities.${city.slug}.demandText`);
  const hotspots = dedicated?.hotspots ?? tData(`cities.${city.slug}.hotspots`);
  const districts = dedicated?.districts ?? tData(`cities.${city.slug}.districts`);
  const fleetFocus = dedicated?.fleetFocus ?? tData(`cities.${city.slug}.fleetFocus`);
  const seoText = dedicated?.seoText ?? tData(`cities.${city.slug}.seoText`);
  const earningsText = dedicated?.earningsText ?? tData(`cities.${city.slug}.earningsText`);
  const platformRulesTitle = dedicated?.platformRulesTitle;
  const platformRules = dedicated?.platformRules;
  const platforms = new Intl.ListFormat(lang, {
    style: 'long',
    type: 'conjunction',
  }).format(getAppsForCity(city).map((app) => app.name));
  const title = t('seoTitle', { inCity, cityLabel, platforms });
  const description = t('seoDescription', { inCity, cityLabel, platforms });

  const faqItems = [
    { q: t('q1', { inCity, cityLabel }), a: t('a1', { inCity, cityLabel, platforms }) },
    { q: t('q2', { inCity, cityLabel }), a: t('a2', { inCity, cityLabel }) },
    { q: t('q3', { inCity, cityLabel }), a: t('a3', { inCity, cityLabel }) },
    { q: t('q4', { inCity, cityLabel }), a: t('a4', { inCity, cityLabel }) },
    { q: t('q5', { inCity, cityLabel }), a: t('a5', { inCity, cityLabel }) },
    { q: t('q6', { inCity, cityLabel }), a: t('a6', { inCity, cityLabel }) },
    { q: t('q7', { inCity, cityLabel }), a: t('a7', { inCity, cityLabel }) },
    { q: t('q8', { inCity, cityLabel }), a: t('a8', { inCity, cityLabel }) },
  ];

  const stepItems = [
    t('processStep1', { inCity, platforms }),
    t('processStep2', { inCity }),
    t('processStep3', { inCity }),
  ];

  return (
    <main className={styles.page}>
      <EngagementTracker city={city.slug} locale={lang} />
      <Breadcrumbs
        items={[
          { label: tNav('home'), href: '/' },
          { label: tNav('cities'), href: '/cities' },
          { label: cityLabel },
        ]}
      />
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{description}</p>
          <div className={styles.actions}>
            <OpenDriverFormButton className={styles.primaryBtn} />
          </div>
        </div>
      </section>

      {platformRulesTitle && platformRules?.length ? (
        <section className={styles.block}>
          <div className={styles.container}>
            <h2 className={styles.blockTitle}>{platformRulesTitle}</h2>
            <ul className={styles.list}>
              {platformRules.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className={styles.block}>
        <div className={styles.container}>
          <h2 className={styles.blockTitle}>{cityLabel}</h2>
          <p className={styles.subtitle}>{demandText}</p>
          <ul className={styles.list}>
            <li>{t('labelHotspots')}: {hotspots}</li>
            <li>{t('labelDistricts')}: {districts}</li>
            <li>{t('labelFleet')}: {fleetFocus}</li>
          </ul>
        </div>
      </section>

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
            {getAppsForCity(city).map((app) =>
              city.indexablePlatforms.includes(app.slug) ? (
                <Link key={app.slug} href={`/cities/${city.slug}/${app.slug}`} className={styles.linkBtnPrimary}>
                  {app.name}
                </Link>
              ) : (
                <span key={app.slug} className={styles.linkBtnPrimary}>
                  {app.name}
                </span>
              ),
            )}
            {CITY_PAGES.filter(
              (item) => item.slug !== city.slug && isCityEnabledForLocale(item, lang),
            ).map((otherCity) => (
              <Link key={otherCity.slug} href={`/cities/${otherCity.slug}`} className={styles.linkBtn}>
                {getDedicatedCityContent(otherCity.slug, lang)?.name ?? tData(`cities.${otherCity.slug}.name`)}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.block}>
        <div className={styles.container}>
          <div className={styles.links}>
            <Link href={COMPANY.links.contacts} className={styles.linkBtnPrimary}>
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

      <JsonLd
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
                provider: { '@id': LOCAL_BUSINESS_ID },
                areaServed: { '@type': 'City', name: cityLabel },
                serviceType: 'Taxi car rental and driver onboarding',
                url: getLocalizedUrl(lang, `/cities/${city.slug}`),
              },
              buildBreadcrumbSchema([
                { name: tNav('home'), url: getLocalizedUrl(lang) },
                { name: tNav('cities'), url: getLocalizedUrl(lang, '/cities') },
                { name: cityLabel, url: getLocalizedUrl(lang, `/cities/${city.slug}`) },
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
