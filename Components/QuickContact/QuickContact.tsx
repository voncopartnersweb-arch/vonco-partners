'use client';
import { Phone, MessageCircle, Send, MessageSquare } from 'lucide-react';
import { useTranslations } from 'next-intl';
import styles from './QuickContact.module.css';
import { COMPANY } from '@/data/company';

interface QuickContactProps {
  phoneNumber: string;
  telegramUser?: string;
  viberNumber?: string;
}

export default function QuickContact({
  phoneNumber,
  telegramUser = COMPANY.social.telegramUsername,
  viberNumber = '', // Рекомендовано повний код країни без +
}: QuickContactProps) {
  const t = useTranslations('QuickContact');

  // Очищення номера для посилань (залишаємо тільки цифри)
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  const cleanViber = viberNumber.replace(/\D/g, '');

  return (
    <div className={styles.container}>
      <p className={styles.title}>{t('title')}</p>
      <div className={styles.grid}>
        {/* Телефон */}
        <a
          href={`tel:${phoneNumber}`}
          className={`${styles.button} ${styles.phone}`}
        >
          <Phone size={20} />
          <span>{t('call')}</span>
        </a>

        {/* Telegram */}
        <a
          href={`https://t.me/${telegramUser}`}
          target='_blank'
          rel='noopener noreferrer'
          className={`${styles.button} ${styles.telegram}`}
        >
          <Send size={20} />
          <span>Telegram</span>
        </a>

        {/* WhatsApp */}
        <a
          href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(t('whatsappMessage'))}`}
          target='_blank'
          rel='noopener noreferrer'
          className={`${styles.button} ${styles.whatsapp}`}
        >
          <MessageCircle size={20} />
          <span>WhatsApp</span>
        </a>

        {/* Viber */}
        <a
          href={`sms:${phoneNumber}?body=${encodeURIComponent(t('whatsappMessage'))}`}
          className={`${styles.button} ${styles.message}`}
        >
          <MessageSquare size={20} />
          <span>SMS</span>
        </a>
      </div>
    </div>
  );
}
