'use client';

import { useEffect, useState } from 'react';

type Theme = 'system' | 'light' | 'dark';

const themes: Theme[] = ['system', 'light', 'dark'];

function applyTheme(theme: Theme) {
  const dark =
    theme === 'dark' ||
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.classList.toggle('dark', dark);
  document.documentElement.dataset.theme = theme;
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('system');

  useEffect(() => {
    const stored = localStorage.getItem('vonco-theme');
    const initial = themes.includes(stored as Theme) ? (stored as Theme) : 'system';
    applyTheme(initial);
    const updateState = window.setTimeout(() => setTheme(initial), 0);
    return () => window.clearTimeout(updateState);

  }, []);

  useEffect(() => {
    if (theme !== 'system') return;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const syncSystemTheme = () => applyTheme('system');
    media.addEventListener('change', syncSystemTheme);
    return () => media.removeEventListener('change', syncSystemTheme);
  }, [theme]);

  const cycleTheme = () => {
    const next = themes[(themes.indexOf(theme) + 1) % themes.length];
    setTheme(next);
    localStorage.setItem('vonco-theme', next);
    applyTheme(next);
  };

  const label = `Theme: ${theme}. Activate to change`;

  return (
    <button
      type='button'
      onClick={cycleTheme}
      className='group relative inline-flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-line bg-surface-raised text-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-brand/60 hover:bg-brand-soft hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:opacity-70'
      aria-label={label}
      title={label}
    >
      <span
        className='absolute right-1.5 top-1.5 size-1.5 rounded-full bg-brand opacity-80 transition group-hover:scale-125'
        aria-hidden='true'
      />
      <svg
        aria-hidden='true'
        className='size-5 transition duration-300 group-hover:rotate-12'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        {theme === 'light' ? (
          <>
            <circle cx='12' cy='12' r='4' />
            <path d='M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41' />
          </>
        ) : theme === 'dark' ? (
          <path d='M20.5 14.3A8.5 8.5 0 0 1 9.7 3.5a8.5 8.5 0 1 0 10.8 10.8Z' />
        ) : (
          <>
            <rect x='3' y='4' width='18' height='14' rx='2' />
            <path d='M8 22h8M12 18v4' />
            <path d='M8 10a4 4 0 0 0 6.8 2.8A4 4 0 1 1 8 10Z' />
          </>
        )}
      </svg>
    </button>
  );
}
