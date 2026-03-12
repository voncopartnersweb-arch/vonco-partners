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
  be: {
    title: 'Арэнда аўто для таксі і праца кіроўцам у Польшчы',
    description:
      'Vonco Partners: арэнда аўто для таксі, аўто пад выкуп і праца кіроўцам у Польшчы. Uber, Bolt, FreeNow.',
  },
  hy: {
    title: 'Մեքենաների վարձույթ տաքսիի համար և վարորդի աշխատանք Լեհաստանում',
    description:
      'Vonco Partners. մեքենաների վարձույթ տաքսիի համար, մեքենաներ հետգնման իրավունքով և վարորդի աշխատանք Լեհաստանում: Uber, Bolt, FreeNow:',
  },
  ka: {
    title: 'ავტომობილის გაქირავება ტაქსისთვის და მძღოლის სამუშაო პოლონეთში',
    description:
      'Vonco Partners: მანქანის გაქირავება ტაქსისთვის, ავტო გამოსყიდვით და მძღოლის სამუშაო პოლონეთში. Uber, Bolt, FreeNow.',
  },
  az: {
    title: 'Polşada taksi üçün avtomobil icarəsi va sürücü işi',
    description:
      'Vonco Partners: taksi üçün avtomobil icarəsi, satın alma hüququ ilə avtomobillər və Polşada sürücü işi. Uber, Bolt, FreeNow.',
  },
  uz: {
    title: 'Taksi uchun mashina ijarasi va Polshada haydovchilik ishi',
    description:
      'Vonco Partners: taksi ijarasi, sotib olish huquqi bilan mashinalar va Polshada haydovchi bo‘lib ishlash. Uber, Bolt, FreeNow.',
  },
  kk: {
    title: 'Польшада таксиге арналған автокөлік жалдау және жүргізуші жұмысы',
    description:
      'Vonco Partners: таксиге арналған автокөлік жалдау, кейін сатып алу құқығымен автокөліктер және Польшадағы жүргізуші жұмысы. Uber, Bolt, FreeNow.',
  },
  ro: {
    title: 'Închiriere auto taxi și joburi de șofer în Polonia',
    description:
      'Vonco Partners: închiriere mașini taxi, mașini cu opțiune de cumpărare și muncă de șofer în Polonia. Uber, Bolt, FreeNow.',
  },
  tg: {
    title: 'Иҷораи мошин барои таксӣ ва кори ронандагӣ дар Лаҳистон',
    description:
      'Vonco Partners: иҷораи мошин барои таксӣ, мошин бо ҳуқуқи харид ва кори ронанда дар Лаҳистон. Uber, Bolt, FreeNow.',
  },
};

export async function generateMetadata({
  params,
}: ServicesPageProps): Promise<Metadata> {
  const { lang } = await params;
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
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `https://vonco.partners/${lang}/services`,
      type: 'website',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: seo.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
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
  const localizedTitle = localizedSeo[lang]?.title ?? localizedSeo.en.title;

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
          <h1 className={styles.title}>{localizedTitle}</h1>
          <p className={styles.subtitle}>{tWork('subtitle')}</p>
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
            <Link href={COMPANY.links.contacts} className={styles.primaryBtn}>
              {tWork('ctaSecondary')}
            </Link>
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
