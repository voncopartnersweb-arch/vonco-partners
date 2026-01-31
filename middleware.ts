import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // Список підтримуваних мов
  locales: ['en', 'uk'],

  // Мова за замовчуванням, якщо мову браузера не вдалося визначити
  defaultLocale: 'uk',
});

export const config = {
  // Матчер для ігнорування системних файлів та api
  matcher: ['/', '/(uk|en)/:path*'],
};
