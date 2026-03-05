import Image from 'next/image';
import styles from './page.module.css';
import HowItWorks from '@/Components/HowItWorks/HowItWorks';
import HeroSection from '@/Components/HeroSection/HeroSection';

// Use tiny client wrappers that perform client-side dynamic import (ssr:false)
import ClientDriverForm from '@/Components/ClientDriverForm';
import ClientSocialSection from '@/Components/ClientSocialSection';
import ClientFleetOffer from '@/Components/ClientFleetOffer';
import ClientCarFleetCarousel from '@/Components/ClientCarFleetCarousel';
import ChatBot from '@/Components/ChatBot/ChatBot';
import ClientDeferred from '@/Components/ClientDeferred';

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
            fetchPriority='high'
            loading='eager'
            className={styles.logoImage}
          />
          <HeroSection />
        </div>
        <ClientDeferred delayMs={400}>
          <ChatBot />
        </ClientDeferred>

        <HowItWorks />
        <ClientDeferred delayMs={700}>
          <ClientDriverForm />
        </ClientDeferred>
        <ClientDeferred delayMs={900}>
          <ClientSocialSection />
        </ClientDeferred>

        {/* <ClientTikTokReelsSection /> */}
        <ClientDeferred delayMs={1100}>
          <ClientFleetOffer />
        </ClientDeferred>
        <ClientDeferred delayMs={1300}>
          <ClientCarFleetCarousel />
        </ClientDeferred>
      </main>
    </div>
  );
}
