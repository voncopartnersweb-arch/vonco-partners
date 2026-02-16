import Image from 'next/image';
import styles from './page.module.css';
import DriverForm from '../../Components/driverForm';
import HowItWorks from '@/Components/HowItWorks/HowItWorks';
import SocialSection from '@/Components/SocialSection/SocialSection';

import FleetOffer from '@/Components/FleetOffer/FleetOffer';
import TikTokReelsSection from '@/Components/TikTokReelsSection/TikTokReelsSection';

import CarFleetCarousel from '@/Components/carsCarusel/CarFleetCarusel';

import HeroSection from '@/Components/HeroSection/HeroSection';

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.formContainer}>
          <Image
            src='/vonco-logo.jpg'
            alt='Vonco Partners logo'
            width={300}
            height={300}
            sizes='(max-width: 640px) 120px,
         (max-width: 1024px) 180px,
         300px'
            priority
            className={styles.logoImage}
          />
          <HeroSection />
        </div>

        <HowItWorks />
        <DriverForm />
        <SocialSection />
        {/*  <TikTokReelsSection /> */}
        <FleetOffer />
        <CarFleetCarousel />
      </main>
    </div>
  );
}
