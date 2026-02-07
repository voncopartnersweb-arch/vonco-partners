'use client';

import { usePathname, useRouter } from '../i18n/navigation';
import { useLocale } from 'next-intl';
import styles from './LocaleSwitcher.module.css';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    if (newLocale !== locale) {
      router.replace(pathname, { locale: newLocale });
      router.refresh();
    }
  };

  return (
    <select
      className={styles.localeSelect}
      value={locale}
      onChange={(e) => switchLocale(e.target.value)}
    >
      <option value='uk'>Українська</option>
      <option value='pl'>Polski</option>
      <option value='en'>English</option>
      <option value='hy'>Հայերեն</option>
      <option value='be'>Беларуская</option>
      <option value='ro'>Română</option>
      <option value='ka'>ქართული</option>
      <option value='uz'>O'zbekcha</option>
      <option value='kk'>Қазақша</option>
      <option value='az'>Azərbaycanca</option>
    </select>
  );
}
