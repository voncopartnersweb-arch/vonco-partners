import { cars, type Car } from '@/data/cars';
import styles from './CarDetail.module.css';
import Image from 'next/image';
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

type PageProps = {
  params: Promise<{
    lang: string;
    carId: string;
  }>;
};

export default async function CarDetail({ params }: PageProps) {
  const { carId } = await params;
  const t = await getTranslations('car');

  const car: Car | undefined = cars.find((c) => c.slug === carId);

  if (!car) {
    notFound();
  }

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.carName}>{car.name}</h1>
        <p className={styles.carYear}>{car.year}</p>
      </header>

      <div className={styles.grid}>
        <div className={styles.imageGallery}>
          <Image
            src={car.image}
            alt={car.name}
            width={900}
            height={520}
            className={styles.mainImage}
            priority
          />
        </div>

        <div className={styles.details}>
          <div className={styles.detailsGroup}>
            <h2 className={styles.detailsTitle}>{t('specs')}</h2>
            <ul className={styles.specList}>
              <li>
                <span>
                  {' '}
                  <FaGasPump className={styles.icon} /> {t('fuel')}{' '}
                </span>
                <span>{car.fuel}</span>
              </li>
              <li>
                <span>
                  <FaCogs className={styles.icon} /> {t('gearbox')}{' '}
                </span>
                <span>{car.gearbox}</span>
              </li>
              <li>
                <span>
                  <FaCar className={styles.icon} /> {t('body')}{' '}
                </span>
                <span>{car.body}</span>
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
                <span>{car.drive}</span>
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
                {t('rent')} <span>{car.rentPrice}</span>
              </li>
              <li>
                {t('price')} <span>{car.price}</span>
              </li>
              <li>
                {t('categories')} <span>{car.rideCategories.join(', ')}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <DriverForm />
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

  const description = `${car.name} (${car.year}) - ${t('fuel')}: ${car.fuel}, ${t('gearbox')}: ${car.gearbox}, ${t('rent')}: ${car.rentPrice}.`;

  return {
    title: `${car.name} ${car.year}`,
    description,
    alternates: {
      canonical: `/${lang}/cars/${car.slug}`,
    },
    openGraph: {
      title: `${car.name} ${car.year}`,
      description,
      type: 'website',
      url: `https://vonco.partners/${lang}/cars/${car.slug}`,
      images: [
        {
          url: car.image,
          alt: car.name,
        },
      ],
    },
  };
}
