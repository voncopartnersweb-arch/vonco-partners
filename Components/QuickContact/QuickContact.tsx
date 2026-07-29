'use client';
import { Phone, MessageCircle, Send, MessageSquare } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { COMPANY } from '@/data/company';
import { trackEvent } from '@/lib/analytics';

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
  const trackContact = (channel: string) =>
    trackEvent('quick_contact_click', {
      channel,
      locale: document.documentElement.lang,
      page_path: window.location.pathname,
    });

  return (
    <div className='mt-8 rounded-3xl border border-line bg-surface p-6 text-center shadow-soft'>
      <p className='mb-5 text-sm font-bold text-foreground'>{t('title')}</p>
      <div className='grid grid-cols-2 gap-2.5 sm:grid-cols-4'>
        {/* Телефон */}
        <a
          href={`tel:${phoneNumber}`}
          onClick={() => trackContact('phone')}
          className='flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-700 px-2 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-blue-800 active:scale-95'
        >
          <Phone size={20} />
          <span>{t('call')}</span>
        </a>

        {/* Telegram */}
        <a
          href={`https://t.me/${telegramUser}`}
          onClick={() => trackContact('telegram')}
          target='_blank'
          rel='noopener noreferrer'
          className='flex min-h-12 items-center justify-center gap-2 rounded-xl bg-sky-800 px-2 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-sky-900 active:scale-95'
        >
          <Send size={20} />
          <span>{t('telegram')}</span>
        </a>

        {/* WhatsApp */}
        <a
          href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(t('whatsappMessage'))}`}
          onClick={() => trackContact('whatsapp')}
          target='_blank'
          rel='noopener noreferrer'
          className='flex min-h-12 items-center justify-center gap-2 rounded-xl bg-green-800 px-2 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-green-900 active:scale-95'
        >
          <MessageCircle size={20} />
          <span>{t('whatsapp')}</span>
        </a>

        {/* Viber */}
        <a
          href={`sms:${phoneNumber}?body=${encodeURIComponent(t('whatsappMessage'))}`}
          onClick={() => trackContact('sms')}
          className='flex min-h-12 items-center justify-center gap-2 rounded-xl bg-indigo-700 px-2 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-indigo-800 active:scale-95'
        >
          <MessageSquare size={20} />
          <span>{t('sms')}</span>
        </a>
      </div>
    </div>
  );
}
