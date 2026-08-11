'use client';

import { MoonStar, SunMedium, SunMoon } from 'lucide-react';
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

  const Icon =
    theme === 'light' ? SunMedium : theme === 'dark' ? MoonStar : SunMoon;
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
      <Icon
        aria-hidden='true'
        className='transition duration-300 group-hover:rotate-12'
        size={20}
        strokeWidth={2}
      />
    </button>
  );
}
