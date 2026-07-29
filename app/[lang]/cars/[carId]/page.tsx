import {
  cars,
  formatCarWeeklyRent,
  PLATFORM_CATEGORY_SOURCES,
  type Car,
} from '@/data/cars';
import { carDetailStyles as styles } from '@/lib/uiStyles';
import { Metadata } from 'next';

import {
  FaCar,
  FaCogs,
  FaGasPump,
  FaLeaf,
  FaLocationArrow,
  FaLuggageCart,
  FaTachometerAlt,
} from 'react-icons/fa';
import { getTranslations } from 'next-intl/server';
import DriverForm from '@/Components/driverForm';
import { notFound } from 'next/navigation';
import {
  buildDescription,
  buildLanguageAlternates,
  buildTitle,
  getLocalizedPath,
  getLocalizedUrl,
} from '@/lib/seo';
import Script from 'next/script';
import Breadcrumbs from '@/Components/Breadcrumbs/Breadcrumbs';
import CarGallery from '@/Components/CarGallery';
import { buildBreadcrumbSchema } from '@/lib/schema';
import {
  localizeCarBody,
  localizeCarDrive,
  localizeCarFuel,
  localizeCarGearbox,
} from '@/lib/carTranslations';

type PageProps = {
  params: Promise<{
    lang: string;
    carId: string;
  }>;
};

export default async function CarDetail({ params }: PageProps) {
  const { lang, carId } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'car' });
  const tNav = await getTranslations({ locale: lang, namespace: 'Navbar' });
  const tFleet = await getTranslations({ locale: lang, namespace: 'CarFleet' });

  const car: Car | undefined = cars.find((c) => c.slug === carId);

  if (!car) {
    notFound();
  }

  const categories = car.rideCategories.join(', ');
  const rentPrice = formatCarWeeklyRent(car, lang);
  const localizedFuel = localizeCarFuel(car.fuel, lang);
  const localizedGearbox = localizeCarGearbox(car.gearbox, lang);
  const localizedBody = localizeCarBody(car.body, lang);
  const localizedDrive = localizeCarDrive(car.drive, lang);

  return (
    <section className={styles.container}>
      <Breadcrumbs
        items={[
          { label: tNav('home'), href: '/' },
          { label: tNav('cars'), href: '/cars' },
          { label: car.name },
        ]}
      />
      <header className={styles.header}>
        <h1 className={styles.carName}>{car.name}</h1>
        <p className={styles.carYear}>{car.year}</p>
      </header>

      <div className={styles.grid}>
        <CarGallery
          carName={car.name}
          mainImage={car.image}
          galleryImages={car.galleryImages}
          galleryLabel={t('photoNoticeTitle')}
          previousLabel={tFleet('previousCar')}
          nextLabel={tFleet('nextCar')}
        />

        <div className={styles.details}>
          <div className={styles.detailsGroup}>
            <h2 className={styles.detailsTitle}>{t('specs')}</h2>
            <ul className={styles.specList}>
              <li>
                <span>
                  {' '}
                  <FaGasPump className={styles.icon} /> {t('fuel')}{' '}
                </span>
                <span>{localizedFuel}</span>
              </li>
              <li>
                <span>
                  <FaCogs className={styles.icon} /> {t('gearbox')}{' '}
                </span>
                <span>{localizedGearbox}</span>
              </li>
              <li>
                <span>
                  <FaCar className={styles.icon} /> {t('body')}{' '}
                </span>
                <span>{localizedBody}</span>
              </li>
              <li>
                <span>
                  <FaTachometerAlt className={styles.icon} />{' '}
                  {t('mileage')}{' '}
                </span>
                <span>{car.mileage}</span>
              </li>
              <li>
                <span>
                  <FaLocationArrow className={styles.icon} /> {t('drive')}{' '}
                </span>
                <span>{localizedDrive}</span>
              </li>
              <li>
                <span>
                  {' '}
                  <FaLeaf className={styles.icon} /> {t('consumption')}{' '}
                </span>
                <span>{car.fuelConsumption}</span>
              </li>
              <li>
                <span>
                  <FaLuggageCart className={styles.icon} /> {t('trunk')}{' '}
                </span>
                <span>{car.trunkVolume}</span>
              </li>
            </ul>
          </div>

          <div className={styles.detailsGroup}>
            <h2 className={styles.detailsTitle}>{t('earnings')}</h2>
            <ul className={styles.specList}>
              <li>
                {t('rent')} <span>{rentPrice}</span>
              </li>
              <li>
                {t('categories')} <span>{car.rideCategories.join(', ')}</span>
                <p className={styles.categoryNote}>{t('categoryNote')}</p>
                <p className={styles.categoryMeta}>
                  {t('categoryVerified')}. {t('categorySources')}:{' '}
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
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <section className={styles.infoSection} aria-labelledby='car-info-title'>
        <article className={styles.infoBlock}>
          <p className={styles.infoEyebrow}>{t('generalEyebrow')}</p>
          <h2 id='car-info-title' className={styles.infoTitle}>
            {t('generalTitle', { car: car.name })}
          </h2>
          <p className={styles.infoText}>
            {t('generalText', {
              car: car.name,
              year: car.year,
              fuel: localizedFuel,
              gearbox: localizedGearbox,
              consumption: car.fuelConsumption,
            })}
          </p>
        </article>

        <article className={styles.noticeBlock}>
          <h2 className={styles.noticeTitle}>{t('photoNoticeTitle')}</h2>
          <p className={styles.noticeText}>{t('photoNoticeText')}</p>
        </article>

        <article className={styles.seoBlock}>
          <p className={styles.infoEyebrow}>Uber / Bolt / Free Now</p>
          <h2 className={styles.infoTitle}>{t('seoTitle', { car: car.name })}</h2>
          <p className={styles.infoText}>
            {t('seoText', {
              car: car.name,
              rent: rentPrice,
              categories,
            })}
          </p>
        </article>
      </section>

      <DriverForm />
      <Script
        id={`car-breadcrumbs-${car.slug}-${lang}`}
        type='application/ld+json'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            ...buildBreadcrumbSchema([
              { name: tNav('home'), url: getLocalizedUrl(lang) },
              { name: tNav('cars'), url: getLocalizedUrl(lang, '/cars') },
              { name: car.name, url: getLocalizedUrl(lang, `/cars/${car.slug}`) },
            ]),
          }),
        }}
      />
    </section>
  );
}

export async function generateStaticParams() {
  return cars.map((car) => ({ carId: car.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang, carId } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'car' });
  const car = cars.find((entry) => entry.slug === carId);

  if (!car) {
    return {
      title: t('notFoundTitle'),
      description: t('notFoundText'),
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const rentPrice = formatCarWeeklyRent(car, lang);
  const localizedFuel = localizeCarFuel(car.fuel, lang);
  const localizedGearbox = localizeCarGearbox(car.gearbox, lang);
  const rawTitle = `${car.name} ${car.year}`;
  const title = buildTitle(rawTitle);
  const description = buildDescription(
    `${car.name} (${car.year}) - ${t('fuel')}: ${localizedFuel}, ${t('gearbox')}: ${localizedGearbox}, ${t('rent')}: ${rentPrice}.`,
  );

  return {
    title,
    description,
    alternates: {
      canonical: getLocalizedPath(lang, `/cars/${car.slug}`),
      languages: buildLanguageAlternates(`/cars/${car.slug}`),
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: getLocalizedUrl(lang, `/cars/${car.slug}`),
      images: [
        {
          url: car.image,
          alt: car.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [car.image],
    },
  };
}
