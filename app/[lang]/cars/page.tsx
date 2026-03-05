import CarFleet from '@/Components/carFleet';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { buildLanguageAlternates } from '@/lib/seo';

type CarsPageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: CarsPageProps): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'CarFleet' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${lang}/cars`,
      languages: buildLanguageAlternates('/cars'),
    },
  };
}

export default function Cars() {
  return (
    <>
      <CarFleet />
    </>
  );
}
