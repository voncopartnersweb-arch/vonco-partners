import { Metadata } from 'next';
import Script from 'next/script';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Breadcrumbs from '@/Components/Breadcrumbs/Breadcrumbs';
import { COMPANY } from '@/data/company';
import {
  buildDescription,
  buildLanguageAlternates,
  buildTitle,
  getLocalizedPath,
  getLocalizedUrl,
} from '@/lib/seo';
import {
  buildBreadcrumbSchema,
  LOCAL_BUSINESS_ID,
} from '@/lib/schema';
import styles from './VykupAuto.module.css';

type PageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const tWork = await getTranslations({ locale: lang, namespace: 'WorkPage' });
  const tServices = await getTranslations({ locale: lang, namespace: 'ServicesPage' });
  const title = buildTitle(tWork('buyoutTitle'));
  const description = buildDescription(
    `${tWork('buyoutText')} ${tServices('faqBuyoutText')}`,
  );

  return {
    title,
    description,
    alternates: {
      canonical: getLocalizedPath(lang, '/vykup-avto'),
      languages: buildLanguageAlternates('/vykup-avto'),
    },
    openGraph: {
      title,
      description,
      url: getLocalizedUrl(lang, '/vykup-avto'),
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

export default async function BuyoutPage({ params }: PageProps) {
  const { lang } = await params;
  const tWork = await getTranslations({ locale: lang, namespace: 'WorkPage' });
  const tServices = await getTranslations({ locale: lang, namespace: 'ServicesPage' });
  const tAbout = await getTranslations({ locale: lang, namespace: 'AboutPage' });
  const tNav = await getTranslations({ locale: lang, namespace: 'Navbar' });

  const process = [1, 2, 3, 4].map((index) => ({
    title: tServices(`processStep${index}Title`),
    text: tServices(`processStep${index}Text`),
  }));
  const faq = [
    { q: tServices('faqBuyoutTitle'), a: tServices('faqBuyoutText') },
    { q: tServices('faqDailyTitle'), a: tServices('faqDailyText') },
  ];
  const breadcrumbs = [
    { name: tNav('home'), url: getLocalizedUrl(lang) },
    { name: tWork('buyoutTitle'), url: getLocalizedUrl(lang, '/vykup-avto') },
  ];

  return (
    <main className={styles.page}>
      <Breadcrumbs
        items={[
          { label: tNav('home'), href: '/' },
          { label: tWork('buyoutTitle') },
        ]}
      />

      <section className={styles.hero}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>{COMPANY.name}</p>
          <h1>{tWork('buyoutTitle')}</h1>
          <p>{tWork('buyoutText')}</p>
          <div className={styles.actions}>
            <Link href='/contacts#driver-application' className={styles.primary}>
              {tWork('ctaSecondary')}
            </Link>
            <Link href='/cars' className={styles.secondary}>
              {tNav('cars')}
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2>{tServices('seoIntroTitle')}</h2>
          <p>{tServices('seoIntroText')}</p>
          <p>{tAbout('whatWeDo.buyoutText')}</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2>{tServices('processTitle')}</h2>
          <div className={styles.grid}>
            {process.map((item, index) => (
              <article className={styles.card} key={item.title}>
                <span>{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2>{tAbout('howWeWorkTitle')}</h2>
          <div className={styles.grid}>
            {[1, 2, 3].map((index) => (
              <article className={styles.card} key={index}>
                <h3>{index}</h3>
                <p>{tAbout(`howWeWork.step${index}`)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2>FAQ</h2>
          <div className={styles.faq}>
            {faq.map((item) => (
              <article key={item.q}>
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </article>
            ))}
          </div>
          <p className={styles.disclaimer}>{tServices('faqBuyoutText')}</p>
          <Link href='/contacts#driver-application' className={styles.primary}>
            {tWork('ctaSecondary')}
          </Link>
        </div>
      </section>

      <Script
        id={`buyout-schema-${lang}`}
        type='application/ld+json'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Service',
                name: tWork('buyoutTitle'),
                description: tWork('buyoutText'),
                url: getLocalizedUrl(lang, '/vykup-avto'),
                provider: { '@id': LOCAL_BUSINESS_ID },
              },
              buildBreadcrumbSchema(breadcrumbs),
              {
                '@type': 'FAQPage',
                mainEntity: faq.map((item) => ({
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
