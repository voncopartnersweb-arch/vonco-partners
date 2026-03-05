import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import styles from './AboutPage.module.css';
import { COMPANY, COMPANY_EMAIL_HREF } from '@/data/company';
import { Link } from '@/i18n/navigation';
import { buildLanguageAlternates } from '@/lib/seo';
import Script from 'next/script';

type AboutPageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'WorkPage' });
  const localizedAboutTitle: Record<string, string> = {
    uk: 'Про Vonco Partners: оренда авто та робота в таксі',
    pl: 'O Vonco Partners: wynajem aut i praca w taxi',
    en: 'About Vonco Partners: Car Rental and Taxi Work',
    ru: 'О Vonco Partners: аренда авто и работа в такси',
    es: 'Sobre Vonco Partners: alquiler de coche y trabajo en taxi',
  };
  const seoTitle = localizedAboutTitle[lang] ?? localizedAboutTitle.en;

  return {
    title: seoTitle,
    description: t('aboutText'),
    keywords: ['оренда авто', 'робота в таксі', 'авто для таксі'],
    alternates: {
      canonical: `/${lang}/about`,
      languages: buildLanguageAlternates('/about'),
    },
  };
}

export default async function AboutPage({
  params,
}: AboutPageProps) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'WorkPage' });
  const faq = [
    {
      q: t('aboutTitle'),
      a: t('aboutText'),
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
    {
      q: 'Vonco Partners',
      a: `${COMPANY.legalName}, ${COMPANY.legal.addressLine1}, ${COMPANY.legal.cityPostal}.`,
    },
  ];

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.title}>{t('aboutTitle')}</h1>
          <p className={styles.subtitle}>{t('aboutText')}</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>{t('benefitsTitle')}</h2>
          <div className={styles.grid}>
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
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Vonco Partners</h2>
          <ul className={styles.infoList}>
            <li>{COMPANY.legalName}</li>
            <li>{COMPANY.legal.addressLine1}</li>
            <li>{COMPANY.legal.cityPostal}</li>
            <li>
              NIP: {COMPANY.legal.nip} | REGON: {COMPANY.legal.regon} | KRS:{' '}
              {COMPANY.legal.krs}
            </li>
            <li>
              <a href={`tel:${COMPANY.phones.office.tel}`}>
                {COMPANY.phones.office.display}
              </a>{' '}
              | <a href={COMPANY_EMAIL_HREF}>{COMPANY.email}</a>
            </li>
          </ul>
          <div className={styles.actions}>
            <Link href='/contacts' className={styles.primaryBtn}>
              Contacts
            </Link>
            <Link href='/cars' className={styles.secondaryBtn}>
              Cars Fleet
            </Link>
          </div>
        </div>
      </section>

      <Script
        id='faq-about'
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
