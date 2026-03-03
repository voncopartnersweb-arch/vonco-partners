import { getTranslations } from 'next-intl/server';
import styles from './PrivacyPolicy.module.css';
import { COMPANY } from '@/data/company';

type PrivacyPolicyPageProps = {
  params: Promise<{ lang: string }>;
};

const POLICY_LAST_UPDATED = '2026-03-03';

export default async function PrivacyPolicy({ params }: PrivacyPolicyPageProps) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'PrivacyPolicy' });
  const formattedDate = new Intl.DateTimeFormat(lang, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(POLICY_LAST_UPDATED));

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>{t('title')}</h1>
        <p className={styles.lastUpdated}>
          {t('lastUpdated')}: {formattedDate}
        </p>

        <section className={styles.section}>
          <h2>1. {t('sections.general.title')}</h2>
          <p>{t('sections.general.content')}</p>
        </section>

        <section className={styles.section}>
          <h2>2. {t('sections.dataCollection.title')}</h2>
          <p>{t('sections.dataCollection.content')}</p>
          <ul>
            {['name', 'phone', 'email', 'city', 'cookies'].map((item) => (
              <li key={item}>{t(`sections.dataCollection.items.${item}`)}</li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <h2>3. {t('sections.purpose.title')}</h2>
          <p>{t('sections.purpose.content')}</p>
        </section>

        <section className={styles.section}>
          <h2>4. {t('sections.rights.title')}</h2>
          <p>{t('sections.rights.content')}</p>
        </section>

        <section className={styles.section}>
          <h2>5. {t('sections.contact.title')}</h2>
          <p>{t('sections.contact.content')}</p>
          <p className={styles.email}>Email: {COMPANY.email}</p>
          <p className={styles.email}>
            {COMPANY.legalName}
            <br />
            {COMPANY.legal.addressLine1}, {COMPANY.legal.cityPostal}
            <br />
            REGON: {COMPANY.legal.regon} | NIP: {COMPANY.legal.nip} | KRS:{' '}
            {COMPANY.legal.krs}
          </p>
        </section>
      </div>
    </main>
  );
}
