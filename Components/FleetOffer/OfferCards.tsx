'use client';

import { useTranslations } from 'next-intl';
import styles from './FleetOffer.module.css';

export default function OfferCards() {
  const t = useTranslations('FleetInfo.cards');

  return (
    <div className={styles.right}>
      <div className={styles.card}>
        <h3>{t('car.title')}</h3>
        <p>{t('car.desc')}</p>
        <button>{t('details')}</button>
      </div>

      <div className={styles.card}>
        <h3>{t('schedule.title')}</h3>
        <p>{t('schedule.desc')}</p>
        <button>{t('details')}</button>
      </div>

      <div className={styles.card}>
        <h3>{t('shared.title')}</h3>
        <p>{t('shared.desc')}</p>
        <button>{t('details')}</button>
      </div>

      <div className={styles.card}>
        <h3>{t('taximeter.title')}</h3>
        <p>{t('taximeter.desc')}</p>
        <button>{t('details')}</button>
      </div>

      <div className={styles.notice}>
        <h4>{t('notice.title')}</h4>
        <p>{t('notice.desc')}</p>
      </div>
    </div>
  );
}
