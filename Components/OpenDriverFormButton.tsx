'use client';

import { ClipboardPenLine } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { openDriverForm } from '@/lib/floating-panels';

type OpenDriverFormButtonProps = {
  className?: string;
  label?: string;
};

export default function OpenDriverFormButton({
  className,
  label,
}: OpenDriverFormButtonProps) {
  const t = useTranslations('DriverForm');
  const buttonLabel = label ?? t('submit');

  return (
    <button
      type='button'
      className={`${className ?? ''} gap-2`}
      onClick={() => openDriverForm()}
      aria-haspopup='dialog'
    >
      <ClipboardPenLine size={19} aria-hidden='true' />
      {buttonLabel}
    </button>
  );
}
