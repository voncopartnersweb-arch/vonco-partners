'use client';

import { useState, useEffect } from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import {
  CONSENT_CHANGE_EVENT,
  CONSENT_STORAGE_KEY,
} from '@/lib/analytics';

export default function CookieConsent() {
  const t = useTranslations('CookieConsent');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_STORAGE_KEY);
    // Показуємо банер, якщо вибір ще не зроблено
    if (!consent) {
      // This state sync only runs once after mount to avoid flashing the banner on SSR.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem(CONSENT_STORAGE_KEY, 'all');
    window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
    setIsVisible(false);
  };

  const handleDeclineAll = () => {
    localStorage.setItem(CONSENT_STORAGE_KEY, 'essential');
    window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className='cookieConsentWrapper'>
      <div className='cookieConsentContainer'>
        <div className='cookieConsentContent'>
          <p className='cookieConsentTitle'>{t('title')}</p>
          <p className='cookieConsentText'>
            {t('description')}{' '}
            <Link href='/privacy-policy' className='cookieConsentLink'>
              {t('linkText')}
            </Link>
            .
          </p>
        </div>
        <div className='cookieConsentActions'>
          <button onClick={handleDeclineAll} className='cookieConsentSecondary'>
            {t('decline')}
          </button>
          <button onClick={handleAcceptAll} className='cookieConsentPrimary'>
            {t('accept')}
          </button>
        </div>
      </div>
    </div>
  );
}
