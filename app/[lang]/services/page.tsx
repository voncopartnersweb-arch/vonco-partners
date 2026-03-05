import { Metadata } from 'next';
import Script from 'next/script';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { buildLanguageAlternates } from '@/lib/seo';
import { COMPANY } from '@/data/company';
import styles from './ServicesPage.module.css';

type ServicesPageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: ServicesPageProps): Promise<Metadata> {
  const { lang } = await params;
  const localizedSeo: Record<string, { title: string; description: string }> = {
    uk: {
      title: 'Оренда авто для таксі та робота водієм у Польщі',
      description:
        'Vonco Partners: оренда авто для таксі, авто під виплату, робота в таксі та робота водієм у Польщі. Uber, Bolt, FreeNow.',
    },
    pl: {
      title: 'Wynajem auta do taxi i praca kierowcy w Polsce',
      description:
        'Vonco Partners: wynajem auta do taxi, auto na wykup i praca kierowcy w Polsce. Uber, Bolt, FreeNow.',
    },
    en: {
      title: 'Taxi Car Rental and Driver Jobs in Poland',
      description:
        'Vonco Partners: taxi car rental, lease-to-own cars, taxi jobs and driver jobs in Poland. Uber, Bolt, FreeNow.',
    },
    ru: {
      title: 'Аренда авто для такси и работа водителем в Польше',
      description:
        'Vonco Partners: аренда авто для такси, авто под выкуп и работа водителем в Польше. Uber, Bolt, FreeNow.',
    },
    es: {
      title: 'Alquiler de coche para taxi y trabajo de conductor en Polonia',
      description:
        'Vonco Partners: alquiler de coche para taxi, coche a plazos y trabajo de conductor en Polonia. Uber, Bolt, FreeNow.',
    },
  };
  const seo = localizedSeo[lang] ?? localizedSeo.en;

  return {
    title: seo.title,
    description: seo.description,
    keywords: [
      'оренда авто',
      'авто для таксі',
      'робота в таксі',
      'робота водієм',
      'taxi car rental',
      'driver jobs',
    ],
    alternates: {
      canonical: `/${lang}/services`,
      languages: buildLanguageAlternates('/services'),
    },
  };
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { lang } = await params;
  const tWork = await getTranslations({ locale: lang, namespace: 'WorkPage' });
  const tFleet = await getTranslations({ locale: lang, namespace: 'FleetInfo' });

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
  ];

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.title}>Vonco Partners Services</h1>
          <p className={styles.subtitle}>{tWork('subtitle')}</p>
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
          <h2 className={styles.sectionTitle}>{tWork('howToStartTitle')}</h2>
          <ol className={styles.steps}>
            <li>{tWork('steps.apply')}</li>
            <li>{tWork('steps.call')}</li>
            <li>{tWork('steps.documents')}</li>
            <li>{tWork('steps.start')}</li>
          </ol>
          <div className={styles.actions}>
            <Link href={COMPANY.links.contacts} className={styles.primaryBtn}>
              {tWork('ctaSecondary')}
            </Link>
            <Link href={COMPANY.links.cars} className={styles.secondaryBtn}>
              {tFleet('buttons.more')}
            </Link>
          </div>
        </div>
      </section>

      <Script
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
