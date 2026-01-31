import Image from 'next/image';
import styles from './page.module.css';

import DriverForm from '@/Components/driverForm';
import WhyUs from '@/Components/whyUs';
import WhatWeOffer from '@/Components/whatWeOffer';
import CarFleet from '@/Components/carFleet';
import HowToStart from '@/Components/HowToStart';
import { getMeals } from '@/lib/cars';

export default async function Home() {
  const meals = await getMeals();
  console.log('meals', meals);
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
        {/* <div>
          <WhyUs />
        </div>
        <div>
          <WhatWeOffer />
        </div>
        <div>
          <CarFleet />
        </div>
        <div>
          <HowToStart />
        </div> */}
      </main>
    </div>
  );
}
