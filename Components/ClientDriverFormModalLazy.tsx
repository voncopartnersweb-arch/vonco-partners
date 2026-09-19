'use client';

import { ClipboardPenLine } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';
import type { ComponentType } from 'react';
import {
  DRIVER_FORM_OPEN_EVENT,
  FLOATING_PANEL_OPEN_EVENT,
} from '@/lib/floating-panels';
import { driverFormModalStyles as styles } from '@/lib/uiStyles';

type LazyDriverFormModal = ComponentType<{
  initiallyOpen?: boolean;
  initialReturnFocus?: HTMLElement | null;
}>;

export default function ClientDriverFormModalLazy() {
  const t = useTranslations('DriverForm');
  const [DriverFormModal, setDriverFormModal] =
    useState<LazyDriverFormModal | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [initialReturnFocus, setInitialReturnFocus] =
    useState<HTMLElement | null>(null);

  const loadForm = useCallback(() => {
    if (DriverFormModal || isLoading) return;
    setInitialReturnFocus(document.activeElement as HTMLElement | null);
    setIsLoading(true);
    window.dispatchEvent(
      new CustomEvent(FLOATING_PANEL_OPEN_EVENT, { detail: 'form' }),
    );

    void import('./DriverFormModal/DriverFormModal')
      .then((mod) => setDriverFormModal(() => mod.default))
      .finally(() => setIsLoading(false));
  }, [DriverFormModal, isLoading]);

  useEffect(() => {
    window.addEventListener(DRIVER_FORM_OPEN_EVENT, loadForm);
    return () => window.removeEventListener(DRIVER_FORM_OPEN_EVENT, loadForm);
  }, [loadForm]);

  if (DriverFormModal) {
    return (
      <DriverFormModal
        initiallyOpen
        initialReturnFocus={initialReturnFocus}
      />
    );
  }

  return (
    <button
      type='button'
      className={styles.launcher}
      onClick={loadForm}
      aria-label={t('title')}
      aria-haspopup='dialog'
      aria-busy={isLoading}
    >
      <ClipboardPenLine size={27} aria-hidden='true' />
    </button>
  );
}
