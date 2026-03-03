'use client';

import { usePathname, useRouter } from '../i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import styles from './LocaleSwitcher.module.css';
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
    <div className={styles.wrapper}>
      {/* Додаємо прихований лейбл для Accessibility */}
      <label
        htmlFor={`language-switcher-${id}`}
        className={styles.visuallyHidden}
      >
        {t('language')}{' '}
      </label>

      <select
        id={`language-switcher-${id}`} // Зв'язуємо з label
        className={styles.localeSelect}
        value={locale}
        onChange={(e) => switchLocale(e.target.value)}
        aria-label='Change language' // Додаткова страховка для скринрідерів
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
        <option value='uz'>O'zbekcha</option>
        <option value='tg'>Тоҷикӣ</option>
        <option value='kk'>Қазақша</option>
        <option value='az'>Azərbaycanca</option>
      </select>
    </div>
  );
}
