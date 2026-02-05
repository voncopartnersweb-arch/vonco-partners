import styles from './Footer.module.css';
import {
  FaPhone,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaTiktok,
} from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import { FACEBOOK_URL, INSTAGRAM_URL, TIKTOK_URL } from '@/data/sotialLinks';

export default function Footer() {
  const t = useTranslations('Footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logoAndText}>
          <div className={styles.logo}>Vonco Partners</div>
          <p className={styles.tagline}>{t('tagline')}</p>
          <span className={styles.copyright}>
            {t('rights')} &copy; {currentYear}
          </span>
        </div>

        <div className={styles.contactInfo}>
          <a href='tel:+48572867193' className={styles.contactItem}>
            <FaPhone className={styles.icon} />
            {t('katowice')}: +48 572 867 193
          </a>
          <a href='tel:+48794 110 572' className={styles.contactItem}>
            <FaPhone className={styles.icon} />
            {t('krakow')}: +48 794 110 572
          </a>
          <a
            href='mailto:vonco.partners@gmail.com'
            className={styles.contactItem}
          >
            <FaEnvelope className={styles.icon} />
            vonco.partners@gmail.com
          </a>
        </div>

        <div className={styles.socialMedia}>
          <a
            href={FACEBOOK_URL}
            target='_blank'
            rel='noopener noreferrer'
            className={styles.socialLink}
            aria-label='Facebook'
          >
            <FaFacebookF className={styles.socialIcon} />
          </a>
          <a
            href={INSTAGRAM_URL}
            target='_blank'
            rel='noopener noreferrer'
            className={styles.socialLink}
            aria-label='Instagram'
          >
            <FaInstagram className={styles.socialIcon} />
          </a>
          <a
            href={TIKTOK_URL}
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
      </div>
    </footer>
  );
}
