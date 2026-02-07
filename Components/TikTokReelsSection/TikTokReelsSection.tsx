'use client';

import { useEffect, useRef } from 'react';
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

  const scroll = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;
    const scrollAmount = sliderRef.current.offsetWidth * 0.8;
    sliderRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section className={styles.section} aria-labelledby='tiktok-title'>
      <header className={styles.header}>
        <h2 id='tiktok-title' className={styles.title}>
          {t('title')}
        </h2>
        <p className={styles.subtitle}>{t('subtitle')}</p>
      </header>

      <div className={styles.sliderWrapper}>
        <div className={styles.grid} ref={sliderRef}>
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
                    rel='noopener noreferrer'
                  >
                    @vonco.partners
                  </a>
                </section>
              </blockquote>
            </div>
          ))}
        </div>

        {/* Кнопки навігації (ховаються на мобільних, де зручніше гортати пальцем) */}
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

      {/* Нижні кнопки для мобілок */}
      <div className={styles.controls}>
        <button onClick={() => scroll('left')}>‹</button>
        <button onClick={() => scroll('right')}>›</button>
      </div>
    </section>
  );
}
