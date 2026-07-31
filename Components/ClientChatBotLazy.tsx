'use client';

import { useState } from 'react';
import type { ComponentType } from 'react';
import { useTranslations } from 'next-intl';
import { chatStyles as styles } from '@/lib/uiStyles';

type LazyChatBot = ComponentType<{ initiallyOpen?: boolean }>;

export default function ClientChatBotLazy() {
  const t = useTranslations('Chat');
  const [ChatBot, setChatBot] = useState<LazyChatBot | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  function loadChat() {
    if (ChatBot || isLoading) return;
    setIsLoading(true);
    window.dispatchEvent(
      new CustomEvent('vonco:floating-panel-open', { detail: 'chat' }),
    );

    void import('./ChatBot/ChatBot')
      .then((mod) => setChatBot(() => mod.default))
      .finally(() => setIsLoading(false));
  }

  if (ChatBot) return <ChatBot initiallyOpen />;

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.launcher}
        onClick={loadChat}
        aria-label={t('openChat')}
        aria-busy={isLoading}
        type='button'
      >
        <svg
          width='28'
          height='28'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          aria-hidden='true'
        >
          <path d='M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z' />
        </svg>
      </button>
    </div>
  );
}
