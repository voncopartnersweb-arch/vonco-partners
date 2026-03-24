import { useTranslations } from 'next-intl';
import styles from './SocialSection.module.css';
import {
  FACEBOOK_URL,
  INSTAGRAM_URL,
  TELEGRAM_GROUP_URL,
  TELEGRAM_URL,
  TIKTOK_URL,
} from '@/data/sotialLinks';

const SocialSection = () => {
  const t = useTranslations('Socials');

  const socialLinks = [
    {
      id: 'instagram',
      name: t('instagram'),
      url: INSTAGRAM_URL,
      color: '#E4405F',
      ariaLabel: 'Follow us on Instagram', // Можна додати в переклади
      iconPath:
        'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
    },
    {
      id: 'facebook',
      name: t('facebook'),
      url: FACEBOOK_URL,
      color: '#1877F2',
      ariaLabel: 'Follow us on Facebook',
      iconPath:
        'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
    },
    {
      id: 'tiktok',
      name: t('tiktok'),
      url: TIKTOK_URL,
      color: 'rgb(254, 44, 85)',
      ariaLabel: 'Follow us on TikTok',

      iconPath:
        'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.6-4.12-1.31a8.113 8.113 0 01-1.33-.92v7.53c.03 2.05-.62 4.17-2.12 5.58-1.58 1.54-3.95 2.21-6.12 1.82-2.17-.38-4.1-1.85-5.07-3.85-.97-2.01-.81-4.52.43-6.38 1.25-1.89 3.54-2.99 5.81-2.84v4.18c-1.12-.13-2.3.26-3.04 1.1-.73.84-.91 2.07-.47 3.1.44 1.03 1.52 1.73 2.64 1.74 1.12.01 2.19-.68 2.64-1.7.35-.8.36-1.7.36-2.57.01-4.01.01-8.02.01-12.03z',
    },
    {
      id: 'telegram',
      name: t('telegram'),
      url: TELEGRAM_GROUP_URL,
      color: '#24A1DE',
      ariaLabel: 'Follow us on Telegram',
      iconPath:
        'M21.9 4.6c.3-1.5-1-2.7-2.4-2.2L3.5 8.7C2 9.2 2 11.3 3.5 11.7l3.3 1 1.3 4.1c.4 1.3 2.1 1.7 3.1.8l1.9-1.8 3.8 2.8c1.1.8 2.6.2 2.9-1.1L21.9 4.6zM9.3 12.2l8-6.1-6.7 7.3-.4 1.8-.9-3z',
    },
  ];

  return (
    <section className={styles.wrapper} aria-labelledby='social-heading'>
      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.badge}>{t('title')}</span>
          <h2 id='social-heading' className={styles.heading}>
            {t('greeting')}
          </h2>
          <p className={styles.text}>{t('invitation')}</p>

          <nav className={styles.buttonGroup} aria-label={t('navigationAria')}>
            {socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target='_blank'
                rel='noopener noreferrer'
                className={styles.ctaButton}
                aria-label={link.ariaLabel}
                style={{ '--brand-color': link.color } as React.CSSProperties}
              >
                <svg
                  width='20'
                  height='20'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                  aria-hidden='true'
                >
                  <path d={link.iconPath} />
                </svg>
                <span className={styles.buttonText}>{link.name}</span>
              </a>
            ))}
          </nav>
        </div>

        <div className={styles.visuals} aria-hidden='true'>
          <div className={`${styles.circle} ${styles.circle1}`}></div>
          <div className={`${styles.circle} ${styles.circle2}`}></div>
          <div className={styles.glassCard}>
            <span>#vonco.partners</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialSection;
