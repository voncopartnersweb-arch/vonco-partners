import Image from 'next/image';
import styles from './page.module.css';
import DriverForm from '../../Components/driverForm';
import HowItWorks from '@/Components/HowItWorks/HowItWorks';
import SocialSection from '@/Components/SocialSection/SocialSection';
import FleetInfo from '@/Components/FleetOffer/FleetOffer';
import FleetOffer from '@/Components/FleetOffer/FleetOffer';
import TikTokReelsSection from '@/Components/TikTokReelsSection/TikTokReelsSection';
import CarFleet from '@/Components/carFleet';
import CarFleetCarousel from '@/Components/carsCarusel/CarFleetCarusel';
import { PolandMap } from '@/Components/PolandMap/PolandMap';
import HeroSection from '@/Components/HeroSection/HeroSection';

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
          <HeroSection />
        </div>

        <HowItWorks />
        <DriverForm />
        <SocialSection />
        <TikTokReelsSection />
        <FleetOffer />
        {/* <CarFleet /> */}
        <CarFleetCarousel />
      </main>
    </div>
  );
}
