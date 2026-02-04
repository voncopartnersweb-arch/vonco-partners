'use client';

import { useTranslations } from 'next-intl';
import styles from './FleetOffer.module.css';
import OfferCards from './OfferCards';

export default function FleetOffer() {
  const t = useTranslations('FleetInfo');

  return (
    <section className={styles.wrapper}>
      <div className={styles.left}>
        <span className={styles.badge}>{t('badge')}</span>

        <h1 className={styles.title}>{t('title')}</h1>

        <p className={styles.text}>{t('description1')}</p>
        <p className={styles.text}>{t('description2')}</p>

        <div className={styles.actions}>
          <button className={styles.primary}>{t('buttons.start')}</button>
          <button className={styles.secondary}>{t('buttons.more')}</button>
        </div>
      </div>

      <OfferCards />
    </section>
  );
}
