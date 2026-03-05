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
  const t = await getTranslations({ locale: lang, namespace: 'CarFleet' });
  const localizedCarsTitle: Record<string, string> = {
    uk: 'Авто для таксі в оренду та під виплату',
    pl: 'Auta do taxi na wynajem i wykup',
    en: 'Taxi Cars for Rent and Lease-to-Own',
    ru: 'Авто для такси в аренду и под выкуп',
    es: 'Coches para taxi en alquiler y a plazos',
  };
  const seoTitle = localizedCarsTitle[lang] ?? localizedCarsTitle.en;

  return {
    title: seoTitle,
    description: t('description'),
    keywords: ['оренда авто', 'авто для таксі', 'taxi car rental'],
    alternates: {
      canonical: `/${lang}/cars`,
      languages: buildLanguageAlternates('/cars'),
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
  const fleetNames = cars.map((car) => car.name).join(', ');
  const faq = [
    {
      q: t('title'),
      a: t('description'),
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
