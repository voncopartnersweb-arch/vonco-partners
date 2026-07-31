import { Metadata } from 'next';
import JsonLd from '@/Components/JsonLd';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { homeStyles as styles } from '@/lib/uiStyles';
import HowItWorks from '@/Components/HowItWorks/HowItWorks';
import HeroSection from '@/Components/HeroSection/HeroSection';
import GoogleReviewsSection from './GoogleReviewsSection';
import {
  buildDescription,
  buildLanguageAlternates,
  buildTitle,
  getLocalizedPath,
  getLocalizedUrl,
} from '@/lib/seo';
import {
  RUSSIAN_PRIORITY_CITIES,
  RUSSIAN_SEO_CLUSTERS,
} from '@/data/russianSeo';

// Use tiny client wrappers that perform client-side dynamic import (ssr:false)
import ClientDriverForm from '@/Components/ClientDriverForm';
import ClientSocialSection from '@/Components/ClientSocialSection';
import ClientFleetOffer from '@/Components/ClientFleetOffer';
import ClientCarFleetCarousel from '@/Components/ClientCarFleetCarousel';
import ClientDeferred from '@/Components/ClientDeferred';

type HomePageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { lang } = await params;
  const tHome = await getTranslations({ locale: lang, namespace: 'HomePage' });
  const tHero = await getTranslations({ locale: lang, namespace: 'Hero' });
  const tMeta = await getTranslations({ locale: lang, namespace: 'Metadata' });
  const tWork = await getTranslations({ locale: lang, namespace: 'WorkPage' });

  const rawTitle = tHome.has('seoTitle') ? tHome('seoTitle') : tHero('title');
  const rawDescription = tHome.has('seoDescription')
    ? tHome('seoDescription')
    : tWork.has('seoDescription')
    ? tWork('seoDescription')
    : tMeta('description');
  const title = buildTitle(rawTitle, { includeBrand: false });
  const description = buildDescription(rawDescription);

  return {
    title,
    description,
    alternates: {
      canonical: getLocalizedPath(lang),
      languages: buildLanguageAlternates(''),
    },
    openGraph: {
      title,
      description,
      url: getLocalizedUrl(lang),
      type: 'website',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.jpg'],
    },
  };
}

