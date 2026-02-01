// components/CarFleet.jsx
import Image from 'next/image';
import styles from './CarFleet.module.css';
import { cars } from '@/data/cars';
import Link from 'next/link';

export default function CarFleet() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Our Fleet:</h2>
        <p className={styles.description}>
          Do not have your own car but want to work? <b>Vonco Partners</b> has
          its own fleet of new, economical, and eco-friendly cars!
          <br />
          All cars in our fleet are from **2019-2023** models. Each vehicle is
          insured and regularly undergoes technical inspections to ensure a safe
          and comfortable ride for every driver.
        </p>

        <div className={styles.grid}>
          {cars.map((car, index) => (
            <div key={index} className={styles.card}>
              <Link href={`cars/${car.slug}`}>
                <Image
                  src={car.image}
                  alt={car.name}
                  width={400}
                  height={500}
                  className={styles.carImage}
                />
              </Link>
              <div className={styles.overlay}>
                <h3 className={styles.carName}>{car.name}</h3>
                <p className={styles.carYear}>{car.year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
