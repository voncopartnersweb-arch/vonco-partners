import styles from './WorkWithUs.module.css';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import { COMPANY } from '@/data/company';
import { Metadata } from 'next';
import { buildLanguageAlternates } from '@/lib/seo';
import Script from 'next/script';

type WorkPageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: WorkPageProps): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'WorkPage' });
  const localizedWorkTitle: Record<string, string> = {
    uk: 'Робота в таксі та робота водієм у Польщі',
    pl: 'Praca w taxi i praca kierowcy w Polsce',
    en: 'Taxi Jobs and Driver Jobs in Poland',
    ru: 'Работа в такси и работа водителем в Польше',
    es: 'Trabajo en taxi y trabajo de conductor en Polonia',
  };
  const seoTitle = localizedWorkTitle[lang] ?? localizedWorkTitle.en;

  return {
    title: seoTitle,
    description: t.has('seoDescription') ? t('seoDescription') : t('subtitle'),
    keywords: ['робота в таксі', 'робота водієм', 'taxi jobs', 'driver jobs'],
    alternates: {
      canonical: `/${lang}/work`,
      languages: buildLanguageAlternates('/work'),
    },
    openGraph: {
      title: seoTitle,
      description: t.has('seoDescription') ? t('seoDescription') : t('subtitle'),
      url: `https://vonco.partners/${lang}/work`,
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
      description: t.has('seoDescription') ? t('seoDescription') : t('subtitle'),
      images: ['/og-image.jpg'],
    },
  };
}

export default async function WorkWithUs() {
  const t = await getTranslations('WorkPage');
  const faq = [
    {
      q: t('requirementsTitle'),
      a: [
        t('requirements.license'),
        t('requirements.residence'),
        t('requirements.language'),
        t('requirements.motivation'),
      ].join('; '),
    },
    {
      q: t('howToStartTitle'),
      a: [
        t('steps.apply'),
        t('steps.call'),
        t('steps.documents'),
        t('steps.start'),
      ].join('; '),
    },
    {
      q: t('benefitsTitle'),
      a: [
        t('benefits.earningsText'),
        t('benefits.scheduleText'),
        t('benefits.supportText'),
        t('benefits.legalText'),
      ].join(' '),
    },
  ];

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.hero}>
          <p className={styles.badge}>{t('badge')}</p>
          <h1 className={styles.title}>{t('title')}</h1>
          <p className={styles.subtitle}>{t('subtitle')}</p>
        </header>

        <section className={styles.block}>
          <h2 className={styles.sectionTitle}>{t('seoIntroTitle')}</h2>
          <p className={styles.text}>{t('seoIntroText')}</p>
        </section>

        <section className={styles.block}>
          <h2 className={styles.sectionTitle}>{t('processTitle')}</h2>
          <div className={styles.benefitsGrid}>
            <article className={styles.card}>
              <h3>{t('processStep1Title')}</h3>
              <p>{t('processStep1Text')}</p>
            </article>
            <article className={styles.card}>
              <h3>{t('processStep2Title')}</h3>
              <p>{t('processStep2Text')}</p>
            </article>
            <article className={styles.card}>
              <h3>{t('processStep3Title')}</h3>
              <p>{t('processStep3Text')}</p>
            </article>
            <article className={styles.card}>
              <h3>{t('processStep4Title')}</h3>
              <p>{t('processStep4Text')}</p>
            </article>
          </div>
        </section>

        <section className={styles.block}>
          <h2 className={styles.sectionTitle}>{t('aboutTitle')}</h2>
          <p className={styles.text}>{t('aboutText')}</p>
        </section>

        <section className={styles.block}>
          <h2 className={styles.sectionTitle}>{t('benefitsTitle')}</h2>
          <div className={styles.benefitsGrid}>
            <article className={styles.card}>
              <h3>{t('benefits.earningsTitle')}</h3>
              <p>{t('benefits.earningsText')}</p>
            </article>
            <article className={styles.card}>
              <h3>{t('benefits.scheduleTitle')}</h3>
              <p>{t('benefits.scheduleText')}</p>
            </article>
            <article className={styles.card}>
              <h3>{t('benefits.supportTitle')}</h3>
              <p>{t('benefits.supportText')}</p>
            </article>
            <article className={styles.card}>
              <h3>{t('benefits.legalTitle')}</h3>
              <p>{t('benefits.legalText')}</p>
            </article>
          </div>
        </section>

        <section className={styles.block}>
          <h2 className={styles.sectionTitle}>{t('requirementsTitle')}</h2>
          <p className={styles.text}>{t('requirementsIntro')}</p>
          <ul className={styles.list}>
            <li>{t('requirements.license')}</li>
            <li>{t('requirements.residence')}</li>
            <li>{t('requirements.language')}</li>
            <li>{t('requirements.motivation')}</li>
          </ul>
        </section>

        <section className={styles.block}>
          <h2 className={styles.sectionTitle}>{t('howToStartTitle')}</h2>
          <ol className={styles.steps}>
            <li>{t('steps.apply')}</li>
            <li>{t('steps.call')}</li>
            <li>{t('steps.documents')}</li>
            <li>{t('steps.start')}</li>
          </ol>
        </section>

        <section className={styles.block}>
          <h2 className={styles.sectionTitle}>{t('fleetTitle')}</h2>
          <p className={styles.text}>{t('fleetText')}</p>
        </section>

        <section className={styles.block}>
          <h2 className={styles.sectionTitle}>{t('buyoutTitle')}</h2>
          <p className={styles.text}>{t('buyoutText')}</p>
        </section>

        <section className={styles.block}>
          <h2 className={styles.sectionTitle}>{t('coverageTitle')}</h2>
          <p className={styles.text}>{t('coverageText')}</p>
        </section>

        <section className={styles.cta}>
          <h2>{t('ctaTitle')}</h2>
          <p>{t('ctaText')}</p>
          <div className={styles.actions}>
            <a
              href={`tel:${COMPANY.phones.katowiceRegion.tel}`}
              className={styles.primaryBtn}
            >
              {t('ctaPrimary')}
            </a>
            <Link href='/contacts' className={styles.secondaryBtn}>
              {t('ctaSecondary')}
            </Link>
          </div>
        </section>
      </div>

      <Script
        id='faq-work'
        type='application/ld+json'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faq.map((item) => ({
              '@type': 'Question',
              name: item.q,
              acceptedAnswer: { '@type': 'Answer', text: item.a },
            })),
          }),
        }}
      />
    </main>
  );
}
