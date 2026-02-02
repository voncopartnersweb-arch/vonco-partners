import { Inter } from 'next/font/google';
import './globals.css';

import { NextIntlClientProvider } from 'next-intl';
import { routing } from 'i18n/routing';
import Header from 'Components/header';
import Footer from 'Components/footer';
import { ReactNode } from 'react';

// const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface LayoutProps {
  children: ReactNode;
  params: { lang: string }; // точно збігається з папкою
}

export default async function Layout({
  children,
  params,
}: LayoutProps): Promise<ReactNode> {
  const { lang } = params;

  // if (!routing.langs.includes(lang)) {
  //   notFound();
  // }

  // Завантажуємо повідомлення для lang

  return (
    <html lang={lang}>
      <body>
        <NextIntlClientProvider>
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
