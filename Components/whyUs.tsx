import styles from './WhyUs.module.css';
import Image from 'next/image';

export default function WhyUs() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Почему мы?</h2>
      <div className={styles.content}>
        <div className={styles.benefitsColumn}>
          <ul className={styles.benefitsList}>
            <li className={styles.benefitItem}>
              <span className={styles.icon}>✔</span>
              Лучший партнер Uber, Bolt, FreeNow
            </li>
            <li className={styles.benefitItem}>
              <span className={styles.icon}>✔</span>
              +5 года опыта
            </li>
            <li className={styles.benefitItem}>
              <span className={styles.icon}>✔</span>
              +100 трудоустроенных
            </li>
            <li className={styles.benefitItem}>
              <span className={styles.icon}>✔</span>
              100% довольных водителей
            </li>
          </ul>
        </div>
        <div className={styles.carImage}>
          <Image
            src='/voncoCar.jpg'
            alt='Branded taxi car'
            width={700}
            height={400}
            layout='responsive'
          />
        </div>
        <div className={styles.benefitsColumn}>
          <ul className={styles.benefitsList}>
            <li className={styles.benefitItem}>
              <span className={styles.icon}>✔</span>
              Лицензии в 18 городах
            </li>
            <li className={styles.benefitItem}>
              <span className={styles.icon}>✔</span>
              100+ машин в автопарке
            </li>
            <li className={styles.benefitItem}>
              <span className={styles.icon}>✔</span>
              Прозрачный договор и расчеты
            </li>
            <li className={styles.benefitItem}>
              <span className={styles.icon}>✔</span>
              Бонусы в начале работы
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
