'use client';

import { usePathname, useRouter } from '../i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useId } from 'react';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('HomePage');

  const switchLocale = (newLocale: string) => {
    if (newLocale !== locale) {
      router.replace(pathname, { locale: newLocale });
      router.refresh();
    }
  };
  const id = useId();
  return (
    <div className='inline-flex min-w-0 items-center'>
      <label
        htmlFor={`language-switcher-${id}`}
        className='sr-only'
      >
        {t('language')}{' '}
      </label>

      <select
        id={`language-switcher-${id}`}
        className='h-11 w-full max-w-32 min-w-0 cursor-pointer appearance-none rounded-xl border border-line bg-surface-raised px-3 pr-7 text-sm font-bold text-foreground shadow-sm outline-none transition hover:border-red-300/60 hover:bg-brand-soft focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-red-500/20 max-md:text-[13px]'
        value={locale}
        onChange={(e) => switchLocale(e.target.value)}
        aria-label={t('changeLanguageAria')}
      >
        <option value='uk'>Українська</option>
        <option value='pl'>Polski</option>
        <option value='en'>English</option>
        <option value='ru'>Русский</option>
        <option value='es'>Español</option>
        <option value='hy'>Հայերեն</option>
        <option value='be'>Беларуская</option>
        <option value='ro'>Română</option>
        <option value='ka'>ქართული</option>
        <option value='uz'>O&apos;zbekcha</option>
        <option value='tg'>Тоҷикӣ</option>
        <option value='kk'>Қазақша</option>
        <option value='az'>Azərbaycanca</option>
      </select>
    </div>
  );
}
