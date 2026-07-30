import { defineRouting } from 'next-intl/routing';
import { SUPPORTED_LOCALES } from '@/lib/seo';

export const routing = defineRouting({
  locales: [...SUPPORTED_LOCALES],
  defaultLocale: 'pl',
  localePrefix: 'as-needed',
  localeDetection: false,
  // Page metadata already provides route-aware regional hreflang values.
  // Disable next-intl's generic HTTP Link header to avoid duplicate languages
  // and alternates for routes that only exist in a subset of locales.
  alternateLinks: false,
});
