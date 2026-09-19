import { Metadata } from 'next';
import JsonLd from '@/Components/JsonLd';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import {
  buildDescription,
  buildLanguageAlternates,
  buildTitle,
  getLocalizedPath,
  getLocalizedUrl,
} from '@/lib/seo';
import { COMPANY } from '@/data/company';
import SeoRelatedLinks from '@/Components/SeoRelatedLinks';
import { pageStyles as styles } from '@/lib/uiStyles';
import OpenDriverFormButton from '@/Components/OpenDriverFormButton';

type ServicesPageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: ServicesPageProps): Promise<Metadata> {
  const { lang } = await params;
  const tServices = await getTranslations({
    locale: lang,
    namespace: 'ServicesPage',
  });
  const seoTitle = buildTitle(tServices('seoTitle'));
  const seoDescription = buildDescription(tServices('seoDescription'));

  return {
    title: seoTitle,
    description: seoDescription,
    alternates: {
      canonical: getLocalizedPath(lang, '/services'),
      languages: buildLanguageAlternates('/services'),
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: getLocalizedUrl(lang, '/services'),
      type: 'website',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: seoTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: ['/og-image.jpg'],
    },
  };
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { lang } = await params;
  const tWork = await getTranslations({ locale: lang, namespace: 'WorkPage' });
  const tFleet = await getTranslations({
    locale: lang,
    namespace: 'FleetInfo',
  });
  const tServices = await getTranslations({
    locale: lang,
    namespace: 'ServicesPage',
  });

  const faq = [
    {
      q: tFleet('cards.car.title'),
      a: tFleet('cards.car.fullDetails'),
    },
    {
      q: tFleet('cards.shared.title'),
      a: tFleet('cards.shared.fullDetails'),
    },
    {
      q: tFleet('cards.taximeter.title'),
      a: tFleet('cards.taximeter.fullDetails'),
    },
    {
      q: tWork('requirementsTitle'),
      a: [
        tWork('requirements.license'),
        tWork('requirements.residence'),
        tWork('requirements.language'),
        tWork('requirements.motivation'),
      ].join('; '),
    },
    {
      q: tServices('faqDailyTitle'),
      a: tServices('faqDailyText'),
    },
    {
      q: tServices('faqBuyoutTitle'),
      a: tServices('faqBuyoutText'),
    },
  ];

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.title}>{tServices('seoTitle')}</h1>
          <p className={styles.subtitle}>{tServices('heroSubtitle')}</p>
          <div className={styles.actions}>
            <OpenDriverFormButton className={styles.primaryBtn} />
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>{tServices('seoIntroTitle')}</h2>
          <p className={styles.text}>{tServices('seoIntroText')}</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.grid}>
            <article className={styles.card}>
              <h2>{tFleet('cards.car.title')}</h2>
              <p>{tFleet('cards.car.desc')}</p>
            </article>
            <article className={styles.card}>
              <h2>{tFleet('cards.schedule.title')}</h2>
              <p>{tFleet('cards.schedule.desc')}</p>
            </article>
            <article className={styles.card}>
              <h2>{tFleet('cards.shared.title')}</h2>
              <p>{tFleet('cards.shared.desc')}</p>
            </article>
            <article className={styles.card}>
              <h2>{tFleet('cards.taximeter.title')}</h2>
              <p>{tFleet('cards.taximeter.desc')}</p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>{tServices('processTitle')}</h2>
          <div className={styles.grid}>
            <article className={styles.card}>
              <h2>{tServices('processStep1Title')}</h2>
              <p>{tServices('processStep1Text')}</p>
            </article>
            <article className={styles.card}>
              <h2>{tServices('processStep2Title')}</h2>
              <p>{tServices('processStep2Text')}</p>
            </article>
            <article className={styles.card}>
              <h2>{tServices('processStep3Title')}</h2>
              <p>{tServices('processStep3Text')}</p>
            </article>
            <article className={styles.card}>
              <h2>{tServices('processStep4Title')}</h2>
              <p>{tServices('processStep4Text')}</p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>{tWork('howToStartTitle')}</h2>
          <ol className={styles.steps}>
            <li>{tWork('steps.apply')}</li>
            <li>{tWork('steps.call')}</li>
            <li>{tWork('steps.documents')}</li>
            <li>{tWork('steps.start')}</li>
          </ol>
          <div className={styles.actions}>
            <OpenDriverFormButton className={styles.primaryBtn} />
            <Link href={COMPANY.links.cars} className={styles.secondaryBtn}>
              {tFleet('buttons.more')}
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>{tServices('platformsTitle')}</h2>
          <p className={styles.text}>{tServices('platformsText')}</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>{tServices('coverageTitle')}</h2>
          <p className={styles.text}>{tServices('coverageText')}</p>
        </div>
      </section>

      <div className={styles.container}>
        <SeoRelatedLinks lang={lang} current='services' />
      </div>

      <JsonLd
        id={`faq-services-${lang}`}
        type='application/ld+json'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faq.map((item) => ({
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
  );
}
