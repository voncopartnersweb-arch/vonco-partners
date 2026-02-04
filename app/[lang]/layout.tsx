import './globals.css';

import { NextIntlClientProvider } from 'next-intl';
import { routing } from '../../i18n/routing';

import { ReactNode } from 'react';
import { getMessages } from 'next-intl/server';
import Header from '../../Components/header';
import Footer from '../../Components/footer';
import { Montserrat } from 'next/font/google';

import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  metadataBase: new URL('https://vonco.partners'),

  title: {
    default: 'Vonco Partners — Робота водієм у Польщі',
    template: '%s | Vonco Partners',
  },

  description:
    'Vonco Partners — надійний автопарк у Польщі. Робота водієм таксі з авто компанії або власним. Гнучкий графік, чесні умови, підтримка 24/7.',

  keywords: [
    'робота водієм Польща',
    'таксі Краків',
    'робота водієм таксі',
    'автопарк Польща',
    'Vonco Partners',
    'Таксі',
    'партнерка',
    'водій таксі',
    'робота водієм',
    'таксі з власним авто',
    'робота в Польщі',
    'водій у Польщі',
    'робота для українців у Польщі',
  ],

  authors: [{ name: 'Vonco Partners' }],
  creator: 'Vonco Partners',
  publisher: 'Vonco Partners',

  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    url: 'https://vonco.partners',
    siteName: 'Vonco Partners',
    title: 'Vonco Partners — Робота водієм у Польщі',
    description:
      'Приєднуйтесь до Vonco Partners — сучасний автопарк, гнучкий графік та чесні умови для водіїв.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Vonco Partners — робота водієм',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Vonco Partners — Робота водієм',
    description:
      'Робота водієм у Польщі з автопарком Vonco Partners. Просто, чесно, по-людськи.',
    images: ['/og-image.jpg'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'], // обов'язково додаємо cyrillic для української
  weight: ['400', '700'], // 400 - утончений, 700 - товстий
  variable: '--font-montserrat', // створюємо CSS-змінну
});

export function generateStaticParams() {
  return routing.locales.map((lang) => ({ lang }));
}
type Params = Promise<{ lang: string }>;
interface LayoutProps {
  children: ReactNode;
  params: { lang: string }; // точно збігається з папкою
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Params;
}) {
  const { lang } = await params;
  const messages = await getMessages();
  // if (!routing.langs.includes(lang)) {
  //   notFound();
  // }

  // Завантажуємо повідомлення для lang

  return (
    <html lang={lang} className={montserrat.variable}>
      <body>
        <NextIntlClientProvider locale={lang} messages={messages}>
          <div className='flex min-h-screen flex-col'>
            <Header />
            <main className='flex-grow'>{children}</main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

<Script
  id='organization-schema'
  type='application/ld+json'
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Vonco Partners',
      url: 'https://vonco.partners',
      description:
        'Автопарк у Польщі. Робота водієм з авто компанії або власним. Гнучкий графік, чесні умови, підтримка 24/7. Приєднуйтесь до Vonco Partners сьогодні! Робота в таксі у польщі.',
      sameAs: [],
    }),
  }}
/>;
