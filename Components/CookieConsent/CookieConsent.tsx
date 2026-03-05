'use client';

import { useState, useEffect } from 'react';
import { Link } from '@/i18n/navigation';
import styles from './CookieConsent.module.css';
import { useTranslations } from 'next-intl';
import LocaleSwitcher from '../LocaleSwitcher';

export default function CookieConsent() {
  const t = useTranslations('CookieConsent');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    // Показуємо банер, якщо вибір ще не зроблено
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cookie-consent', 'all');
    setIsVisible(false);
  };

  const handleDeclineAll = () => {
    localStorage.setItem('cookie-consent', 'essential');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h4 className={styles.title}>{t('title')}</h4>
          <p className={styles.text}>
            {t('description')}{' '}
            <Link href='/privacy-policy' className={styles.link}>
              {t('linkText')}
            </Link>
            .
          </p>
        </div>
        <LocaleSwitcher />
        <div className={styles.actions}>
          <button onClick={handleDeclineAll} className={styles.secondary}>
            {t('decline')}
          </button>
          <button onClick={handleAcceptAll} className={styles.primary}>
            {t('accept')}
          </button>
        </div>
      </div>
    </div>
  );
}
