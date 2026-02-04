import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import Header from '../../Components/header';
import Footer from '../../Components/footer';
import { Montserrat } from 'next/font/google';
import { Metadata } from 'next';
import Script from 'next/script';
import { ReactNode } from 'react';

// 1. Шрифти поза компонентом
const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '700'],
  variable: '--font-montserrat',
});

// 2. Динамічна генерація метаданих
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'Metadata' });

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
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://vonco.partners/${lang}`,
      siteName: 'Vonco Partners',
      locale: lang === 'uk' ? 'uk_UA' : lang === 'pl' ? 'pl_PL' : 'en_US',
      type: 'website',
      images: ['/og-image.jpg'],
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

  return (
    <html lang={lang} className={montserrat.variable}>
      <body className={montserrat.className}>
        <NextIntlClientProvider locale={lang} messages={messages}>
          <div className='flex min-h-screen flex-col'>
            <Header />
            <main className='flex-grow'>{children}</main>
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
              '@type': 'TaxiService', // Змінено на TaxiService для кращого SEO
              name: 'Vonco Partners',
              url: 'https://vonco.partners',
              description:
                'Автопарк у Польщі. Робота водієм таксі Краків, Закопане, Катовіце, Затор, Освенцим .',
              provider: {
                '@type': 'LocalBusiness',
                name: 'Vonco Partners',
                image: 'https://vonco.partners/og-image.jpg',
                telephony: '+48572867193',
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: 'Krakow', // Головний офіс або основне місто
                  addressCountry: 'PL',
                },
              },
              areaServed: [
                { '@type': 'City', name: 'Krakow' },
                { '@type': 'City', name: 'Zakopane' },
                { '@type': 'City', name: 'Katowice' },
                { '@type': 'City', name: 'Zator' },
                { '@type': 'City', name: 'Oswiecim' },
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
