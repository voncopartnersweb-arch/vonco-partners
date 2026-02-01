// src/i18n/navigation.ts
import { createNavigation } from 'next-intl/navigation';

export const locales = ['en', 'uk'] as const;
export const defaultLocale = 'uk';

export const { Link, usePathname, useRouter, redirect } = createNavigation({
  locales,
  defaultLocale,
});
