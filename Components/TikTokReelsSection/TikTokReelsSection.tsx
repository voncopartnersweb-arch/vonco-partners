'use client';

import { useEffect, useRef } from 'react';
import styles from './TikTokReelsSection.module.css';
import { useTranslations } from 'next-intl';

const TIKTOK_VIDEOS = [
  '7555835692803214614', // Залишаємо тільки ID для чистоти коду
  '7595142898727849238',
  '7382594768141864225',
];

export default function TikTokReelsSection() {
  const t = useTranslations('TikTok');
  const isLoaded = useRef(false);

  useEffect(() => {
    // Оптимізація: завантажуємо скрипт тільки якщо його ще немає
    if (!isLoaded.current && !document.getElementById('tiktok-embed-script')) {
      const script = document.createElement('script');
      script.id = 'tiktok-embed-script';
      script.src = 'https://www.tiktok.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
      isLoaded.current = true;
    }
  }, []);

  return (
    <section className={styles.section} aria-labelledby='tiktok-title'>
      <header className={styles.header}>
        <h2 id='tiktok-title' className={styles.title}>
          {t('title')}
        </h2>
        <p className={styles.subtitle}>{t('subtitle')}</p>
      </header>

      <div className={styles.grid}>
        {TIKTOK_VIDEOS.map((id) => (
          <div key={id} className={styles.videoWrapper}>
            <blockquote
              className='tiktok-embed'
              cite={`https://www.tiktok.com/@vonco.partners/video/${id}`}
              data-video-id={id}
              style={{ maxWidth: '605px', minWidth: '325px' }}
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
    </section>
  );
}
