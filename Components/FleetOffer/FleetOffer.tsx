'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from './FleetOffer.module.css';
import OfferCards from './OfferCards';
import DriverForm from '@/Components/driverForm'; // Шлях до твоєї форми
import Modal from '../modalWindow/Modal';
import FleetDetailedText from '../FleetDetailedInfo/FleetDetailedInfo';

export default function FleetOffer() {
  const t = useTranslations('FleetInfo');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalMoreOpen, setIsModalMoreOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleModalMore = () => setIsModalMoreOpen(!isModalMoreOpen);

  return (
    <section className={styles.wrapper}>
      <div className={styles.left}>
        <span className={styles.badge}>{t('badge')}</span>
        <h1 className={styles.title}>{t('title')}</h1>
        <p className={styles.text}>{t('description1')}</p>
        <p className={styles.text}>{t('description2')}</p>

        <div className={styles.actions}>
          {/* Додаємо onClick */}
          <button onClick={toggleModal} className={styles.primary}>
            {t('buttons.start')}
          </button>
          <button onClick={toggleModalMore} className={styles.secondary}>
            {t('buttons.more')}
          </button>
        </div>
      </div>

      <OfferCards />

      {/* Модальне вікно */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <DriverForm />
        </Modal>
      )}
      {isModalMoreOpen && (
        <Modal
          isOpen={isModalMoreOpen}
          onClose={() => setIsModalMoreOpen(false)}
        >
          <FleetDetailedText />
        </Modal>
      )}
    </section>
  );
}
