import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import Header from '../../Components/header';
import Footer from '../../Components/footer';
import { Montserrat } from 'next/font/google';
import { Metadata } from 'next';
import Script from 'next/script';
import { ReactNode } from 'react';
import CookieConsent from '@/Components/CookieConsent/CookieConsent';

// 1. Конфігурація мов для статики
const locales = ['uk', 'pl', 'en', 'hy', 'be', 'ro', 'ka', 'uz', 'kk', 'az'];

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

// 2. Шрифти
const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '700'],
  variable: '--font-montserrat',
});

// 3. Метадані
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'Metadata' });

  // Мапа для правильних локалей OpenGraph
  const ogLocales: Record<string, string> = {
    uk: 'uk_UA',
    pl: 'pl_PL',
    en: 'en_US',
    be: 'be_BY',
    hy: 'hy_AM',
    ka: 'ka_GE',
    az: 'az_AZ',
    uz: 'uz_UZ',
    kk: 'kk_KZ',
    ro: 'ro_RO',
  };

  return {
    metadataBase: new URL('https://vonco.partners'),
    title: {
      default: t('title'),
      template: `%s | Vonco Partners`,
    },
    description: t('description'),
    alternates: {
      canonical: `https://vonco.partners/${lang}`,
      languages: {
        uk: '/uk',
        pl: '/pl',
        en: '/en',
        hy: '/hy',
        be: '/be',
        ro: '/ro',
        ka: '/ka',
        uz: '/uz',
        kk: '/kk',
        az: '/az',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://vonco.partners/${lang}`,
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
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
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
    <html lang={lang} className={montserrat.variable}>
      <head>
        <link
          rel='icon'
          href='../favicon.ico'
          type='image/x-icon'
          sizes='32x32'
        ></link>
      </head>
      <body className={montserrat.className}>
        <NextIntlClientProvider locale={lang} messages={messages}>
          <div className='flex min-h-screen flex-col'>
            <Header />
            <main className='flex-grow'>{children}</main>
            <CookieConsent /> {/* Додаємо сюди */}
            <Footer />
          </div>
        </NextIntlClientProvider>

        {/* Структуровані дані (Schema.org) */}
        <Script
          id='organization-schema'
          type='application/ld+json'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'TaxiService',
              name: 'Vonco Partners',
              url: `https://vonco.partners/${lang}`,
              description: t('description'), // Тепер опис для Google буде мовою користувача
              provider: {
                '@type': 'LocalBusiness',
                name: 'Vonco Partners',
                image: 'https://vonco.partners/og-image.jpg',
                telephony: '+48572867193',
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: 'Krakow',
                  addressCountry: 'PL',
                },
              },
              areaServed: [
                { '@type': 'City', name: 'Krakow' },
                { '@type': 'City', name: 'Zakopane' },
                { '@type': 'City', name: 'Katowice' },
                { '@type': 'City', name: 'Zator' },
                { '@type': 'City', name: 'Oswiecim' },
                { '@type': 'City', name: 'Gdansk' },
              ],
              sameAs: [
                'https://www.facebook.com/p/Voncopartners-100089457913783/',
                'https://www.instagram.com/vonco.partners',
                'https://www.tiktok.com/@vonco.partners',
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
