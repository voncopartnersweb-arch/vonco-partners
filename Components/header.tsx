'use client';
import { Link } from '@/i18n/navigation';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import NavLink from './ClientComponents/NavLink';
import LocaleSwitcher from './LocaleSwitcher';
import { useLocale, useTranslations } from 'next-intl';
import ThemeToggle from './ThemeToggle';
import { getProgramsContent } from '@/data/programsContent';
import Image from 'next/image';

export default function Header() {
  const pathName = usePathname();
  const locale = useLocale();
  const t = useTranslations('Navbar');
  const tWork = useTranslations('WorkPage');
  const contactLabel = t.has('contacts') ? t('contacts') : 'Contacts';
  const aboutLabel = t.has('about') ? t('about') : 'About';
  const servicesLabel = t.has('services') ? t('services') : 'Services';
  const citiesLabel = t.has('cities') ? t('cities') : 'Cities';
  const programsLabel = getProgramsContent(locale).navLabel;
  const links = [
    { href: '/', label: t('home') },
    { href: '/cars', label: t('cars') },
    { href: '/cities', label: citiesLabel },
    { href: '/work', label: t('work') },
    { href: '/programs', label: programsLabel },
    { href: '/services', label: servicesLabel },
    { href: '/vykup-avto', label: tWork('buyoutTitle') },
    { href: '/contacts', label: contactLabel },
    { href: '/about', label: aboutLabel },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    // Route transitions should close the mobile menu immediately.
    // eslint-disable-next-line react-hooks/set-state-in-effect
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

  useEffect(() => {
    if (!isMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  return (
    <header className='sticky top-0 z-50 border-b border-line bg-surface/95 text-foreground shadow-[0_12px_40px_rgba(20,20,24,.08)] dark:shadow-[0_12px_40px_rgba(0,0,0,.26)]'>
      <div className='mx-auto flex min-h-[72px] w-full max-w-[1440px] items-center gap-3 px-4 sm:px-6'>
        <Link
          href='/'
          className='inline-flex min-h-11 shrink-0 items-center gap-2.5 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand'
        >
          <Image
            src='/vonco-logo.jpg'
            alt=''
            width={38}
            height={38}
            className='size-9 rounded-xl border border-line object-cover shadow-sm sm:size-10'
          />
          <span className='text-base font-black tracking-[-0.03em] text-foreground uppercase sm:text-lg'>
            Vonco <span className='text-brand'>Partners</span>
          </span>
        </Link>

        <nav
          className='ml-auto hidden items-center gap-1 xl:flex'
          aria-label={t('mainNavigation')}
        >
          {links.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              activeStyle='relative inline-flex min-h-11 items-center rounded-xl bg-red-600 px-3 text-sm font-bold text-white shadow-[0_8px_22px_rgba(215,25,32,.28)]'
              unActiveStyle='relative inline-flex min-h-11 items-center rounded-xl px-3 text-sm font-semibold text-muted transition hover:bg-brand-soft hover:text-foreground'
            >
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className='ml-auto hidden items-center gap-2 sm:flex xl:ml-2'>
          <LocaleSwitcher />
          <ThemeToggle />
        </div>

        <button
          ref={btnRef}
          className='ml-auto inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-line bg-surface-raised text-foreground shadow-sm transition hover:border-red-300/60 hover:bg-brand-soft hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:ml-0 xl:hidden'
          aria-label={t('toggleNavigation')}
          aria-expanded={isMenuOpen}
          aria-controls='mobile-navigation'
          onClick={() => setIsMenuOpen((s) => !s)}
          type='button'
        >
          <span className='relative block h-5 w-6' aria-hidden='true'>
            <span className={`absolute left-0 top-0.5 h-0.5 w-6 rounded bg-current transition ${isMenuOpen ? 'translate-y-2 rotate-45' : ''}`}></span>
            <span className={`absolute left-0 top-2.5 h-0.5 w-6 rounded bg-current transition ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`absolute left-0 top-[18px] h-0.5 w-6 rounded bg-current transition ${isMenuOpen ? '-translate-y-2 -rotate-45' : ''}`}></span>
          </span>
        </button>
      </div>

      <nav
        id='mobile-navigation'
        ref={menuRef}
        className={`fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto overscroll-contain border-t border-line bg-surface/98 px-4 pb-[calc(20px+env(safe-area-inset-bottom))] pt-5 text-foreground shadow-2xl backdrop-blur-xl transition duration-200 xl:hidden ${isMenuOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'}`}
        aria-label={t('mobileNavigation')}
      >
        {links.map((link) => (
          <NavLink
            key={link.href}
            href={link.href}
            activeStyle='mb-1 flex min-h-12 items-center rounded-2xl bg-red-600 px-4 font-bold text-white shadow-lg shadow-red-950/30'
            unActiveStyle='mb-1 flex min-h-12 items-center rounded-2xl px-4 font-semibold text-muted transition hover:bg-brand-soft hover:text-foreground'
          >
            <span>{link.label}</span>
          </NavLink>
        ))}
        <div className='mt-5 flex items-center gap-2 border-t border-line pt-5 sm:hidden'>
          <LocaleSwitcher />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
