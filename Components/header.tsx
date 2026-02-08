'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import styles from './Header.module.css';
import NavLink from './ClientComponents/NavLink';
import LocaleSwitcher from './LocaleSwitcher';
import { useTranslations } from 'next-intl';

export default function Header() {
  const pathName = usePathname();
  const t = useTranslations('Navbar');

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathName]);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        btnRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !btnRef.current.contains(e.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) setIsMenuOpen(false);
    };
    document.addEventListener('click', handleOutside);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', handleOutside);
      document.removeEventListener('keydown', onKey);
    };
  }, [isMenuOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href='/' className={styles.logoWrapper}>
          <h3 className={styles.logo}>Vonco Partners</h3>
        </Link>

        <div className={styles.desktopLocaleWrapper}>
          <LocaleSwitcher />
        </div>
        <nav className={styles.nav} aria-label='Main navigation'>
          <NavLink
            href='/cars'
            activeStyle={styles.navBtnActive}
            unActiveStyle={styles.navBtn}
          >
            <span className={styles.navBtnLabel}>{t('cars')}</span>
          </NavLink>
        </nav>

        <button
          ref={btnRef}
          className={`${styles.menuButton} ${isMenuOpen ? styles.open : ''}`}
          aria-label='Toggle navigation menu'
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((s) => !s)}
          type='button'
        >
          <span className={styles.menuIcon} aria-hidden='true'>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>

      <nav
        ref={menuRef}
        className={`${styles.mobileNav} ${isMenuOpen ? styles.open : ''}`}
        aria-label='Mobile navigation'
      >
        <div className={styles.mobileLocaleWrapper}>
          <LocaleSwitcher />
        </div>
        <NavLink
          href='/'
          activeStyle={styles.mobileNavItemActive || styles.navBtnActive}
          unActiveStyle={styles.mobileNavItem || styles.navBtn}
        >
          <div className={styles.mobileNavItemInner}>{t('home')}</div>
        </NavLink>
        <NavLink
          href='/cars'
          activeStyle={styles.mobileNavItemActive || styles.navBtnActive}
          unActiveStyle={styles.mobileNavItem || styles.navBtn}
        >
          <div className={styles.mobileNavItemInner}>{t('cars')}</div>
        </NavLink>
        <NavLink
          href='/privacy-policy'
          activeStyle={styles.mobileNavItemActive || styles.navBtnActive}
          unActiveStyle={styles.mobileNavItem || styles.navBtn}
        >
          <div className={styles.mobileNavItemInner}>{t('PrivacyPolicy')}</div>
        </NavLink>
      </nav>
    </header>
  );
}
