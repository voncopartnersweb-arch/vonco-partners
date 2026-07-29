'use client';

import {
  ContactRound,
  ExternalLink,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquare,
  Music2,
  Phone,
  Send,
  X,
} from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useId, useRef, useState } from 'react';
import { Link } from '@/i18n/navigation';
import { COMPANY, COMPANY_EMAIL_HREF } from '@/data/company';
import { trackEvent } from '@/lib/analytics';
import { contactModalStyles as styles } from '@/lib/uiStyles';

const FLOATING_PANEL_OPEN_EVENT = 'vonco:floating-panel-open';

const CONTACT_GROUPS = [
  {
    id: 'katowice-region',
    phone: COMPANY.phones.katowiceRegion,
    cities: ['Katowice', 'Gdańsk', 'Gdynia', 'Sopot', 'Bielsko-Biała'],
  },
  {
    id: 'krakow-region',
    phone: COMPANY.phones.krakowRegion,
    cities: ['Kraków', 'Oświęcim', 'Zakopane', 'Zator'],
  },
] as const;

export default function ContactModal() {
  const tContacts = useTranslations('ContactsPage');
  const tQuick = useTranslations('QuickContact');
  const tChat = useTranslations('Chat');
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const dialogId = useId();
  const dialogTitleId = useId();
  const launcherRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLElement>(null);

  const message = encodeURIComponent(tQuick('whatsappMessage'));

  useEffect(() => {
    const handleFloatingPanelOpen = (event: Event) => {
      const panel = (event as CustomEvent<string>).detail;
      if (panel !== 'contacts') setIsOpen(false);
    };

    window.addEventListener(
      FLOATING_PANEL_OPEN_EVENT,
      handleFloatingPanelOpen,
    );
    return () =>
      window.removeEventListener(
        FLOATING_PANEL_OPEN_EVENT,
        handleFloatingPanelOpen,
      );
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        launcherRef.current?.focus();
        return;
      }

      if (event.key === 'Tab') {
        const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (!focusable?.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  function openContacts() {
    window.dispatchEvent(
      new CustomEvent(FLOATING_PANEL_OPEN_EVENT, { detail: 'contacts' }),
    );
    trackEvent('contact_modal_open', {
      locale,
      page_path: window.location.pathname,
    });
    setIsOpen(true);
  }

  function closeContacts() {
    setIsOpen(false);
    launcherRef.current?.focus();
  }

  function trackContact(channel: string, region = 'all') {
    trackEvent('quick_contact_click', {
      channel,
      region,
      locale,
      page_path: window.location.pathname,
    });
  }

  return (
    <>
      <button
        ref={launcherRef}
        type='button'
        className={styles.launcher}
        onClick={openContacts}
        aria-label={tContacts('title')}
        aria-haspopup='dialog'
        aria-expanded={isOpen}
        aria-controls={isOpen ? dialogId : undefined}
      >
        <ContactRound size={27} aria-hidden='true' />
      </button>

      {isOpen ? (
        <div
          className={styles.backdrop}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeContacts();
          }}
        >
          <section
            id={dialogId}
            ref={modalRef}
            className={styles.modal}
            role='dialog'
            aria-modal='true'
            aria-labelledby={dialogTitleId}
          >
            <header className={styles.header}>
              <div>
                <p className={styles.eyebrow}>Vonco Partners</p>
                <h2 id={dialogTitleId} className={styles.title}>
                  {tContacts('title')}
                </h2>
                <p className={styles.subtitle}>{tContacts('subtitle')}</p>
              </div>
              <button
                ref={closeRef}
                type='button'
                className={styles.close}
                onClick={closeContacts}
                aria-label={tChat('close')}
              >
                <X size={22} aria-hidden='true' />
              </button>
            </header>

            <div className={styles.content}>
              <section aria-labelledby={`${dialogTitleId}-cities`}>
                <h3
                  id={`${dialogTitleId}-cities`}
                  className={styles.sectionTitle}
                >
                  {tContacts('phonesTitle')}
                </h3>
                <div className={styles.groups}>
                  {CONTACT_GROUPS.map((group) => {
                    const cities = [...group.cities].sort((first, second) =>
                      first.localeCompare(second, locale),
                    );
                    const cleanPhone = group.phone.tel.replace(/\D/g, '');
                    const cityLabel = cities.join(', ');

                    return (
                      <article className={styles.groupCard} key={group.id}>
                        <ul className={styles.cityList} aria-label={cityLabel}>
                          {cities.map((city) => (
                            <li key={city} className={styles.city}>
                              {city}
                            </li>
                          ))}
                        </ul>
                        <a
                          href={`tel:${group.phone.tel}`}
                          className={styles.phone}
                          onClick={() => trackContact('phone', group.id)}
                        >
                          <Phone size={20} aria-hidden='true' />
                          {group.phone.display}
                        </a>
                        <div className={styles.groupActions}>
                          <a
                            href={`tel:${group.phone.tel}`}
                            className={styles.callAction}
                            onClick={() => trackContact('phone', group.id)}
                            aria-label={`${tQuick('call')}: ${cityLabel}`}
                          >
                            <Phone size={18} aria-hidden='true' />
                            <span>{tQuick('call')}</span>
                          </a>
                          <a
                            href={`https://wa.me/${cleanPhone}?text=${message}`}
                            target='_blank'
                            rel='noopener noreferrer'
                            className={styles.whatsappAction}
                            onClick={() =>
                              trackContact('whatsapp', group.id)
                            }
                            aria-label={`WhatsApp: ${cityLabel}`}
                          >
                            <MessageCircle size={18} aria-hidden='true' />
                            <span>{tQuick('whatsapp')}</span>
                          </a>
                          <a
                            href={`sms:${group.phone.tel}?body=${message}`}
                            className={styles.smsAction}
                            onClick={() => trackContact('sms', group.id)}
                            aria-label={`${tQuick('sms')}: ${cityLabel}`}
                          >
                            <MessageSquare size={18} aria-hidden='true' />
                            <span>{tQuick('sms')}</span>
                          </a>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>

              <section
                className={styles.onlineSection}
                aria-labelledby={`${dialogTitleId}-online`}
              >
                <h3
                  id={`${dialogTitleId}-online`}
                  className={styles.sectionTitle}
                >
                  {tContacts('onlineTitle')}
                </h3>
                <div className={styles.onlineGrid}>
                  <a
                    href={`https://t.me/${COMPANY.social.telegramUsername}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={styles.telegramAction}
                    onClick={() => trackContact('telegram')}
                  >
                    <Send size={19} aria-hidden='true' />
                    Telegram
                  </a>
                  <a
                    href={COMPANY_EMAIL_HREF}
                    className={styles.emailAction}
                    onClick={() => trackContact('email')}
                  >
                    <Mail size={19} aria-hidden='true' />
                    {COMPANY.email}
                  </a>
                </div>
                <div className={styles.socials}>
                  <a
                    href={COMPANY.social.instagram}
                    target='_blank'
                    rel='noopener noreferrer'
                    onClick={() => trackContact('instagram')}
                    aria-label='Instagram'
                  >
                    <Instagram size={20} aria-hidden='true' />
                    Instagram
                  </a>
                  <a
                    href={COMPANY.social.facebook}
                    target='_blank'
                    rel='noopener noreferrer'
                    onClick={() => trackContact('facebook')}
                    aria-label='Facebook'
                  >
                    <Facebook size={20} aria-hidden='true' />
                    Facebook
                  </a>
                  <a
                    href={COMPANY.social.tiktok}
                    target='_blank'
                    rel='noopener noreferrer'
                    onClick={() => trackContact('tiktok')}
                    aria-label='TikTok'
                  >
                    <Music2 size={20} aria-hidden='true' />
                    TikTok
                  </a>
                </div>
              </section>

              <section className={styles.office}>
                <div>
                  <h3 className={styles.sectionTitle}>
                    {tContacts('officeAddressTitle')}
                  </h3>
                  <p>
                    {COMPANY.legal.officeAddressLine1},{' '}
                    {COMPANY.legal.officeCityPostal}
                  </p>
                </div>
                <a
                  href={COMPANY.legal.officeMapUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={styles.mapAction}
                  onClick={() => trackContact('map')}
                >
                  <MapPin size={18} aria-hidden='true' />
                  {tContacts('openInMaps')}
                </a>
              </section>

              <Link
                href={COMPANY.links.contacts}
                className={styles.fullContacts}
                onClick={closeContacts}
              >
                {tContacts('title')}
                <ExternalLink size={18} aria-hidden='true' />
              </Link>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
