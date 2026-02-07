'use client';

import Image from 'next/image';
import styles from './CarFleetCarousel.module.css';
import Link from 'next/link';
import { cars } from '../../data/cars';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { useParams } from 'next/navigation';

export default function CarFleetCarousel() {
  const t = useTranslations('CarFleet');
  const { locale } = useParams();
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;
    // Отримуємо ширину однієї картки + gap
    const scrollAmount = sliderRef.current.offsetWidth * 0.8;
    sliderRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section className={styles.section} id='fleet'>
      <div className={styles.container}>
        <h2 className={styles.title}>{t('title')}</h2>
        <p
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: t.raw('description') }}
        />

        <div className={styles.sliderWrapper}>
          <div className={styles.grid} ref={sliderRef}>
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
                    priority
                  />
                </div>
                <div className={styles.overlay}>
                  <h3 className={styles.carName}>{car.name}</h3>
                  <p className={styles.carYear}>{car.year}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Кнопки навігації (видимі завжди, крім дуже малих екранів, де скрол пальцем) */}
          <button
            className={`${styles.navBtn} ${styles.prev}`}
            onClick={() => scroll('left')}
          >
            ‹
          </button>
          <button
            className={`${styles.navBtn} ${styles.next}`}
            onClick={() => scroll('right')}
          >
            ›
          </button>
        </div>

        <div className={styles.controls}>
          <button onClick={() => scroll('left')}>‹</button>
          <button onClick={() => scroll('right')}>›</button>
        </div>
      </div>
    </section>
  );
}
