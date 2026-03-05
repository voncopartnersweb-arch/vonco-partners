import { defineRouting } from 'next-intl/routing';
import { SUPPORTED_LOCALES } from '@/lib/seo';

export const routing = defineRouting({
  locales: [...SUPPORTED_LOCALES],
  defaultLocale: 'en',
});
