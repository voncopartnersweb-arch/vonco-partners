'use client';

import Image from 'next/image';
import styles from './CarFleet.module.css';
import { Link } from '@/i18n/navigation';
import { cars } from '../data/cars';
import { useTranslations } from 'next-intl';

export default function CarFleet() {
  const t = useTranslations('CarFleet');

  return (
    <section className={styles.section} id='fleet'>
      <div className={styles.container}>
        <h2 className={styles.title}>{t('title')}</h2>
        <p
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: t.raw('description') }}
        />

        <div className={styles.grid}>
          {cars.map((car) => (
            <Link
              key={car.slug}
              href={`/cars/${car.slug}`}
              className={styles.card}
            >
              <div className={styles.imageContainer}>
                <Image
                  src={car.image}
                  alt={car.name}
                  width={400}
                  height={500}
                  className={styles.carImage}
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                />
              </div>
              <div className={styles.overlay}>
                <h3 className={styles.carName}>{car.name}</h3>
                <p className={styles.carYear}>{car.year}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
