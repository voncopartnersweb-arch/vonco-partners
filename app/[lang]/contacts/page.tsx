import DriverForm from '../../../Components/driverForm';
import styles from './Contacts.module.css';
import { getTranslations } from 'next-intl/server';

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
                <a href='tel:+48572867193'>+48 572 867 193</a>
              </li>
              <li>
                <strong>{t('southCitiesLabel')}:</strong>{' '}
                <a href='tel:+48794110572'>+48 794 110 572</a>
              </li>
            </ul>
          </article>

          <article className={styles.card}>
            <h2 className={styles.cardTitle}>{t('onlineTitle')}</h2>
            <ul className={styles.list}>
              <li>
                <a
                  href='https://www.instagram.com/vonco.partners'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Instagram: @vonco.partners
                </a>
              </li>
              <li>
                <a
                  href='https://www.tiktok.com/@vonco.partners'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  TikTok: @vonco.partners
                </a>
              </li>
              <li>
                <a
                  href='https://www.facebook.com/p/Voncopartners-100089457913783/'
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
              <a href='mailto:vonco.partners@gmail.com'>
                vonco.partners@gmail.com
              </a>
            </p>
          </article>
        </div>

        <div className={styles.formWrap}>
          <DriverForm />
        </div>
      </div>
    </section>
  );
}
