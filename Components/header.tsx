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
  const contactLabel = t.has('contacts') ? t('contacts') : 'Contacts';
  const links = [
    { href: '/', label: t('home') },
    { href: '/cars', label: t('cars') },
    { href: '/contacts', label: contactLabel },
    { href: '/privacy-policy', label: t('PrivacyPolicy') },
  ];

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
          {links.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              activeStyle={styles.navBtnActive}
              unActiveStyle={styles.navBtn}
            >
              <span className={styles.navBtnLabel}>{link.label}</span>
            </NavLink>
          ))}
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
        {links.map((link) => (
          <NavLink
            key={link.href}
            href={link.href}
            activeStyle={styles.mobileNavItemActive}
            unActiveStyle={styles.mobileNavItem}
          >
            <div className={styles.mobileNavItemInner}>{link.label}</div>
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
