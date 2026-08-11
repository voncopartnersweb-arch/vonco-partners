'use client';

import { useState } from 'react';
import type { ComponentType } from 'react';
import { useTranslations } from 'next-intl';
import { chatStyles as styles } from '@/lib/uiStyles';
import Image from 'next/image';

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
        <Image
          src='/brand/vonco-mark-yellow.svg'
          width={30}
          height={30}
          alt=''
          aria-hidden='true'
          className='size-[30px]'
        />
      </button>
    </div>
  );
}
