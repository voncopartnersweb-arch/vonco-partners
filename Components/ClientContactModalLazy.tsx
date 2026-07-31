'use client';

import { useState } from 'react';
import type { ComponentType } from 'react';
import { useTranslations } from 'next-intl';
import { contactModalStyles as styles } from '@/lib/uiStyles';

type LazyContactModal = ComponentType<{ initiallyOpen?: boolean }>;

export default function ClientContactModalLazy() {
  const t = useTranslations('ContactsPage');
  const [ContactModal, setContactModal] = useState<LazyContactModal | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  function loadContacts() {
    if (ContactModal || isLoading) return;
    setIsLoading(true);
    window.dispatchEvent(
      new CustomEvent('vonco:floating-panel-open', { detail: 'contacts' }),
    );

    void import('./ContactModal/ContactModal')
      .then((mod) => setContactModal(() => mod.default))
      .finally(() => setIsLoading(false));
  }

  if (ContactModal) return <ContactModal initiallyOpen />;

  return (
    <button
      type='button'
      className={styles.launcher}
      onClick={loadContacts}
      aria-label={t('title')}
      aria-haspopup='dialog'
      aria-busy={isLoading}
    >
      <svg
        width='27'
        height='27'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        aria-hidden='true'
      >
        <path d='M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z' />
        <path d='M4.5 21a7.5 7.5 0 0 1 15 0' />
        <path d='M18 8h4M20 6v4' />
      </svg>
    </button>
  );
}
