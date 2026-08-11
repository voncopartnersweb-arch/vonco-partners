import {
  FaPhone,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaTelegramPlane,
  FaTiktok,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import { useLocale, useTranslations } from 'next-intl';
import { COMPANY, COMPANY_EMAIL_HREF } from '@/data/company';
import LocaleSwitcher from './LocaleSwitcher';
import NavLink from './ClientComponents/NavLink';
import { TELEGRAM_URL } from '@/data/sotialLinks';
import { getBlogLabels, isBlogLocale } from '@/data/blog';
import { getProgramsContent } from '@/data/programsContent';
import { getDocumentGuideContent } from '@/data/documentsContent';
import BrandLogo from './BrandLogo';

const styles = {
  footer: 'border-t border-line bg-surface px-5 pb-5 pt-14 text-foreground max-md:px-3 max-md:pt-10',
  container: 'mx-auto grid max-w-[1300px] grid-cols-[1.3fr_1fr_1.2fr_1.2fr] gap-7 max-lg:grid-cols-2 max-md:grid-cols-1 max-md:gap-3.5',
  brandColumn: 'min-w-0 max-md:rounded-2xl max-md:border max-md:border-line max-md:bg-surface-raised max-md:p-4 max-md:text-center',
  linksColumn: 'min-w-0 max-md:rounded-2xl max-md:border max-md:border-line max-md:bg-surface-raised max-md:p-4',
  contactsColumn: 'min-w-0 max-md:rounded-2xl max-md:border max-md:border-line max-md:bg-surface-raised max-md:p-4',
  legalColumn: 'min-w-0 max-md:rounded-2xl max-md:border max-md:border-line max-md:bg-surface-raised max-md:p-4',
  logo: 'inline-flex',
  tagline: 'mb-2 mt-2.5 leading-relaxed text-muted',
  legalName: 'text-sm leading-relaxed text-muted',
  columnTitle: 'mb-3.5 text-sm font-bold tracking-wider text-brand uppercase',
  quickLinks: 'grid gap-1.5',
  quickLink: 'inline-flex min-h-11 items-center text-muted transition hover:translate-x-1 hover:text-brand max-md:hover:translate-x-0',
  contactInfo: 'grid gap-1.5',
  contactItem: 'inline-flex min-h-11 items-center gap-2.5 text-muted transition hover:text-brand',
  icon: 'shrink-0 text-brand',
  legalText: 'mb-2 inline-flex items-start gap-2 leading-relaxed text-muted',
  legalLink: 'mb-2 inline-flex items-start gap-2 text-brand underline underline-offset-4 transition hover:text-brand-solid-strong',
  socialMedia: 'mt-3 flex flex-wrap gap-2.5',
  socialLink: 'inline-flex size-11 items-center justify-center rounded-xl border border-line bg-surface-raised text-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-brand/70 hover:bg-brand-soft hover:text-brand',
  socialIcon: 'text-lg',
  bottomBar: 'mx-auto mt-6 flex max-w-[1300px] items-center justify-between gap-3 border-t border-line pt-4 max-md:flex-col max-md:text-center',
  localeWrap: 'inline-flex min-h-11 items-center',
  copyright: 'text-sm text-muted',
};

export default function Footer() {
  const t = useTranslations('Footer');
  const locale = useLocale();
  const tNav = useTranslations('Navbar');
  const tSocials = useTranslations('Socials');
  const tWork = useTranslations('WorkPage');
  const programsLabel = getProgramsContent(locale).navLabel;
  const documentsContent = getDocumentGuideContent(locale);
  const linksTitle = t.has('linksTitle') ? t('linksTitle') : 'Навігація';
  const aboutLabel = tNav.has('about') ? tNav('about') : 'About';
  const servicesLabel = tNav.has('services') ? tNav('services') : 'Services';
  const contactsTitle = t.has('contactsTitle')
    ? t('contactsTitle')
    : 'Contacts';
  const companyDetailsTitle = t.has('companyDetailsTitle')
    ? t('companyDetailsTitle')
    : 'Company Details';
  const officePhoneLabel = t.has('officePhoneLabel')
    ? t('officePhoneLabel')
    : 'Office';
  const registrationAddressLabel = t.has('registrationAddressLabel')
    ? t('registrationAddressLabel')
    : 'Registration address';
  const officeAddressLabel = t.has('officeAddressLabel')
    ? t('officeAddressLabel')
    : 'Office address';
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brandColumn}>
          <div className={styles.logo}>
            <BrandLogo className='h-14 w-[210px] max-md:mx-auto' />
          </div>
          <p className={styles.tagline}>{t('tagline')}</p>
          <p className={styles.legalName}>{COMPANY.legalName}</p>
        </div>

        <nav className={styles.linksColumn} aria-label={t('navigationAria')}>
          <p className={styles.columnTitle}>{linksTitle}</p>
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
              href='/programs'
              activeStyle={styles.quickLink}
              unActiveStyle={styles.quickLink}
            >
              {programsLabel}
            </NavLink>
            <NavLink
              href='/cars'
              activeStyle={styles.quickLink}
              unActiveStyle={styles.quickLink}
            >
              {tNav('cars')}
            </NavLink>
            <NavLink
              href='/vykup-avto'
              activeStyle={styles.quickLink}
              unActiveStyle={styles.quickLink}
            >
              {tWork('buyoutTitle')}
            </NavLink>
            <NavLink
              href='/contacts'
              activeStyle={styles.quickLink}
              unActiveStyle={styles.quickLink}
            >
              {tNav('contacts')}
            </NavLink>
            {documentsContent ? (
              <NavLink
                href='/documents-for-taxi-work'
                activeStyle={styles.quickLink}
                unActiveStyle={styles.quickLink}
              >
                {documentsContent.navLabel}
              </NavLink>
            ) : null}
            <NavLink
              href='/privacy-policy'
              activeStyle={styles.quickLink}
              unActiveStyle={styles.quickLink}
            >
              {tNav('PrivacyPolicy')}
            </NavLink>
            {isBlogLocale(locale) ? (
              <NavLink
                href='/blog'
                activeStyle={styles.quickLink}
                unActiveStyle={styles.quickLink}
              >
                {getBlogLabels(locale).blog}
              </NavLink>
            ) : null}
          </div>
        </nav>

        <div className={styles.contactsColumn}>
          <p className={styles.columnTitle}>{contactsTitle}</p>
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
            <a
              href={TELEGRAM_URL}
              target='_blank'
              rel='noopener noreferrer'
              className={styles.contactItem}
            >
              <FaTelegramPlane className={styles.icon} />
              @vonco_partners
            </a>
          </div>
        </div>

        <div className={styles.legalColumn}>
          <p className={styles.columnTitle}>{companyDetailsTitle}</p>
          <p className={styles.legalText}>
            <FaMapMarkerAlt className={styles.icon} />
            {registrationAddressLabel}: {COMPANY.legal.addressLine1},{' '}
            {COMPANY.legal.cityPostal}
          </p>
          {COMPANY.offices.map((office) => (
            <a
              href={office.mapUrl}
              target='_blank'
              rel='noopener noreferrer'
              className={styles.legalLink}
              key={office.id}
            >
              <FaMapMarkerAlt className={styles.icon} />
              {officeAddressLabel} — {office.label}: {office.addressLine1},{' '}
              {office.cityPostal}
            </a>
          ))}
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
              aria-label={tSocials('followFacebook')}
            >
              <FaFacebookF className={styles.socialIcon} />
            </a>
            <a
              href={COMPANY.social.instagram}
              target='_blank'
              rel='noopener noreferrer'
              className={styles.socialLink}
              aria-label={tSocials('followInstagram')}
            >
              <FaInstagram className={styles.socialIcon} />
            </a>
            <a
              href={COMPANY.social.tiktok}
              target='_blank'
              rel='noopener noreferrer'
              className={styles.socialLink}
              aria-label={tSocials('followTiktok')}
            >
              <FaTiktok className={styles.socialIcon} />
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
