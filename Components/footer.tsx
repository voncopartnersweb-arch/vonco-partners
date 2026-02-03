// components/Footer.jsx
import styles from './Footer.module.css';
import { FaPhone, FaEnvelope, FaFacebookF, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logoAndText}>
          <div className={styles.logo}>Vonco Partners</div>
          <p className={styles.tagline}>Twój polecony partner!</p>
          <span className={styles.copyright}>
            Wszelkie prawa zastrzeżone &copy; 2023
          </span>
        </div>
        <div className={styles.contactInfo}>
          <a href='tel:+48 572 867 193' className={styles.contactItem}>
            <FaPhone className={styles.icon} />
            +48 572 867 193
          </a>
          <a href='mailto:info@vonco.partners' className={styles.contactItem}>
            <FaEnvelope className={styles.icon} />
            info@vonco.partners
          </a>
        </div>
        <div className={styles.socialMedia}>
          <a
            href='https://www.facebook.com/p/Voncopartners-100089457913783/'
            target='_blank'
            rel='noopener noreferrer'
            className={styles.socialLink}
          >
            <FaFacebookF className={styles.socialIcon} />
          </a>
          <a
            href='https://www.instagram.com/vonco.partners'
            target='_blank'
            rel='noopener noreferrer'
            className={styles.socialLink}
          >
            <FaInstagram className={styles.socialIcon} />
          </a>
        </div>
        {/* <div className={styles.ctaAndLang}>
          <div className={styles.languageSelect}>
            <span className={styles.langText}>RU</span>
            <span className={styles.arrowIcon}>&#9660;</span>
          </div>
          <a href='#' className={styles.ctaButton}>
            Связаться с нами
          </a>
        </div> */}
      </div>
    </footer>
  );
}
