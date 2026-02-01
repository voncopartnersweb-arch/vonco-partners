'use client';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';
import Link from 'next/link';
import { useEffect } from 'react';
import NavLink from './ClientComponents/NavLink';
import { useTranslations } from 'next-intl';

export default function Header() {
  const pathName = usePathname();
  useEffect(() => {
    console.log('pathName', pathName);
  }, [pathName]);

  const t = useTranslations('HomePage');
  console.log('title', t('title'));

  return (
    <header className={styles.header}>
      <NavLink
        href='./'
        activeStyle={styles.active}
        unActiveStyle={styles.unActive}
      >
        <h3 className={styles.logo}>Vonco Partners</h3>
      </NavLink>
      <nav className={styles.nav}>
        {/* <NavLink
          href='/work'
          activeStyle={styles.active}
          unActiveStyle={styles.unActive}
        >
          <h3 className={styles.navBtn}>Work with us</h3>
        </NavLink>

        <NavLink
          href='/about'
          activeStyle={styles.active}
          unActiveStyle={styles.unActive}
        >
          <h3 className={styles.navBtn}>About us</h3>
        </NavLink> */}

        {/* <NavLink
          href='/cars'
          activeStyle={styles.active}
          unActiveStyle={styles.unActive}
        >
          <h3 className={styles.navBtn}>Our cars</h3>
        </NavLink> */}

        {/* <NavLink
          href='/contacts'
          activeStyle={styles.active}
          unActiveStyle={styles.unActive}
        >
          <h3 className={styles.navBtn}>Contacts</h3>
        </NavLink> */}
      </nav>
    </header>
  );
}
