import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import Header from '../../Components/header';
import Footer from '../../Components/footer';
// import { Montserrat } from 'next/font/google';
import { Metadata } from 'next';
import JsonLd from '@/Components/JsonLd';
import { ReactNode } from 'react';
import CookieConsent from '@/Components/CookieConsent/CookieConsent';
import {
  buildLanguageAlternates,
  buildDescription,
  buildTitle,
  getLocalizedPath,
  getLocalizedUrl,
  isIndexableLocale,
  SUPPORTED_LOCALES,
} from '@/lib/seo';
import PwaRegister from '@/Components/PwaRegister';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { buildSiteSchema } from '@/lib/schema';
import AnalyticsProvider from '@/Components/Analytics/AnalyticsProvider';
import ClientChatBotLazy from '@/Components/ClientChatBotLazy';
import ContactModal from '@/Components/ContactModal/ContactModal';
// Дозволити кешування сторінки для bfcache
export const revalidate = 3600; // Переважидувати кожну годину

// 1. Конфігурація мов для статики
const locales = [...SUPPORTED_LOCALES];

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

// 2. Шрифти
// const montserrat = Montserrat({
//   subsets: ['latin', 'cyrillic'],
//   weight: ['400', '700'],
//   variable: '--font-montserrat',
//   display: 'swap', // Додай це!
// });

// 3. Метадані
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'Metadata' });
  const indexable = isIndexableLocale(lang);

  // Мапа для правильних локалей OpenGraph
  const ogLocales: Record<string, string> = {
    uk: 'uk_UA',
    pl: 'pl_PL',
    en: 'en_US',
    ru: 'ru_RU',
    es: 'es_ES',
    be: 'be_BY',
    hy: 'hy_AM',
    ka: 'ka_GE',
    az: 'az_AZ',
    uz: 'uz_UZ',
    kk: 'kk_KZ',
    ro: 'ro_RO',
    tg: 'tg_TJ',
  };

  return {
    metadataBase: new URL('https://vonco.partners'),
    manifest: '/manifest.webmanifest',
    title: buildTitle(t('title'), { includeBrand: false }),
    description: buildDescription(t('description')),
    appleWebApp: {
      capable: true,
      statusBarStyle: 'black-translucent',
      title: 'Vonco Partners',
    },
    icons: {
      icon: [
        { url: '/favicon.ico', type: 'image/x-icon', sizes: 'any' },
        { url: '/pwa-192x192.png', type: 'image/png', sizes: '192x192' },
        { url: '/pwa-512x512.png', type: 'image/png', sizes: '512x512' },
      ],
      apple: [{ url: '/pwa-192x192.png', sizes: '192x192', type: 'image/png' }],
    },
    alternates: {
      canonical: getLocalizedPath(lang),
      languages: buildLanguageAlternates(''),
    },
    openGraph: {
      title: buildTitle(t('title'), { includeBrand: false }),
      description: buildDescription(t('description')),
      url: getLocalizedUrl(lang),
      siteName: 'Vonco Partners',
      locale: ogLocales[lang] || 'en_US',
      type: 'website',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Vonco Partners - Taxi Fleet Poland',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: buildTitle(t('title'), { includeBrand: false }),
      description: buildDescription(t('description')),
      images: ['/og-image.jpg'],
    },
    robots: {
      index: indexable,
      follow: true,
      nocache: false,
      googleBot: {
        index: indexable,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

type Params = Promise<{ lang: string }>;

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Params;
}) {
  const { lang } = await params;
  const messages = await getMessages();
  const t = await getTranslations({ locale: lang, namespace: 'Metadata' });

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <link rel='icon' href='/favicon.ico' type='image/x-icon' sizes='any' />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('vonco-theme')||'system';var d=t==='dark'||(t==='system'&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);document.documentElement.dataset.theme=t}catch(e){}})()`,
          }}
        />
      </head>
      <body className='bg-background text-foreground'>
        <NextIntlClientProvider locale={lang} messages={messages}>
          <div className='flex min-h-screen flex-col'>
            <Header />
            <main className='flex-grow'>{children}</main>
            <ContactModal />
            <ClientChatBotLazy />
            <CookieConsent /> {/* Додаємо сюди */}
            <Footer />
          </div>
        </NextIntlClientProvider>

        {/* Структуровані дані (Schema.org) */}
        <JsonLd
          id={`site-schema-${lang}`}
          type='application/ld+json'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildSiteSchema(lang, t('description'))),
          }}
        />
        <PwaRegister />
        <AnalyticsProvider />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
