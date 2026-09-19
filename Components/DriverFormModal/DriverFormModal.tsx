'use client';

import { ClipboardPenLine, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useId, useRef, useState } from 'react';
import DriverForm from '@/Components/driverForm';
import {
  DRIVER_FORM_OPEN_EVENT,
  FLOATING_PANEL_OPEN_EVENT,
} from '@/lib/floating-panels';
import { driverFormModalStyles as styles } from '@/lib/uiStyles';

type DriverFormModalProps = {
  initiallyOpen?: boolean;
  initialReturnFocus?: HTMLElement | null;
};

export default function DriverFormModal({
  initiallyOpen = false,
  initialReturnFocus = null,
}: DriverFormModalProps) {
  const t = useTranslations('DriverForm');
  const tChat = useTranslations('Chat');
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  const dialogId = useId();
  const titleId = useId();
  const launcherRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(initialReturnFocus);

  useEffect(() => {
    const handleDriverFormOpen = () => {
      returnFocusRef.current = document.activeElement as HTMLElement | null;
      window.dispatchEvent(
        new CustomEvent(FLOATING_PANEL_OPEN_EVENT, { detail: 'form' }),
      );
      setIsOpen(true);
    };

    window.addEventListener(DRIVER_FORM_OPEN_EVENT, handleDriverFormOpen);
    return () =>
      window.removeEventListener(DRIVER_FORM_OPEN_EVENT, handleDriverFormOpen);
  }, []);

  useEffect(() => {
    const handleFloatingPanelOpen = (event: Event) => {
      const panel = (event as CustomEvent<string>).detail;
      if (panel !== 'form') setIsOpen(false);
    };

    window.addEventListener(FLOATING_PANEL_OPEN_EVENT, handleFloatingPanelOpen);
    return () =>
      window.removeEventListener(
        FLOATING_PANEL_OPEN_EVENT,
        handleFloatingPanelOpen,
      );
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    if (!returnFocusRef.current) {
      returnFocusRef.current = document.activeElement as HTMLElement | null;
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeForm();
        return;
      }

      if (event.key !== 'Tab') return;
      const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  function openForm() {
    returnFocusRef.current = document.activeElement as HTMLElement | null;
    window.dispatchEvent(
      new CustomEvent(FLOATING_PANEL_OPEN_EVENT, { detail: 'form' }),
    );
    setIsOpen(true);
  }

  function closeForm() {
    setIsOpen(false);
    window.requestAnimationFrame(() => {
      const returnTarget = returnFocusRef.current;
      if (returnTarget?.isConnected) returnTarget.focus();
      else launcherRef.current?.focus();
      returnFocusRef.current = null;
    });
  }

  return (
    <>
      <button
        ref={launcherRef}
        type='button'
        className={styles.launcher}
        onClick={openForm}
        aria-label={t('title')}
        aria-haspopup='dialog'
        aria-expanded={isOpen}
        aria-controls={isOpen ? dialogId : undefined}
      >
        <ClipboardPenLine size={27} aria-hidden='true' />
      </button>

      {isOpen ? (
        <div
          className={styles.backdrop}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeForm();
          }}
        >
          <section
            id={dialogId}
            ref={modalRef}
            className={styles.modal}
            role='dialog'
            aria-modal='true'
            aria-labelledby={titleId}
          >
            <header className={styles.header}>
              <div>
                <p className={styles.eyebrow}>Vonco Partners</p>
                <h2 id={titleId} className={styles.title}>
                  {t('title')}
                </h2>
                <p className={styles.subtitle}>{t('subtitle')}</p>
              </div>
              <button
                ref={closeRef}
                type='button'
                className={styles.close}
                onClick={closeForm}
                aria-label={tChat('close')}
              >
                <X size={22} aria-hidden='true' />
              </button>
            </header>

            <div className={styles.content}>
              <DriverForm
                variant='modal'
                showIntro={false}
                labelledBy={titleId}
              />
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
