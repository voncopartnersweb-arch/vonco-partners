import Image from 'next/image';
import styles from './page.module.css';
import dynamic from 'next/dynamic';
import HowItWorks from '@/Components/HowItWorks/HowItWorks';
import HeroSection from '@/Components/HeroSection/HeroSection';

// Dynamically import heavier/non-critical components to reduce initial JS/CSS
const DriverForm = dynamic(() => import('../../Components/driverForm'), {
  ssr: false,
});
const SocialSection = dynamic(
  () => import('@/Components/SocialSection/SocialSection'),
  { ssr: false },
);
const FleetOffer = dynamic(() => import('@/Components/FleetOffer/FleetOffer'), {
  ssr: false,
});
const CarFleetCarousel = dynamic(
  () => import('@/Components/carsCarusel/CarFleetCarusel'),
  { ssr: false },
);
const TikTokReelsSection = dynamic(
  () => import('@/Components/TikTokReelsSection/TikTokReelsSection'),
  { ssr: false },
);

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
