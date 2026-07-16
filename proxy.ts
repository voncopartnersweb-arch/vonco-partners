import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const handleI18nRouting = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (request.headers.get('x-vonco-default-locale') === '1') {
    return NextResponse.next();
  }

  if (pathname === '/pl' || pathname.startsWith('/pl/')) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = pathname.replace(/^\/pl(?=\/|$)/, '') || '/';
    return NextResponse.redirect(redirectUrl, 308);
  }

  const hasLocalePrefix = routing.locales.some(
    (locale) => locale !== routing.defaultLocale &&
      (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)),
  );

  if (!hasLocalePrefix) {
    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = `/pl${pathname === '/' ? '' : pathname}`;
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-vonco-default-locale', '1');
    return NextResponse.rewrite(rewriteUrl, {
      request: { headers: requestHeaders },
    });
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
