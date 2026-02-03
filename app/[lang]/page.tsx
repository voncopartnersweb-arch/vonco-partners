import Image from 'next/image';
import styles from './page.module.css';
import DriverForm from '../../Components/driverForm';
import HowItWorks from '@/Components/HowItWorks/HowItWorks';
import SocialSection from '@/Components/SocialSection/SocialSection';

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return (
    <div className={styles.page}>
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
        <HowItWorks />
        <SocialSection />
      </main>
    </div>
  );
}
