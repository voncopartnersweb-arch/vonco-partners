import CarFleet from '@/Components/carFleet';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { buildLanguageAlternates } from '@/lib/seo';
import Script from 'next/script';
import { cars } from '@/data/cars';

type CarsPageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: CarsPageProps): Promise<Metadata> {
  const { lang } = await params;
  const localizedCarsTitle: Record<string, string> = {
    uk: 'Оренда авто для таксі, лізинг і авто під виплату',
    pl: 'Wynajem aut do taxi, leasing i auto na wykup',
    en: 'Taxi Car Rental, Leasing and Lease-to-Own in Poland',
    ru: 'Аренда авто для такси, лизинг и авто под выкуп',
    es: 'Alquiler de coches para taxi, leasing y opción de compra',
    ro: 'Închiriere auto taxi, leasing și buyout în Polonia',
    be: 'Аренда аўто для таксі, лізінг і выкуп',
    hy: 'Տաքսի մեքենաների վարձույթ, լիզինգ և հետգնում',
    ka: 'ტაქსის ავტომობილების გაქირავება, ლიზინგი და გამოსყიდვა',
    kk: 'Таксиге көлік жалдау, лизинг және бөліп төлеу',
    az: 'Taksi üçün avtomobil icarəsi, lizinq və satınalma',
    uz: 'Taksi uchun avtomobil ijarasi, lizing va bo‘lib to‘lash',
    tg: 'Иҷораи мошин барои таксӣ, лизинг ва хариди қисмӣ',
  };
  const localizedCarsDescription: Record<string, string> = {
    uk: 'Оренда авто для таксі в Польщі для Uber, Bolt і Free Now. Доступні лізинг та авто під виплату, робота на орендованому або власному авто, офіційне оформлення і підтримка.',
    pl: 'Wynajem aut do taxi w Polsce pod Uber, Bolt i Free Now. Dostępny leasing i auto na wykup, praca na aucie firmowym lub własnym oraz pełne wsparcie.',
    en: 'Taxi car rental in Poland for Uber, Bolt, and Free Now. Leasing and lease-to-own options, official onboarding, and support for drivers.',
    ru: 'Аренда авто для такси в Польше для Uber, Bolt и Free Now. Доступны лизинг и авто под выкуп, официальное оформление и поддержка водителей.',
    es: 'Alquiler de coches para taxi en Polonia para Uber, Bolt y Free Now. Opciones de leasing y compra a plazos, alta oficial y soporte para conductores.',
  };
  const seoTitle = localizedCarsTitle[lang] ?? localizedCarsTitle.en;
  const seoDescription = localizedCarsDescription[lang] ?? localizedCarsDescription.en;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: ['оренда авто', 'авто для таксі', 'taxi car rental'],
    alternates: {
      canonical: `/${lang}/cars`,
      languages: buildLanguageAlternates('/cars'),
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `https://vonco.partners/${lang}/cars`,
      type: 'website',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: seoTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: ['/og-image.jpg'],
    },
  };
}

export default async function Cars({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'CarFleet' });
  const fleetDescription = String(t.raw('description'))
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const fleetNames = cars.map((car) => car.name).join(', ');
  const faq = [
    {
      q: t('title'),
      a: fleetDescription,
    },
    {
      q: 'Які моделі доступні?',
      a: fleetNames,
    },
    {
      q: 'Чи є варіант викупу авто?',
      a: 'Так, для довгострокової співпраці можливе індивідуальне обговорення умов викупу автомобіля.',
    },
  ];

  return (
    <>
      <CarFleet />
      <Script
        id='faq-cars'
        type='application/ld+json'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faq.map((item) => ({
              '@type': 'Question',
              name: item.q,
              acceptedAnswer: { '@type': 'Answer', text: item.a },
            })),
          }),
        }}
      />
    </>
  );
}
