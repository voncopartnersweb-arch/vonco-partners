'use client';

import { useEffect, useState } from 'react';
import type { ComponentType } from 'react';

export default function ClientChatBotLazy() {
  const [ChatBot, setChatBot] = useState<null | ComponentType>(null);

  useEffect(() => {
    let isMounted = true;
    const timeout = window.setTimeout(() => {
      import('./ChatBot/ChatBot').then((mod) => {
        if (isMounted) {
          setChatBot(() => mod.default);
        }
      });
    }, 900);

    return () => {
      isMounted = false;
      window.clearTimeout(timeout);
    };
  }, []);

  if (!ChatBot) return null;
  return <ChatBot />;
}

