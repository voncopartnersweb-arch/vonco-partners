'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './TikTokReelsSection.module.css';
import { useTranslations } from 'next-intl';

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
          aria-label='TikTok video carousel'
        >
          {TIKTOK_VIDEOS.map((id, index) => (
            <div
              key={id}
              className={styles.videoWrapper}
              aria-roledescription='slide'
              aria-label={`${index + 1} of ${TIKTOK_VIDEOS.length}`}
            >
              <div className={styles.videoPlaceholder}>
                <blockquote
                  className='tiktok-embed'
                  cite={`https://www.tiktok.com/@vonco.partners/video/${id}`}
                  data-video-id={id}
                  style={{ width: '100%', height: '100%' }}
                >
                  <section>
                    <a
                      target='_blank'
                      rel='noopener'
                      href={`https://www.tiktok.com/@vonco.partners/video/${id}`}
                      /* ВИПРАВЛЕНО: Унікальний опис для кожного посилання */
                      aria-label={`Watch Vonco Partners video ${index + 1} on TikTok`}
                    >
                      @vonco.partners
                    </a>
                  </section>
                </blockquote>
              </div>
            </div>
          ))}
        </div>

        {/* Accessibility: додано aria-label для кнопок */}
        <button
          className={`${styles.navBtn} ${styles.prev}`}
          onClick={() => scrollTo(currentIndex - 1)}
          aria-label='Previous video'
          disabled={currentIndex === 0}
        >
          ‹
        </button>
        <button
          className={`${styles.navBtn} ${styles.next}`}
          onClick={() => scrollTo(currentIndex + 1)}
          aria-label='Next video'
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
            aria-label={`Go to slide ${index + 1}`}
            className={`${styles.dot} ${currentIndex === index ? styles.activeDot : ''}`}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </section>
  );
}
