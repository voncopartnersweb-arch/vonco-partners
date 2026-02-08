'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from './FleetOffer.module.css';
import detailsStyles from './OfferDetails.module.css'; // Імпорт нових стилів
import Modal from '../modalWindow/Modal';

export default function OfferCards() {
  const t = useTranslations('FleetInfo.cards');
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const cards = ['car', 'schedule', 'shared', 'taximeter'];

  return (
    <div className={styles.right}>
      {cards.map((key) => (
        <div key={key} className={styles.card}>
          <h3>{t(`${key}.title`)}</h3>
          <p>{t(`${key}.desc`)}</p>
          <button
            className={styles.detailsBtn}
            onClick={() => setActiveCard(key)}
          >
            {t('details')}
          </button>
        </div>
      ))}

      <div className={styles.notice}>
        <h4>{t('notice.title')}</h4>
        <p>{t('notice.desc')}</p>
      </div>

      <Modal isOpen={!!activeCard} onClose={() => setActiveCard(null)}>
        {activeCard && (
          <div className={detailsStyles.detailsContent}>
            <h2 className={detailsStyles.detailsTitle}>
              {t(`${activeCard}.title`)}
            </h2>

            <div className={detailsStyles.detailsText}>
              <p className={detailsStyles.detailsDescription}>
                {t(`${activeCard}.fullDetails`)}
              </p>

              <ul className={detailsStyles.detailsList}>
                <li>
                  <span className={detailsStyles.checkIcon}>✓</span>
                  {t('guarantees.support')}
                </li>
                <li>
                  <span className={detailsStyles.checkIcon}>✓</span>
                  {t('guarantees.legal')}
                </li>
              </ul>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
