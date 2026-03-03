import DriverForm from '../../../Components/driverForm';
import styles from './Contacts.module.css';
import { getTranslations } from 'next-intl/server';
import { COMPANY, COMPANY_EMAIL_HREF } from '@/data/company';
import { Metadata } from 'next';

type ContactsPageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: ContactsPageProps): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'ContactsPage' });

  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: {
      canonical: `/${lang}/contacts`,
    },
  };
}

export default async function Contacts() {
  const t = await getTranslations('ContactsPage');

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>{t('title')}</h1>
          <p className={styles.subtitle}>{t('subtitle')}</p>
        </header>

        <div className={styles.grid}>
          <article className={styles.card}>
            <h2 className={styles.cardTitle}>{t('phonesTitle')}</h2>
            <ul className={styles.list}>
              <li>
                <strong>{t('northCitiesLabel')}:</strong>{' '}
                <a href={`tel:${COMPANY.phones.katowiceRegion.tel}`}>
                  {COMPANY.phones.katowiceRegion.display}
                </a>
              </li>
              <li>
                <strong>{t('southCitiesLabel')}:</strong>{' '}
                <a href={`tel:${COMPANY.phones.krakowRegion.tel}`}>
                  {COMPANY.phones.krakowRegion.display}
                </a>
              </li>
            </ul>
          </article>

          <article className={styles.card}>
            <h2 className={styles.cardTitle}>{t('onlineTitle')}</h2>
            <ul className={styles.list}>
              <li>
                <a
                  href={COMPANY.social.instagram}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Instagram: {COMPANY.social.instagramHandle}
                </a>
              </li>
              <li>
                <a
                  href={COMPANY.social.tiktok}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  TikTok: {COMPANY.social.tiktokHandle}
                </a>
              </li>
              <li>
                <a
                  href={COMPANY.social.facebook}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Facebook: Vonco Partners
                </a>
              </li>
            </ul>
          </article>

          <article className={`${styles.card} ${styles.full}`}>
            <h2 className={styles.cardTitle}>{t('emailTitle')}</h2>
            <p className={styles.emailRow}>
              <a href={COMPANY_EMAIL_HREF}>{COMPANY.email}</a>
            </p>
          </article>

          <article className={`${styles.card} ${styles.full}`}>
            <h2 className={styles.cardTitle}>Реквізити компанії</h2>
            <ul className={styles.list}>
              <li>{COMPANY.legalName}</li>
              <li>{COMPANY.legal.addressLine1}</li>
              <li>{COMPANY.legal.cityPostal}</li>
              <li>
                Tel:{' '}
                <a href={`tel:${COMPANY.phones.office.tel}`}>
                  {COMPANY.phones.office.display}
                </a>
              </li>
              <li>REGON: {COMPANY.legal.regon}</li>
              <li>NIP: {COMPANY.legal.nip}</li>
              <li>KRS: {COMPANY.legal.krs}</li>
            </ul>
          </article>
        </div>

        <div className={styles.formWrap}>
          <DriverForm />
        </div>
      </div>
    </section>
  );
}
