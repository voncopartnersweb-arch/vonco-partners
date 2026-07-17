'use client';

import { Monitor, Moon, Sun } from 'lucide-react';
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

  const Icon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Monitor;
  const label = `Theme: ${theme}. Activate to change`;

  return (
    <button
      type='button'
      onClick={cycleTheme}
      className='inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/8 text-white transition hover:-translate-y-0.5 hover:border-red-300/60 hover:bg-white/14 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:opacity-70'
      aria-label={label}
      title={label}
    >
      <Icon aria-hidden='true' size={19} strokeWidth={2.1} />
    </button>
  );
}
