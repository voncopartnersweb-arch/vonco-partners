import { Inter } from 'next/font/google';

import './globals.css';
import Header from '@/src/Components/header';
import Footer from '@/src/Components/footer';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export async function generateStaticParams() {
  return [{ lang: 'en-US' }, { lang: 'de' }];
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<'/[lang]'>) {
  return (
    <html lang={(await params).lang}>
      <body className={inter.className}>
        <div className='flex min-h-screen flex-col'>
          <Header />
          <main className='flex-grow'>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
