'use client';

import { carouselStyles as styles } from '@/lib/uiStyles';
import { cars } from '../../data/cars';
import { useTranslations } from 'next-intl';
import { useRef, useState, useId, useCallback, useEffect } from 'react';
import CarCard from '../CarCard';

export default function CarFleetCarousel() {
  const t = useTranslations('CarFleet');
  const sliderRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const hasMountedRef = useRef(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionId = useId();

  const handleScroll = useCallback(() => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;

    // Більш точний розрахунок індексу без прив'язки до 0.8
    const totalScrollable = scrollWidth - clientWidth;
    if (totalScrollable <= 0) return;

    const progress = scrollLeft / totalScrollable;
    const index = Math.round(progress * (cars.length - 1));

    if (index !== currentIndex && index >= 0 && index < cars.length) {
      setCurrentIndex(index);
    }
  }, [currentIndex]);

  const scrollTo = (index: number) => {
    if (!sliderRef.current || index < 0 || index >= cars.length) return;

    const { scrollWidth, clientWidth } = sliderRef.current;
    // Розраховуємо позицію скролу пропорційно кількості елементів
    const scrollAmount =
      (scrollWidth - clientWidth) * (index / (cars.length - 1));

    sliderRef.current.scrollTo({
      left: scrollAmount,
      behavior: 'smooth',
    });
    setCurrentIndex(index);
  };

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }
    if (controls.scrollWidth <= controls.clientWidth) return;

    const activeDot = controls.querySelector<HTMLButtonElement>(
      '[aria-selected="true"]',
    );

    if (!activeDot) return;

    const targetLeft =
      activeDot.offsetLeft - controls.clientWidth / 2 + activeDot.clientWidth / 2;

    controls.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: 'smooth',
    });
  }, [currentIndex]);

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
        <p
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: t.raw('description') }}
        />

        <div className={styles.sliderWrapper}>
          <div
            className={styles.grid}
            ref={sliderRef}
            onScroll={handleScroll}
            role='region'
            aria-label={t('galleryAriaLabel')}
          >
            {cars.map((car, index) => (
              <CarCard
                key={car.slug}
                car={car}
                priority={index < 2}
                sizes='(max-width: 768px) 84vw, (max-width: 1200px) 44vw, 320px'
                className={styles.carouselCard}
              />
            ))}
          </div>

          <button
            className={`${styles.navBtn} ${styles.prev}`}
            onClick={() => scrollTo(currentIndex - 1)}
            disabled={currentIndex === 0}
            aria-label={t('previousCar')}
          >
            ‹
          </button>
          <button
            className={`${styles.navBtn} ${styles.next}`}
            onClick={() => scrollTo(currentIndex + 1)}
            disabled={currentIndex === cars.length - 1}
            aria-label={t('nextCar')}
          >
            ›
          </button>
        </div>

        <div
          ref={controlsRef}
          className={styles.controls}
          role='tablist'
          aria-label={t('selectionAriaLabel')}
        >
          {cars.map((car, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`${styles.dot} ${currentIndex === index ? styles.activeDot : ''}`}
              role='tab'
              aria-selected={currentIndex === index}
              aria-label={t('goToCar', { car: car.name })}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
