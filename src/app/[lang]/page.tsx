import Image from 'next/image';
import styles from './page.module.css';

import DriverForm from '@/Components/driverForm';
import { getLocale, getTranslations } from 'next-intl/server';

export default async function Home() {
  const t = await getTranslations('HomePage');
  const locale = await getLocale();
  return (
    <div className={styles.page}>
      <div>
        <h1>LOCALE: {locale}</h1>
      </div>
      <main className={styles.main}>
        <span className={styles.topLine}>{t('title')}</span>
        <div className={styles.formContainer}>
          <Image
            src='/vonco-logo.jpg'
            alt='Vonco Partners logo'
            width={300}
            height={300}
            className={styles.logoImage}
          />
          <DriverForm />
        </div>
      </main>
    </div>
  );
}
