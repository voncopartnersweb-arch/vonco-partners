import { cars } from '@/data/cars';
import styles from './CarDetail.module.css';
import Image from 'next/image';
import {
  FaCar,
  FaCogs,
  FaGasPump,
  FaLeaf,
  FaLocationArrow,
  FaLuggageCart,
  FaTachometerAlt,
} from 'react-icons/fa';

export default function CarDetail({ params }) {
  const { carId } = params;
  const car = cars.find((c) => c.slug === carId);

  if (!car) {
    return (
      <div className={styles.container}>
        <h1 className={styles.notFoundTitle}>Car Not Found</h1>
        <p className={styles.notFoundText}>
          The car you are looking for does not exist.
        </p>
      </div>
    );
  }

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.carName}>{car.name}</h1>
        <p className={styles.carYear}>{car.year}</p>
      </div>

      <div className={styles.grid}>
        <div className={styles.imageGallery}>
          <div className={styles.imageWrapper}>
            <Image
              src={car.image}
              alt={car.name}
              width={800}
              height={500}
              className={styles.mainImage}
              priority
            />
          </div>
        </div>
        <div className={styles.details}>
          <div className={styles.detailsGroup}>
            <h2 className={styles.detailsTitle}>Vehicle Specifications</h2>
            <ul className={styles.specList}>
              <li>
                <FaGasPump className={styles.icon} /> Fuel:{' '}
                <span>{car.fuel}</span>
              </li>
              <li>
                <FaCogs className={styles.icon} /> Gearbox:{' '}
                <span>{car.gearbox}</span>
              </li>
              <li>
                <FaCar className={styles.icon} /> Body: <span>{car.body}</span>
              </li>
              <li>
                <FaTachometerAlt className={styles.icon} /> Mileage:{' '}
                <span>{car.mileage}</span>
              </li>
              <li>
                <FaLocationArrow className={styles.icon} /> Drive:{' '}
                <span>{car.drive}</span>
              </li>
              <li>
                <FaLeaf className={styles.icon} /> Fuel Consumption:{' '}
                <span>{car.fuelConsumption}</span>
              </li>
              <li>
                <FaLuggageCart className={styles.icon} /> Trunk Volume:{' '}
                <span>{car.trunkVolume}</span>
              </li>
            </ul>
          </div>
          <div className={styles.detailsGroup}>
            <h2 className={styles.detailsTitle}>Earnings Potential</h2>
            <ul className={styles.specList}>
              <li>
                <span className={styles.rentPrice}>
                  Rent Price: {car.rentPrice}
                </span>
              </li>
              <li>
                <span className={styles.purchasePrice}>
                  Purchase Price: {car.price}
                </span>
              </li>
              <li>
                <span className={styles.categories}>
                  Categories: {car.rideCategories.join(', ')}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ✅ Next.js will generate static pages for each car
export function generateStaticParams() {
  return cars.map((car) => ({
    carId: car.slug,
  }));
}
