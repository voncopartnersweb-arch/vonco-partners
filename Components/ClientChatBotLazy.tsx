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
        <span
          aria-hidden='true'
          className="size-[30px] bg-[url('/brand/vonco-mark-yellow.svg')] bg-contain bg-center bg-no-repeat"
        />
      </button>
    </div>
  );
}
