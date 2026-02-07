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
  const isLoaded = useRef(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isLoaded.current && !document.getElementById('tiktok-embed-script')) {
      const script = document.createElement('script');
      script.id = 'tiktok-embed-script';
      script.src = 'https://www.tiktok.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
      isLoaded.current = true;
    }
  }, []);

  // Відстежуємо скрол для точок
  const handleScroll = () => {
    if (!sliderRef.current) return;
    const scrollLeft = sliderRef.current.scrollLeft;
    const width = sliderRef.current.offsetWidth;
    const index = Math.round(scrollLeft / width);
    setCurrentIndex(index);
  };

  const scrollTo = (index: number) => {
    if (!sliderRef.current) return;
    const width = sliderRef.current.offsetWidth;
    sliderRef.current.scrollTo({
      left: width * index,
      behavior: 'smooth',
    });
  };

  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <h2 className={styles.title}>{t('title')}</h2>
        <p className={styles.subtitle}>{t('subtitle')}</p>
      </header>

      <div className={styles.sliderWrapper}>
        <div className={styles.grid} ref={sliderRef} onScroll={handleScroll}>
          {TIKTOK_VIDEOS.map((id) => (
            <div key={id} className={styles.videoWrapper}>
              <blockquote
                className='tiktok-embed'
                cite={`https://www.tiktok.com/@vonco.partners/video/${id}`}
                data-video-id={id}
              >
                <section>
                  <a
                    target='_blank'
                    href={`https://www.tiktok.com/@vonco.partners/video/${id}`}
                  >
                    @vonco.partners
                  </a>
                </section>
              </blockquote>
            </div>
          ))}
        </div>

        <button
          className={`${styles.navBtn} ${styles.prev}`}
          onClick={() => scrollTo(currentIndex - 1)}
        >
          ‹
        </button>
        <button
          className={`${styles.navBtn} ${styles.next}`}
          onClick={() => scrollTo(currentIndex + 1)}
        >
          ›
        </button>
      </div>

      {/* Замінили кнопки на точки */}
      <div className={styles.controls}>
        {TIKTOK_VIDEOS.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${currentIndex === index ? styles.activeDot : ''}`}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </section>
  );
}
