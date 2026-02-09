'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from './FleetOffer.module.css';
import detailsStyles from './OfferDetails.module.css';
import Modal from '../modalWindow/Modal';

export default function OfferCards() {
  const t = useTranslations('FleetInfo.cards');
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const cards = ['car', 'schedule', 'shared', 'taximeter'] as const;

  return (
    <div className={styles.right}>
      {cards.map((key) => (
        <article key={key} className={styles.card}>
          {/* h3 — правильна ієрархія після h2 у FleetOffer */}
          <h3>{t(`${key}.title`)}</h3>
          <p>{t(`${key}.desc`)}</p>
          <button
            className={styles.detailsBtn}
            onClick={() => setActiveCard(key)}
            aria-label={`${t('details')} ${t(`${key}.title`)}`}
          >
            {t('details')}
          </button>
        </article>
      ))}

      <div className={styles.notice}>
        <h4>{t('notice.title')}</h4>
        <p>{t('notice.desc')}</p>
      </div>

      <Modal isOpen={!!activeCard} onClose={() => setActiveCard(null)}>
        {activeCard && (
          <article className={detailsStyles.detailsContent}>
            {/* Використовуємо h2, бо це головний заголовок у вікні модалки */}
            <h2 className={detailsStyles.detailsTitle}>
              {t(`${activeCard}.title`)}
            </h2>

            <div className={detailsStyles.detailsText}>
              <p className={detailsStyles.detailsDescription}>
                {t(`${activeCard}.fullDetails`)}
              </p>

              <ul className={detailsStyles.detailsList} role='list'>
                <li>
                  <span className={detailsStyles.checkIcon} aria-hidden='true'>
                    ✓
                  </span>
                  {t('guarantees.support')}
                </li>
                <li>
                  <span className={detailsStyles.checkIcon} aria-hidden='true'>
                    ✓
                  </span>
                  {t('guarantees.legal')}
                </li>
              </ul>
            </div>
          </article>
        )}
      </Modal>
    </div>
  );
}
