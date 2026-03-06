import styles from './Footer.module.css';
import {
  FaPhone,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaTelegramPlane,
  FaTiktok,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import { COMPANY, COMPANY_EMAIL_HREF } from '@/data/company';
import LocaleSwitcher from './LocaleSwitcher';
import NavLink from './ClientComponents/NavLink';
import { TELEGRAM_GROUP_URL, TELEGRAM_URL } from '@/data/sotialLinks';

export default function Footer() {
  const t = useTranslations('Footer');
  const tNav = useTranslations('Navbar');
  const linksTitle = t.has('linksTitle') ? t('linksTitle') : 'Навігація';
  const aboutLabel = tNav.has('about') ? tNav('about') : 'About';
  const servicesLabel = tNav.has('services') ? tNav('services') : 'Services';
  const contactsTitle = t.has('contactsTitle') ? t('contactsTitle') : 'Contacts';
  const companyDetailsTitle = t.has('companyDetailsTitle')
    ? t('companyDetailsTitle')
    : 'Company Details';
  const officePhoneLabel = t.has('officePhoneLabel') ? t('officePhoneLabel') : 'Office';
  const registrationAddressLabel = t.has('registrationAddressLabel')
    ? t('registrationAddressLabel')
    : 'Registration address';
  const officeAddressLabel = t.has('officeAddressLabel')
    ? t('officeAddressLabel')
    : 'Office address';
  const currentYear = new Date().getFullYear();
  const officeMapLink = COMPANY.legal.officeMapUrl;

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brandColumn}>
          <div className={styles.logo}>{COMPANY.name}</div>
          <p className={styles.tagline}>{t('tagline')}</p>
          <p className={styles.legalName}>{COMPANY.legalName}</p>
        </div>

        <nav className={styles.linksColumn} aria-label='Footer navigation'>
          <h4 className={styles.columnTitle}>{linksTitle}</h4>
          <div className={styles.quickLinks}>
            <NavLink
              href='/'
              activeStyle={styles.quickLink}
              unActiveStyle={styles.quickLink}
            >
              {tNav('home')}
            </NavLink>
            <NavLink
              href='/work'
              activeStyle={styles.quickLink}
              unActiveStyle={styles.quickLink}
            >
              {tNav('work')}
            </NavLink>
            <NavLink
              href='/about'
              activeStyle={styles.quickLink}
              unActiveStyle={styles.quickLink}
            >
              {aboutLabel}
            </NavLink>
            <NavLink
              href='/services'
              activeStyle={styles.quickLink}
              unActiveStyle={styles.quickLink}
            >
              {servicesLabel}
            </NavLink>
            <NavLink
              href='/cars'
              activeStyle={styles.quickLink}
              unActiveStyle={styles.quickLink}
            >
              {tNav('cars')}
            </NavLink>
            <NavLink
              href='/contacts'
              activeStyle={styles.quickLink}
              unActiveStyle={styles.quickLink}
            >
              {tNav('contacts')}
            </NavLink>
            <NavLink
              href='/privacy-policy'
              activeStyle={styles.quickLink}
              unActiveStyle={styles.quickLink}
            >
              {tNav('PrivacyPolicy')}
            </NavLink>
          </div>
        </nav>

        <div className={styles.contactsColumn}>
          <h4 className={styles.columnTitle}>{contactsTitle}</h4>
          <div className={styles.contactInfo}>
            <a
              href={`tel:${COMPANY.phones.katowiceRegion.tel}`}
              className={styles.contactItem}
            >
              <FaPhone className={styles.icon} />
              {t('katowice')}: {COMPANY.phones.katowiceRegion.display}
            </a>
            <a
              href={`tel:${COMPANY.phones.krakowRegion.tel}`}
              className={styles.contactItem}
            >
              <FaPhone className={styles.icon} />
              {t('krakow')}: {COMPANY.phones.krakowRegion.display}
            </a>
            <a
              href={`tel:${COMPANY.phones.office.tel}`}
              className={styles.contactItem}
            >
              <FaPhone className={styles.icon} />
              {officePhoneLabel}: {COMPANY.phones.office.display}
            </a>
            <a href={COMPANY_EMAIL_HREF} className={styles.contactItem}>
              <FaEnvelope className={styles.icon} />
              {COMPANY.email}
            </a>
          </div>
        </div>

        <div className={styles.legalColumn}>
          <h4 className={styles.columnTitle}>{companyDetailsTitle}</h4>
          <p className={styles.legalText}>
            <FaMapMarkerAlt className={styles.icon} />
            {registrationAddressLabel}: {COMPANY.legal.addressLine1},{' '}
            {COMPANY.legal.cityPostal}
          </p>
          <a
            href={officeMapLink}
            target='_blank'
            rel='noopener noreferrer'
            className={styles.legalLink}
          >
            <FaMapMarkerAlt className={styles.icon} />
            {officeAddressLabel}: {COMPANY.legal.officeAddressLine1},{' '}
            {COMPANY.legal.officeCityPostal}
          </a>
          <p className={styles.legalText}>NIP: {COMPANY.legal.nip}</p>
          <br />
          <p className={styles.legalText}>REGON: {COMPANY.legal.regon}</p>
          <br />
          <p className={styles.legalText}>KRS: {COMPANY.legal.krs}</p>
          <br />
          <div className={styles.socialMedia}>
            <a
              href={COMPANY.social.facebook}
              target='_blank'
              rel='noopener noreferrer'
              className={styles.socialLink}
              aria-label='Facebook'
            >
              <FaFacebookF className={styles.socialIcon} />
            </a>
            <a
              href={COMPANY.social.instagram}
              target='_blank'
              rel='noopener noreferrer'
              className={styles.socialLink}
              aria-label='Instagram'
            >
              <FaInstagram className={styles.socialIcon} />
            </a>
            <a
              href={COMPANY.social.tiktok}
              target='_blank'
              rel='noopener noreferrer'
              className={styles.socialLink}
              aria-label='TikTok'
            >
              <FaTiktok className={styles.socialIcon} />
            </a>
            <a
              href={TELEGRAM_URL}
              target='_blank'
              rel='noopener noreferrer'
              className={styles.socialLink}
              aria-label='Telegram'
            >
              <FaTelegramPlane className={styles.socialIcon} />
            </a>
            <a
              href={TELEGRAM_GROUP_URL}
              target='_blank'
              rel='noopener noreferrer'
              className={styles.socialLink}
              aria-label='Telegram Group'
            >
              <FaTelegramPlane className={styles.socialIcon} />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.localeWrap}>
          <LocaleSwitcher />
        </div>
        <span className={styles.copyright}>
          {t('rights')} &copy; {currentYear}
        </span>
      </div>
    </footer>
  );
}
