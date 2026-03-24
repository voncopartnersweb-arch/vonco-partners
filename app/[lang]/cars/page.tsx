import CarFleet from '@/Components/carFleet';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { buildLanguageAlternates, getLocalizedPath, getLocalizedUrl } from '@/lib/seo';
import Script from 'next/script';
import { cars } from '@/data/cars';

type CarsPageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: CarsPageProps): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'CarFleet.seo' });
  const seoTitle = t('title');
  const seoDescription = t('description');

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: ['оренда авто', 'авто для таксі', 'taxi car rental'],
    alternates: {
      canonical: getLocalizedPath(lang, '/cars'),
      languages: buildLanguageAlternates('/cars'),
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: getLocalizedUrl(lang, '/cars'),
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
  const tSeo = await getTranslations({ locale: lang, namespace: 'CarFleet.seo' });
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
      q: tSeo('faq.availableModelsQuestion'),
      a: fleetNames,
    },
    {
      q: tSeo('faq.buyoutQuestion'),
      a: tSeo('faq.buyoutAnswer'),
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
