'use client';

import { carGridStyles as styles } from '@/lib/uiStyles';
import { cars } from '../data/cars';
import { useTranslations } from 'next-intl';
import CarCard from './CarCard';

export default function CarFleet() {
  const t = useTranslations('CarFleet');

  return (
    <section className={styles.section} id='fleet'>
      <div className={styles.container}>
        <h1 className={styles.title}>{t('title')}</h1>
        <p
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: t.raw('description') }}
        />

        <div className={styles.grid}>
          {cars.map((car) => (
            <CarCard
              key={car.slug}
              car={car}
              headingLevel='h2'
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
            />
          ))}
        </div>
      </div>
    </section>
  );
}
