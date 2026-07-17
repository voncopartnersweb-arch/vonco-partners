'use client';

import { useTranslations } from 'next-intl';
import { fleetDetailStyles as styles } from '@/lib/uiStyles';

export default function FleetDetailedText() {
  const t = useTranslations('FleetInfo');
  const categories = ['car', 'schedule', 'shared', 'taximeter'] as const;

  return (
    <div className={styles.container}>
      <h2 className={styles.mainTitle}>{t('title')}</h2>

      <div className={styles.introSection}>
        <p className={styles.leadText}>{t('description1')}</p>
      </div>

      <div className={styles.grid}>
        {categories.map((key) => (
          <article key={key} className={styles.article}>
            <h3 className={styles.sectionTitle}>{t(`cards.${key}.title`)}</h3>
            <p className={styles.description}>{t(`cards.${key}.desc`)}</p>
            <p className={styles.fullDescription}>
              {t(`cards.${key}.fullDetails`)}
            </p>

            <ul className={styles.factsList}>
              <li>
                <span className={styles.factLabel}>
                  {t('detailedLabels.bestFor')}
                </span>
                <span className={styles.factValue}>
                  {t(`cards.${key}.data.bestFor`)}
                </span>
              </li>
              <li>
                <span className={styles.factLabel}>
                  {t('detailedLabels.conditions')}
                </span>
                <span className={styles.factValue}>
                  {t(`cards.${key}.data.conditions`)}
                </span>
              </li>
              <li>
                <span className={styles.factLabel}>
                  {t('detailedLabels.result')}
                </span>
                <span className={styles.factValue}>
                  {t(`cards.${key}.data.result`)}
                </span>
              </li>
            </ul>
          </article>
        ))}
      </div>

      <div className={styles.divider} />

      <section className={styles.importantSection}>
        <h3 className={styles.noticeTitle}>{t('cards.notice.title')}</h3>
        <p className={styles.noticeText}>{t('cards.notice.desc')}</p>
        <p className={styles.fleetList}>{t('description2')}</p>
      </section>

      <section className={styles.guarantees}>
        <h3 className={styles.guaranteesTitle}>{t('detailedLabels.guarantees')}</h3>
        <ul className={styles.guaranteesList}>
          <li>{t('cards.guarantees.support')}</li>
          <li>{t('cards.guarantees.legal')}</li>
        </ul>
      </section>
    </div>
  );
}
