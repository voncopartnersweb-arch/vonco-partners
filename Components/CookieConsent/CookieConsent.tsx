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
    <div className='fixed inset-x-4 bottom-[calc(16px+env(safe-area-inset-bottom))] z-[9999] mx-auto max-w-[900px]'>
      <div className='flex items-center justify-between gap-5 rounded-2xl border border-white/15 bg-[#101012]/96 p-5 text-white shadow-2xl backdrop-blur-xl max-md:flex-col max-md:items-stretch max-md:p-4'>
        <div className='flex-1'>
          <p className='mb-2 font-extrabold'>{t('title')}</p>
          <p className='text-sm leading-6 text-zinc-200'>
            {t('description')}{' '}
            <Link href='/privacy-policy' className='font-bold text-accent underline underline-offset-4'>
              {t('linkText')}
            </Link>
            .
          </p>
        </div>
        <div className='flex shrink-0 gap-2.5 max-md:w-full'>
          <button onClick={handleDeclineAll} className='min-h-11 rounded-xl border border-white/25 bg-transparent px-4 text-sm font-bold transition hover:bg-white/10 max-md:flex-1'>
            {t('decline')}
          </button>
          <button onClick={handleAcceptAll} className='min-h-11 rounded-xl border-0 bg-accent px-4 text-sm font-bold text-navy transition hover:bg-accent-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent max-md:flex-1'>
            {t('accept')}
          </button>
        </div>
      </div>
    </div>
  );
}
