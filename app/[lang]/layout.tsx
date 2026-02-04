import './globals.css';

import { NextIntlClientProvider } from 'next-intl';
import { routing } from '../../i18n/routing';

import { ReactNode } from 'react';
import { getMessages } from 'next-intl/server';
import Header from '../../Components/header';
import Footer from '../../Components/footer';
import { Montserrat } from 'next/font/google';
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
