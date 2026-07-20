'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import {
  Message,
  MessageContent,
  MessageResponse,
} from '@/Components/ai-elements/message';
import { MessageCircle, Minus, RotateCcw, Send, Square, Trash2 } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useMemo, useRef, useState } from 'react';

import { chatStyles as styles } from '@/lib/uiStyles';

const MAX_MESSAGE_LENGTH = 1500;
export default function ChatBot() {
  const t = useTranslations('Chat');
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: '/api/chat',
        prepareSendMessagesRequest: ({ messages }) => ({
          body: {
            messages,
            locale,
            currentPath: window.location.pathname,
          },
        }),
      }),
    [locale],
  );

  const {
    messages,
    sendMessage,
    setMessages,
    regenerate,
    stop,
    status,
    error,
    clearError,
  } = useChat({ transport, experimental_throttle: 50 });

  const isResponding = status === 'submitted' || status === 'streaming';
  const suggestions = t.raw('suggestions') as string[];
  const lastMessageId = messages.at(-1)?.id;

  useEffect(() => {
    const element = scrollRef.current;
    if (element) element.scrollTop = element.scrollHeight;
  }, [messages, status, isOpen]);

  async function submitMessage(text: string) {
    const value = text.trim().slice(0, MAX_MESSAGE_LENGTH);
    if (!value || isResponding) return;
    clearError();
    setInput('');
    await sendMessage({ text: value });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void submitMessage(input);
  }

  function clearConversation() {
    stop();
    clearError();
    setMessages([]);
    setInput('');
  }

  return (
    <div className={styles.wrapper}>
      {!isOpen && (
        <button
          className={styles.launcher}
          onClick={() => setIsOpen(true)}
          aria-label={t('openChat')}
          type='button'
        >
          <MessageCircle size={28} aria-hidden='true' />
        </button>
      )}

      {isOpen && (
        <section
          className={styles.chatWindow}
          role='dialog'
          aria-label={t('headerTitle')}
        >
          <header className={styles.header}>
            <div className={styles.headerInfo}>
              <div className={styles.statusDot} aria-hidden='true' />
              <span className={styles.headerTitle}>{t('headerTitle')}</span>
            </div>
            <div className={styles.headerActions}>
              <button
                onClick={clearConversation}
                className={styles.iconBtn}
                aria-label={t('clear')}
                title={t('clear')}
                type='button'
              >
                <Trash2 size={18} aria-hidden='true' />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className={styles.iconBtn}
                aria-label={t('minimize')}
                type='button'
              >
                <Minus size={20} aria-hidden='true' />
              </button>
            </div>
          </header>

          <div
            className={styles.messagesArea}
            ref={scrollRef}
            aria-live='polite'
            aria-busy={isResponding}
          >
            <div className={styles.welcomeMsg}>{t('welcome')}</div>

            {messages.length === 0 && (
              <div className={styles.suggestions}>
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type='button'
                    className={styles.suggestion}
                    onClick={() => void submitMessage(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {messages.map((message) => (
              <Message key={message.id} from={message.role} className='group'>
                <MessageContent>
                  {message.parts.map((part, index) =>
                    part.type === 'text' ? (
                      <MessageResponse
                        key={`${message.id}-text-${index}`}
                        isAnimating={
                          status === 'streaming' && message.id === lastMessageId
                        }
                      >
                        {part.text}
                      </MessageResponse>
                    ) : null,
                  )}
                </MessageContent>
              </Message>
            ))}

            {status === 'submitted' && (
              <Message from='assistant' className='group'>
                <MessageContent className={styles.typingBubble}>
                  <span className='sr-only'>{t('loading')}</span>
                  <span className={styles.typingDots} aria-hidden='true'>
                    <span />
                    <span />
                    <span />
                  </span>
                </MessageContent>
              </Message>
            )}

            {error && (
              <div className={styles.error} role='alert'>
                <span>{t('error')}</span>
                <button type='button' onClick={() => void regenerate()}>
                  <RotateCcw size={16} aria-hidden='true' />
                  {t('retry')}
                </button>
              </div>
            )}
          </div>

          <form className={styles.inputArea} onSubmit={handleSubmit}>
            <input
              type='text'
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={t('placeholder')}
              className={styles.input}
              maxLength={MAX_MESSAGE_LENGTH}
              aria-label={t('placeholder')}
            />
            {isResponding ? (
              <button
                type='button'
                className={styles.sendBtn}
                onClick={stop}
                aria-label={t('stop')}
              >
                <Square size={18} aria-hidden='true' />
              </button>
            ) : (
              <button
                type='submit'
                className={styles.sendBtn}
                disabled={!input.trim()}
                aria-label={t('send')}
              >
                <Send size={20} aria-hidden='true' />
              </button>
            )}
          </form>
        </section>
      )}
    </div>
  );
}
