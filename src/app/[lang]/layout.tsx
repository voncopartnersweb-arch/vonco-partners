import { Inter } from 'next/font/google';

import './globals.css';

import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from '@/Components/header';
import Footer from '@/Components/footer';
import { getMessages } from 'next-intl/server';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // const { locale } = await params;
  // if (!hasLocale(routing.locales, locale)) {
  //   notFound();
  // }
  // const messages = await getMessages();
  return (
    <html>
      <body className={inter.className}>
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
