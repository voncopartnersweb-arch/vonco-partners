import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import styles from './AboutPage.module.css';
import { COMPANY, COMPANY_EMAIL_HREF } from '@/data/company';
import Link from 'next/link';

type AboutPageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'WorkPage' });

  return {
    title: t('aboutTitle'),
    description: t('aboutText'),
    alternates: {
      canonical: `/${lang}/about`,
    },
  };
}

export default async function AboutPage({
  params,
}: AboutPageProps) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'WorkPage' });

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
    </main>
  );
}
