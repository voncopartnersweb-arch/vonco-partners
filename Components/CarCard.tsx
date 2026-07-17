'use client';

import Image from 'next/image';
import { ArrowUpRight, Fuel, Gauge } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { Car } from '@/data/cars';
import { carGridStyles as styles } from '@/lib/uiStyles';

type CarCardProps = {
  car: Car;
  headingLevel?: 'h2' | 'h3';
  priority?: boolean;
  sizes: string;
  className?: string;
};

export default function CarCard({
  car,
  headingLevel = 'h3',
  priority = false,
  sizes,
  className = '',
}: CarCardProps) {
  const locale = useLocale();
  const tFleet = useTranslations('CarFleet');
  const tCar = useTranslations('car');
  const Heading = headingLevel;
  const formatPrice = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'PLN',
    maximumFractionDigits: 0,
  });
  const weeklyPrices = [
    car.weeklyRent.krakowRegion,
    car.weeklyRent.katowiceRegion,
  ].sort((a, b) => a - b);
  const weeklyPrice = `${formatPrice.format(weeklyPrices[0])}–${formatPrice.format(weeklyPrices[1])}`;
  const visibleCategories = car.rideCategories.slice(0, 3);
  const hiddenCategoryCount = Math.max(0, car.rideCategories.length - visibleCategories.length);

  return (
    <Link
      href={`/cars/${car.slug}`}
      className={`${styles.card} ${className}`}
    >
      <div className={styles.imageContainer}>
        <Image
          src={car.image}
          alt=''
          width={520}
          height={360}
          className={styles.carImage}
          priority={priority}
          sizes={sizes}
        />
        <span className={styles.yearBadge}>{car.year}</span>
      </div>

      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <Heading className={styles.carName}>{car.name}</Heading>
          <ArrowUpRight className={styles.cardArrow} aria-hidden='true' size={20} />
        </div>

        <div className={styles.specGrid}>
          <div className={styles.specItem}>
            <Fuel size={17} aria-hidden='true' />
            <span>
              <small>{tCar('fuel')}</small>
              <strong>{car.fuel}</strong>
            </span>
          </div>
          <div className={styles.specItem}>
            <Gauge size={17} aria-hidden='true' />
            <span>
              <small>{tCar('gearbox')}</small>
              <strong>{car.gearbox}</strong>
            </span>
          </div>
        </div>

        <div className={styles.categoryList} aria-label={tCar('categories')}>
          {visibleCategories.map((category) => (
            <span className={styles.categoryTag} key={category}>
              {category}
            </span>
          ))}
          {hiddenCategoryCount > 0 ? (
            <span className={styles.categoryTag}>+{hiddenCategoryCount}</span>
          ) : null}
        </div>

        <div className={styles.pricing}>
          <div className={styles.priceBlock}>
            <span>{tCar('rent')}</span>
            <strong>{weeklyPrice}</strong>
          </div>
          <div className={styles.priceBlock}>
            <span>{tCar('price')}</span>
            <strong>{formatPrice.format(car.buyoutPriceFrom)}</strong>
          </div>
        </div>

        <div className={styles.cardCta}>
          <span>{tFleet('viewDetails')}</span>
          <ArrowUpRight size={17} aria-hidden='true' />
        </div>
      </div>
    </Link>
  );
}
