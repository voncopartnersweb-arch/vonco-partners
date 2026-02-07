'use client';

import Image from 'next/image';
import styles from './CarFleetCarousel.module.css';
import Link from 'next/link';
import { cars } from '../../data/cars';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';

export default function CarFleetCarousel() {
  const t = useTranslations('CarFleet');
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Функція для визначення активної картки при скролі пальцем
  const handleScroll = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, offsetWidth } = sliderRef.current;
    const index = Math.round(scrollLeft / (offsetWidth * 0.8)); // 0.8 відповідає логіці кроку скролу
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  const scrollTo = (index: number) => {
    if (!sliderRef.current) return;
    const scrollAmount = sliderRef.current.offsetWidth * 0.8;
    sliderRef.current.scrollTo({
      left: index * scrollAmount,
      behavior: 'smooth',
    });
    setCurrentIndex(index);
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
          <div className={styles.grid} ref={sliderRef} onScroll={handleScroll}>
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

          <button
            className={`${styles.navBtn} ${styles.prev}`}
            onClick={() => scrollTo(currentIndex - 1)}
            disabled={currentIndex === 0}
          >
            ‹
          </button>
          <button
            className={`${styles.navBtn} ${styles.next}`}
            onClick={() => scrollTo(currentIndex + 1)}
            disabled={currentIndex === cars.length - 1}
          >
            ›
          </button>
        </div>

        {/* Замінили кнопки на індикатори */}
        <div className={styles.controls}>
          {cars.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`${styles.dot} ${currentIndex === index ? styles.activeDot : ''}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
