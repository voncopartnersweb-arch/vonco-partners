import CarFleet from '@/Components/carFleet';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import {
  buildDescription,
  buildLanguageAlternates,
  buildTitle,
  getLocalizedPath,
  getLocalizedUrl,
} from '@/lib/seo';
import Script from 'next/script';
import {
  cars,
  formatCarWeeklyRent,
  PLATFORM_CATEGORY_SOURCES,
} from '@/data/cars';
import { Link } from '@/i18n/navigation';
import { carContentStyles as contentStyles } from '@/lib/uiStyles';
import { localizeCarFuel } from '@/lib/carTranslations';
import SeoRelatedLinks from '@/Components/SeoRelatedLinks';

type CarsPageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: CarsPageProps): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'CarFleet.seo' });
  const seoTitle = buildTitle(t('title'));
  const seoDescription = buildDescription(t('description'));

  return {
    title: seoTitle,
    description: seoDescription,
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
  const tWork = await getTranslations({ locale: lang, namespace: 'WorkPage' });
  const tServices = await getTranslations({ locale: lang, namespace: 'ServicesPage' });
  const tAbout = await getTranslations({ locale: lang, namespace: 'AboutPage' });
  const tCar = await getTranslations({ locale: lang, namespace: 'car' });
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
      <section className={contentStyles.guide} aria-labelledby='fleet-guide-title'>
        <div className={contentStyles.container}>
          <header className={contentStyles.header}>
            <p className={contentStyles.eyebrow}>Uber / Bolt / Free Now</p>
            <h2 id='fleet-guide-title'>{tServices('seoIntroTitle')}</h2>
            <p>{tServices('seoIntroText')}</p>
            <p>{tWork('fleetText')}</p>
          </header>

          <div className={contentStyles.grid}>
            <article>
              <h3>{tAbout('whatWeDo.rentalTitle')}</h3>
              <p>{tAbout('whatWeDo.rentalText')}</p>
              <p>{tServices('faqDailyText')}</p>
            </article>
            <article>
              <h3>{tWork('buyoutTitle')}</h3>
              <p>{tWork('buyoutText')}</p>
              <p>{tServices('faqBuyoutText')}</p>
              <Link href='/vykup-avto'>{tWork('buyoutTitle')} →</Link>
            </article>
            <article>
              <h3>{tAbout('whatWeDo.serviceTitle')}</h3>
              <p>{tAbout('whatWeDo.serviceText')}</p>
              <p>{tAbout('whatWeDo.supportText')}</p>
            </article>
            <article>
              <h3>{tServices('platformsTitle')}</h3>
              <p>{tServices('platformsText')}</p>
              <p>{tAbout('whatWeDo.onboardingText')}</p>
            </article>
          </div>

          <section className={contentStyles.process}>
            <h2>{tServices('processTitle')}</h2>
            <ol>
              {[1, 2, 3, 4].map((index) => (
                <li key={index}>
                  <strong>{tServices(`processStep${index}Title`)}</strong>
                  <span>{tServices(`processStep${index}Text`)}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className={contentStyles.comparison}>
            <h2>{tSeo('faq.availableModelsQuestion')}</h2>
            <div className={contentStyles.tableWrap}>
              <table>
                <thead>
                  <tr>
                    <th>{tCar('generalEyebrow')}</th>
                    <th>{tCar('fuel')}</th>
                    <th>{tCar('categories')}</th>
                    <th>{tCar('rent')}</th>
                  </tr>
                </thead>
                <tbody>
                  {cars.map((car) => (
                    <tr key={car.slug}>
                      <th scope='row'>
                        <Link href={`/cars/${car.slug}`}>{car.name}</Link>
                      </th>
                      <td>{localizeCarFuel(car.fuel, lang)}</td>
                      <td>{car.rideCategories.join(', ')}</td>
                      <td>{formatCarWeeklyRent(car, lang)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={contentStyles.categoryNote}>
              {tCar('categoryNote')}{' '}
              <span>
                {tCar('categoryVerified')}. {tCar('categorySources')}:{' '}
                <a
                  href={PLATFORM_CATEGORY_SOURCES.uberEligibleVehicles}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Uber
                </a>{' '}
                ·{' '}
                <a
                  href={PLATFORM_CATEGORY_SOURCES.boltCategories}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Bolt
                </a>
              </span>
            </p>
          </section>

          <section className={contentStyles.coverage}>
            <h2>{tServices('coverageTitle')}</h2>
            <p>{tServices('coverageText')}</p>
            <Link href='/cities'>{tServices('coverageTitle')} →</Link>
          </section>

          <SeoRelatedLinks lang={lang} current='cars' />
        </div>
      </section>
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