export default async function Home({
  params,
}: HomePageProps) {
  const { lang } = await params;
  const tHome = await getTranslations({ locale: lang, namespace: 'HomePage' });
  const tWork = await getTranslations({ locale: lang, namespace: 'WorkPage' });
  const tServices = await getTranslations({
    locale: lang,
    namespace: 'ServicesPage',
  });
  const tCars = await getTranslations({ locale: lang, namespace: 'CarFleet' });
  const tCarsSeo = await getTranslations({
    locale: lang,
    namespace: 'CarFleet.seo',
  });
  const tCities = await getTranslations({
    locale: lang,
    namespace: 'CitiesPage.city',
  });
  const tNav = await getTranslations({ locale: lang, namespace: 'Navbar' });
  const fleetDescription = String(tCars.raw('description'))
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const homeFaqAvailable = tHome.has('faq.q1');
  const faqTitle = tHome.has('faqTitle') ? tHome('faqTitle') : tCities('faqTitle');

  const faqItems = homeFaqAvailable
    ? [1, 2, 3, 4, 5, 6].map((index) => ({
        q: tHome(`faq.q${index}`),
        a: tHome(`faq.a${index}`),
      }))
    : [
        { q: tServices('faqDailyTitle'), a: tServices('faqDailyText') },
        { q: tServices('faqBuyoutTitle'), a: tServices('faqBuyoutText') },
        { q: tCities('q3'), a: tCities('a3') },
        { q: tCities('q4'), a: tCities('a4') },
        { q: tCities('q5'), a: tCities('a5') },
        { q: tCities('q8'), a: tCities('a8') },
      ];

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.formContainer}>
          <HeroSection />
        </div>

        <HowItWorks />

        <ClientDeferred delayMs={700}>
          <ClientDriverForm />
        </ClientDeferred>

        <ClientDeferred delayMs={900}>
          <ClientFleetOffer />
        </ClientDeferred>
        <ClientDeferred delayMs={1100}>
          <ClientCarFleetCarousel />
        </ClientDeferred>
        <GoogleReviewsSection lang={lang} />

        <section className={styles.seoSection} aria-labelledby='home-seo-title'>
          {tHome.has('seoIntroTitle') ? (
            <div className={styles.seoIntro}>
              <p className={styles.seoEyebrow}>Uber / Bolt / Free Now</p>
              <h2 id='home-seo-title' className={styles.seoTitle}>
                {tHome('seoIntroTitle')}
              </h2>
              <p className={styles.seoText}>{tHome('seoIntroText1')}</p>
              <p className={styles.seoText}>{tHome('seoIntroText2')}</p>
            </div>
          ) : null}
          <div className={styles.seoGrid}>
            <article className={styles.seoCard}>
              <p className={styles.seoEyebrow}>{tNav('work')}</p>
              <h2 className={styles.seoTitle}>{tWork('seoTitle')}</h2>
              <p className={styles.seoText}>{tWork('seoIntroText')}</p>
              <div className={styles.seoLinks}>
                <Link href='/work' className={styles.seoLinkPrimary}>
                  {tNav('work')}
                </Link>
                <Link href='/cities' className={styles.seoLinkSecondary}>
                  {tNav('cities')}
                </Link>
              </div>
            </article>

            <article className={styles.seoCard}>
              <p className={styles.seoEyebrow}>{tNav('cars')}</p>
              <h2 className={styles.seoTitle}>{tCarsSeo('title')}</h2>
              <p className={styles.seoText}>{fleetDescription}</p>
              <p className={styles.seoText}>{tServices('faqDailyText')}</p>
              <div className={styles.seoLinks}>
                <Link href='/cars' className={styles.seoLinkPrimary}>
                  {tNav('cars')}
                </Link>
                <Link href='/services' className={styles.seoLinkSecondary}>
                  {tNav('services')}
                </Link>
              </div>
            </article>

            <article className={`${styles.seoCard} ${styles.seoCardWide}`}>
              <p className={styles.seoEyebrow}>Uber / Bolt / Free Now</p>
              <h2 className={styles.seoTitle}>{tServices('seoTitle')}</h2>
              <p className={styles.seoText}>{tServices('seoIntroText')}</p>
              <ul className={styles.seoList}>
                <li>{tServices('platformsText')}</li>
                <li>{tServices('faqDailyText')}</li>
                <li>{tServices('faqBuyoutText')}</li>
                <li>{tWork('benefits.supportText')}</li>
              </ul>
            </article>
          </div>
        </section>

        {lang === 'ru' ? (
          <section
            className={styles.prioritySection}
            aria-labelledby='russian-seo-priority-title'
          >
            <header className={styles.priorityHeader}>
              <p className={styles.seoEyebrow}>Работа в такси · Польша</p>
              <h2 id='russian-seo-priority-title' className={styles.seoTitle}>
                Все для старта водителя Uber, Bolt и Free Now
              </h2>
              <p className={styles.seoText}>
                Выберите нужный формат сотрудничества или город. На каждой
                странице собраны условия работы, доступные приложения,
                информация об автомобилях и прямой способ связи с менеджером.
              </p>
            </header>

            <div className={styles.priorityGrid}>
              {RUSSIAN_SEO_CLUSTERS.map((cluster) => (
                <article key={cluster.title} className={styles.seoCard}>
                  <h3 className={styles.priorityCardTitle}>{cluster.title}</h3>
                  <p className={styles.seoText}>{cluster.description}</p>
                  <ul className={styles.priorityLinks}>
                    {cluster.links.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href}>{link.label} →</Link>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <div className={styles.cityLinks}>
              <h3 className={styles.priorityCardTitle}>
                Популярные города для работы водителем
              </h3>
              <div className={styles.cityLinkList}>
                {RUSSIAN_PRIORITY_CITIES.map((city) => (
                  <Link
                    key={city.href}
                    href={city.href}
                    className={styles.seoLinkSecondary}
                  >
                    {city.label}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className={styles.faqSection} aria-labelledby='home-faq-title'>
          <div className={styles.faqHeader}>
            <p className={styles.seoEyebrow}>{tNav('services')}</p>
            <h2 id='home-faq-title' className={styles.seoTitle}>
              {faqTitle}
            </h2>
          </div>
          <div className={styles.faqGrid}>
            {faqItems.map((item) => (
              <article key={item.q} className={styles.faqCard}>
                <h3 className={styles.faqQuestion}>{item.q}</h3>
                <p className={styles.faqAnswer}>{item.a}</p>
              </article>
            ))}
          </div>
        </section>

        <ClientDeferred delayMs={1300}>
          <ClientSocialSection />
        </ClientDeferred>
        <JsonLd
          id='home-faq-schema'
          type='application/ld+json'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqItems.map((item) => ({
                '@type': 'Question',
                name: item.q,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: item.a,
                },
              })),
            }),
          }}
        />
      </main>
    </div>
  );
}
