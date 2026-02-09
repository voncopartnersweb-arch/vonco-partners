'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import styles from './FleetOffer.module.css';
import OfferCards from './OfferCards';
import Modal from '../modalWindow/Modal'; // Імпортуємо стабільно, якщо він легкий

const DriverForm = dynamic(() => import('@/Components/driverForm'), {
  loading: () => <div className={styles.loaderPlaceholder} aria-busy='true' />,
});

const FleetDetailedText = dynamic(
  () => import('../FleetDetailedInfo/FleetDetailedInfo'),
  { loading: () => <p>Loading...</p> },
);

export default function FleetOffer() {
  const t = useTranslations('FleetInfo');
  const [activeModal, setActiveModal] = useState<'form' | 'info' | null>(null);

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
          <button
            onClick={() => setActiveModal('form')}
            className={styles.primary}
            aria-haspopup='dialog'
            aria-expanded={activeModal === 'form'}
          >
            {t('buttons.start')}
          </button>

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

      <div className={styles.right}>
        <OfferCards />
      </div>

      {/* Одна точка рендеру для модалок зменшує кількість коду */}
      <Modal isOpen={activeModal === 'form'} onClose={closeModal}>
        <div role='document' tabIndex={-1}>
          <DriverForm />
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'info'} onClose={closeModal}>
        <article className={styles.modalContent}>
          <FleetDetailedText />
        </article>
      </Modal>
    </section>
  );
}
