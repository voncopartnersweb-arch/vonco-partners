'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { fleetOfferStyles as styles } from '@/lib/uiStyles';
import OfferCards from './OfferCards';
import Modal from '../modalWindow/Modal'; // Імпортуємо стабільно, якщо він легкий
import OpenDriverFormButton from '@/Components/OpenDriverFormButton';

const FleetDetailedText = dynamic(
  () => import('../FleetDetailedInfo/FleetDetailedInfo'),
  { loading: () => <div className={styles.loaderPlaceholder} aria-busy='true' /> },
);

export default function FleetOffer() {
  const t = useTranslations('FleetInfo');
  const [activeModal, setActiveModal] = useState<'info' | null>(null);

  const closeModal = () => setActiveModal(null);

  return (
    <section className={styles.wrapper} aria-labelledby='fleet-offer-title'>
      <div className={styles.left}>
        <span className={styles.badge}>{t('badge')}</span>
        <h2 id='fleet-offer-title' className={styles.title}>
          {t('title')}
        </h2>

        <div className={styles.description}>
          <p className={styles.text}>{t('description1')}</p>
          <p className={styles.text}>{t('description2')}</p>
        </div>

        <div className={styles.actions}>
          <OpenDriverFormButton
            className={styles.primary}
            label={t('buttons.start')}
          />

          <button
            onClick={() => setActiveModal('info')}
            className={styles.secondary}
            aria-haspopup='dialog'
            aria-expanded={activeModal === 'info'}
          >
            {t('buttons.more')}
          </button>
        </div>
      </div>

      <OfferCards />

      {/* Одна точка рендеру для модалок зменшує кількість коду */}

      <Modal isOpen={activeModal === 'info'} onClose={closeModal}>
        <article>
          <FleetDetailedText />
        </article>
      </Modal>
    </section>
  );
}
