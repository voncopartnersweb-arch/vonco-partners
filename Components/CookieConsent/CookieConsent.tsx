'use client';

import { useState, useEffect } from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function CookieConsent() {
  const t = useTranslations('CookieConsent');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    // Показуємо банер, якщо вибір ще не зроблено
    if (!consent) {
      // This state sync only runs once after mount to avoid flashing the banner on SSR.
      // eslint-disable-next-line react-hooks/set-state-in-effect
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
    <div className='cookieConsentWrapper'>
      <div className='cookieConsentContainer'>
        <div className='cookieConsentContent'>
          <h4 className='cookieConsentTitle'>{t('title')}</h4>
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
