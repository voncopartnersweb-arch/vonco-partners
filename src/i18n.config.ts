import { defineConfig } from '@inlang/paraglide-next';

export default defineConfig({
  locales: ['en', 'uk'],
  defaultLocale: 'uk',
  messages: {
    en: () => import('./messages/en.json'),
    uk: () => import('./messages/uk.json'),
  },
});
