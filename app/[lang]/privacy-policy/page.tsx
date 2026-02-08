import { useTranslations } from 'next-intl';
import styles from './PrivacyPolicy.module.css';

export default function PrivacyPolicy() {
  const t = useTranslations('PrivacyPolicy');

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>{t('title')}</h1>
        <p className={styles.lastUpdated}>
          {t('lastUpdated')}: {new Date().toLocaleDateString()}
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
          <p className={styles.email}>Email: vonco.partners@gmail.com</p>
        </section>
      </div>
    </main>
  );
}
