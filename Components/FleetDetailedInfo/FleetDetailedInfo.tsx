'use client';

import { useTranslations } from 'next-intl';
import styles from './FleetDetailedText.module.css';

export default function FleetDetailedText() {
  const t = useTranslations('FleetInfo');

  return (
    <div className={styles.container}>
      <h2 className={styles.mainTitle}>{t('title')}</h2>

      <div className={styles.introSection}>
        <p className={styles.leadText}>{t('description1')}</p>
      </div>

      <div className={styles.content}>
        <article className={styles.article}>
          <h3 className={styles.sectionTitle}>{t('cards.car.title')}</h3>
          <p className={styles.description}>{t('cards.car.desc')}</p>
        </article>

        <article className={styles.article}>
          <h3 className={styles.sectionTitle}>{t('cards.schedule.title')}</h3>
          <p className={styles.description}>{t('cards.schedule.desc')}</p>
        </article>

        <article className={styles.article}>
          <h3 className={styles.sectionTitle}>{t('cards.taximeter.title')}</h3>
          <p className={styles.description}>{t('cards.taximeter.desc')}</p>
        </article>

        <article className={styles.article}>
          <h3 className={styles.sectionTitle}>{t('cards.shared.title')}</h3>
          <p className={styles.description}>{t('cards.shared.desc')}</p>
        </article>

        <div className={styles.divider} />

        <section className={styles.importantSection}>
          <h3 className={styles.noticeTitle}>{t('cards.notice.title')}</h3>
          <p className={styles.noticeText}>{t('cards.notice.desc')}</p>
          <p className={styles.fleetList}>{t('description2')}</p>
        </section>
      </div>
    </div>
  );
}
