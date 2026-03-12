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
  const t = await getTranslations({ locale: lang, namespace: 'AboutPage' });
  const seoTitle = t('seoTitle');

  return {
    title: seoTitle,
    description: t('seoDescription'),
    keywords: ['оренда авто', 'робота в таксі', 'авто для таксі'],
    alternates: {
      canonical: `/${lang}/about`,
      languages: buildLanguageAlternates('/about'),
    },
    openGraph: {
      title: seoTitle,
      description: t('seoDescription'),
      url: `https://vonco.partners/${lang}/about`,
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
      description: t('seoDescription'),
      images: ['/og-image.jpg'],
    },
  };
}

export default async function AboutPage({
  params,
}: AboutPageProps) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'AboutPage' });
  const faq = [
    {
      q: t('faqCompanyTitle'),
      a: t('faqCompanyText'),
    },
    {
      q: t('faqServicesTitle'),
      a: t('faqServicesText'),
    },
    {
      q: t('legalTitle'),
      a: `${COMPANY.legalName}, ${COMPANY.legal.addressLine1}, ${COMPANY.legal.cityPostal}.`,
    },
  ];

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.title}>{t('heroTitle')}</h1>
          <p className={styles.subtitle}>{t('heroText')}</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>{t('companyTitle')}</h2>
          <p className={styles.sectionText}>{t('companyText')}</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>{t('whatWeDoTitle')}</h2>
          <div className={styles.grid}>
            <article className={styles.card}>
              <h3>{t('whatWeDo.rentalTitle')}</h3>
              <p>{t('whatWeDo.rentalText')}</p>
            </article>
            <article className={styles.card}>
              <h3>{t('whatWeDo.buyoutTitle')}</h3>
              <p>{t('whatWeDo.buyoutText')}</p>
            </article>
            <article className={styles.card}>
              <h3>{t('whatWeDo.onboardingTitle')}</h3>
              <p>{t('whatWeDo.onboardingText')}</p>
            </article>
            <article className={styles.card}>
              <h3>{t('whatWeDo.serviceTitle')}</h3>
              <p>{t('whatWeDo.serviceText')}</p>
            </article>
            <article className={styles.card}>
              <h3>{t('whatWeDo.supportTitle')}</h3>
              <p>{t('whatWeDo.supportText')}</p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>{t('howWeWorkTitle')}</h2>
          <ul className={styles.infoList}>
            <li>{t('howWeWork.step1')}</li>
            <li>{t('howWeWork.step2')}</li>
            <li>{t('howWeWork.step3')}</li>
          </ul>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>{t('legalTitle')}</h2>
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
          <h3 className={styles.ctaTitle}>{t('ctaTitle')}</h3>
          <p className={styles.sectionText}>{t('ctaText')}</p>
          <div className={styles.actions}>
            <Link href='/contacts' className={styles.primaryBtn}>
              {t('ctaPrimary')}
            </Link>
            <Link href='/cars' className={styles.secondaryBtn}>
              {t('ctaSecondary')}
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
