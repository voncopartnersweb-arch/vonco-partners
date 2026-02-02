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
  const messages = (await import(`../../messages/${lang}.json`)).default;
  // if (!routing.langs.includes(lang)) {
  //   notFound();
  // }

  // Завантажуємо повідомлення для lang

  return (
    <html lang={lang}>
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
