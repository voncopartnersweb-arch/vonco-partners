import styles from './Footer.module.css';
import {
  FaPhone,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaTiktok,
} from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import { COMPANY, COMPANY_EMAIL_HREF } from '@/data/company';
import LocaleSwitcher from './LocaleSwitcher';

export default function Footer() {
  const t = useTranslations('Footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logoAndText}>
          <div className={styles.logo}>Vonco Partners</div>
          <p className={styles.tagline}>{t('tagline')}</p>
        </div>

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
          <a href={COMPANY_EMAIL_HREF} className={styles.contactItem}>
            <FaEnvelope className={styles.icon} />
            {COMPANY.email}
          </a>
        </div>

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
        </div>

        {/* <div className={styles.ctaAndLang}>
          <a href='#contact' className={styles.ctaButton}>
            {t('cta')}
          </a>
        </div> */}
        <LocaleSwitcher />
        <span className={styles.copyright}>
          {t('rights')} &copy; {currentYear}
        </span>
      </div>
    </footer>
  );
}
