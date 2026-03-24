import Image from 'next/image';
import { Metadata } from 'next';
import Script from 'next/script';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import styles from './page.module.css';
import HowItWorks from '@/Components/HowItWorks/HowItWorks';
import HeroSection from '@/Components/HeroSection/HeroSection';
import GoogleReviewsSection from './GoogleReviewsSection';
import { buildLanguageAlternates, getLocalizedPath, getLocalizedUrl } from '@/lib/seo';

// Use tiny client wrappers that perform client-side dynamic import (ssr:false)
import ClientDriverForm from '@/Components/ClientDriverForm';
import ClientSocialSection from '@/Components/ClientSocialSection';
import ClientFleetOffer from '@/Components/ClientFleetOffer';
import ClientCarFleetCarousel from '@/Components/ClientCarFleetCarousel';
import ClientDeferred from '@/Components/ClientDeferred';
import ClientChatBotLazy from '@/Components/ClientChatBotLazy';

type HomePageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { lang } = await params;
  const tHero = await getTranslations({ locale: lang, namespace: 'Hero' });
  const tMeta = await getTranslations({ locale: lang, namespace: 'Metadata' });
  const tWork = await getTranslations({ locale: lang, namespace: 'WorkPage' });

  const title = tHero('title');
  const description = tWork.has('seoDescription')
    ? tWork('seoDescription')
    : tMeta('description');

  return {
    title,
    description,
    keywords: [
      'робота в таксі',
      'робота водієм',
      'uber',
      'bolt',
      'free now',
      'оренда авто для таксі',
      'подобова оренда авто',
      'авто під виплату',
      'taxi jobs',
      'taxi car rental',
    ],
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
  const faqTitle = tCities('faqTitle');
  const fleetDescription = String(tCars.raw('description'))
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const faqItems = [
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
          <Image
            src='/vonco-logo.jpg'
            alt='Vonco Partners logo'
            width={300}
            height={300}
            sizes='(max-width: 640px) 120px,
         (max-width: 1024px) 180px,
         300px'
            priority
            fetchPriority='high'
            loading='eager'
            className={styles.logoImage}
          />
          <HeroSection />
        </div>

        <section className={styles.seoSection} aria-labelledby='home-seo-title'>
          <div className={styles.seoGrid}>
            <article className={styles.seoCard}>
              <p className={styles.seoEyebrow}>{tNav('work')}</p>
              <h2 id='home-seo-title' className={styles.seoTitle}>
                {tWork('seoTitle')}
              </h2>
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

        <ClientDeferred delayMs={400}>
          <ClientChatBotLazy />
        </ClientDeferred>

        <HowItWorks />
        <ClientDeferred delayMs={700}>
          <ClientDriverForm />
        </ClientDeferred>
        <ClientDeferred delayMs={900}>
          <ClientSocialSection />
        </ClientDeferred>

        {/* <ClientTikTokReelsSection /> */}
        <ClientDeferred delayMs={1100}>
          <ClientFleetOffer />
        </ClientDeferred>
        <ClientDeferred delayMs={1300}>
          <ClientCarFleetCarousel />
        </ClientDeferred>
        <GoogleReviewsSection lang={lang} />

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

        <Script
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
