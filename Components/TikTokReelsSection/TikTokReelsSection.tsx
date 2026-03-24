'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './TikTokReelsSection.module.css';
import { useTranslations } from 'next-intl';
import { COMPANY } from '@/data/company';

const TIKTOK_VIDEOS = [
  '7555835692803214614',
  '7595142898727849238',
  '7571816672022072598',
];

export default function TikTokReelsSection() {
  const t = useTranslations('TikTok');
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shouldLoadScript, setShouldLoadScript] = useState(false);

  // 1. Оптимізація Performance: вантажимо скрипт тільки при наближенні до секції
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoadScript(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }, // Почати завантаження за 200px до появи
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (shouldLoadScript && !document.getElementById('tiktok-embed-script')) {
      const script = document.createElement('script');
      script.id = 'tiktok-embed-script';
      script.src = 'https://www.tiktok.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, [shouldLoadScript]);

  const handleScroll = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, offsetWidth } = sliderRef.current;
    const index = Math.round(scrollLeft / offsetWidth);
    if (index !== currentIndex) setCurrentIndex(index);
  };

  const scrollTo = (index: number) => {
    if (!sliderRef.current || index < 0 || index >= TIKTOK_VIDEOS.length)
      return;
    const width = sliderRef.current.offsetWidth;
    sliderRef.current.scrollTo({ left: width * index, behavior: 'smooth' });
  };

  return (
    <section
      className={styles.section}
      ref={sectionRef}
      aria-labelledby='tiktok-title'
    >
      <header className={styles.header}>
        <h2 id='tiktok-title' className={styles.title}>
          {t('title')}
        </h2>
        <p className={styles.subtitle}>{t('subtitle')}</p>
      </header>

      <div className={styles.sliderWrapper}>
        <div
          className={styles.grid}
          ref={sliderRef}
          onScroll={handleScroll}
          role='region'
          aria-label={t('carouselAriaLabel')}
        >
          {TIKTOK_VIDEOS.map((id, index) => (
            <div
              key={id}
              className={styles.videoWrapper}
              aria-roledescription='slide'
              aria-label={t('slideAriaLabel', {
                current: index + 1,
                total: TIKTOK_VIDEOS.length,
              })}
            >
              <div className={styles.videoPlaceholder}>
                <blockquote
                  className='tiktok-embed'
                  cite={`${COMPANY.social.tiktok}/video/${id}`}
                  data-video-id={id}
                  style={{ width: '100%', height: '100%' }}
                >
                  <section>
                    <a
                      target='_blank'
                      rel='noopener'
                      href={`${COMPANY.social.tiktok}/video/${id}`}
                      aria-label={t('watchVideoAriaLabel', {
                        current: index + 1,
                      })}
                    >
                      {COMPANY.social.tiktokHandle}
                    </a>
                  </section>
                </blockquote>
              </div>
            </div>
          ))}
        </div>

        <button
          className={`${styles.navBtn} ${styles.prev}`}
          onClick={() => scrollTo(currentIndex - 1)}
          aria-label={t('previousVideo')}
          disabled={currentIndex === 0}
        >
          ‹
        </button>
        <button
          className={`${styles.navBtn} ${styles.next}`}
          onClick={() => scrollTo(currentIndex + 1)}
          aria-label={t('nextVideo')}
          disabled={currentIndex === TIKTOK_VIDEOS.length - 1}
        >
          ›
        </button>
      </div>

      <div className={styles.controls} role='tablist'>
        {TIKTOK_VIDEOS.map((_, index) => (
          <button
            key={index}
            role='tab'
            aria-selected={currentIndex === index}
            aria-label={t('goToSlide', { current: index + 1 })}
            className={`${styles.dot} ${currentIndex === index ? styles.activeDot : ''}`}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </section>
  );
}
