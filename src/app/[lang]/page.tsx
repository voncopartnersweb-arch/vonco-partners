import Image from 'next/image';
import styles from './page.module.css';
import DriverForm from '@/Components/driverForm';

export default async function Home({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params;
  console.log('lang param:', lang);

  return (
    <div className={styles.page}>
      <div>
        <h1>
          lang: {lang} {"t('title')"}
        </h1>
      </div>
      <main className={styles.main}>
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
