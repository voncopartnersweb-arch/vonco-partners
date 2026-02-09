'use client';

import Image from 'next/image';
import styles from './CarFleetCarousel.module.css';
import Link from 'next/link';
import { cars } from '../../data/cars';
import { useTranslations } from 'next-intl';
import { useRef, useState, useId } from 'react';

export default function CarFleetCarousel() {
  const t = useTranslations('CarFleet');
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionId = useId();

  const handleScroll = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, offsetWidth } = sliderRef.current;
    // Більш надійний розрахунок індексу
    const index = Math.round(scrollLeft / (offsetWidth * 0.8));
    if (index !== currentIndex && index >= 0 && index < cars.length) {
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
    <section
      className={styles.section}
      id='fleet'
      aria-labelledby={`title-${sectionId}`}
    >
      <div className={styles.container}>
        <h2 id={`title-${sectionId}`} className={styles.title}>
          {t('title')}
        </h2>
        <p className={styles.description}>
          {/* Якщо в перекладах тільки базові теги типу <br/>, краще використовувати t('description') */}
          {t('description')}
        </p>

        <div className={styles.sliderWrapper}>
          <div
            className={styles.grid}
            ref={sliderRef}
            onScroll={handleScroll}
            role='region'
            aria-label='Car gallery carousel'
          >
            {cars.map((car, index) => (
              <Link
                key={car.slug}
                href={`/cars/${car.slug}`}
                className={styles.card}
                aria-label={`${t('viewDetails')} ${car.name}`}
              >
                <div className={styles.imageContainer}>
                  <Image
                    src={car.image}
                    alt={`${car.name} - ${car.year}`}
                    width={400}
                    height={500}
                    className={styles.carImage}
                    // Пріоритет тільки для перших двох карток
                    priority={index < 2}
                    // Для інших додаємо lazy loading (автоматично в Next.js Image)
                    sizes='(max-width: 640px) 120px,
         (max-width: 1024px) 180px,
         300px'
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
            aria-label='Previous slide'
          >
            ‹
          </button>
          <button
            className={`${styles.navBtn} ${styles.next}`}
            onClick={() => scrollTo(currentIndex + 1)}
            disabled={currentIndex === cars.length - 1}
            aria-label='Next slide'
          >
            ›
          </button>
        </div>

        <div className={styles.controls} role='tablist'>
          {cars.map((car, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`${styles.dot} ${currentIndex === index ? styles.activeDot : ''}`}
              role='tab'
              aria-selected={currentIndex === index}
              aria-label={`Go to ${car.name}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
