import { Inter } from 'next/font/google';
import './globals.css';

import { NextIntlClientProvider } from 'next-intl';
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
  params: { locale: string }; // ❌ не Promise!
}) {
  const { locale } = params;

  // if (!routing.locales.includes(locale)) {
  //   notFound();
  // }

  // Завантажуємо повідомлення для locale
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
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
