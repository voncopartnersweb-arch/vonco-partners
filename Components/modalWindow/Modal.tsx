'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  const t = useTranslations('Common');
  // Блокуємо скрол основної сторінки, коли модалка відкрита
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Закриття на клавішу Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-[2000] flex h-dvh items-center justify-center bg-black/80 p-4 backdrop-blur-xl' onClick={onClose}>
      <div className='relative max-h-[calc(100dvh-32px)] w-full max-w-[600px] overflow-y-auto rounded-3xl border border-line bg-surface-raised px-6 pb-6 pt-12 text-foreground shadow-2xl shadow-indigo/25' onClick={(e) => e.stopPropagation()}>
        <button
          className='absolute right-3 top-2 z-10 inline-flex size-11 items-center justify-center rounded-xl border-0 bg-transparent text-3xl leading-none text-muted transition hover:rotate-90 hover:bg-brand-soft hover:text-foreground'
          onClick={onClose}
          aria-label={t('closeModal')}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
