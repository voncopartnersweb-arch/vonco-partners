'use client';
import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Minus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import styles from './ChatBot.module.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const MARKDOWN_LINK_REGEX = /\[([^\]]+)\]\(([^)]+)\)/g;
const PHONE_REGEX = /(\+?\d[\d\s().-]{7,}\d)/g;

function getSafeHref(href: string) {
  if (
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('/') ||
    href.startsWith('tel:')
  ) {
    return href;
  }
  return '#';
}

function toTelHref(phone: string) {
  const normalized = phone.replace(/[^\d+]/g, '');
  return `tel:${normalized}`;
}

function renderInlineWithLinks(text: string) {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  MARKDOWN_LINK_REGEX.lastIndex = 0;

  while ((match = MARKDOWN_LINK_REGEX.exec(text)) !== null) {
    const [full, label, href] = match;
    const index = match.index;

    if (index > lastIndex) {
      nodes.push(renderPhones(text.slice(lastIndex, index)));
    }

    const safeHref = getSafeHref(href.trim());
    const isExternal =
      safeHref.startsWith('http://') || safeHref.startsWith('https://');

    nodes.push(
      <a
        key={`md-${index}-${href}`}
        href={safeHref}
        className={styles.messageLink}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
      >
        {label}
      </a>,
    );

    lastIndex = index + full.length;
  }

  if (lastIndex < text.length) {
    nodes.push(renderPhones(text.slice(lastIndex)));
  }

  return nodes;
}

function renderPhones(text: string) {
  const chunks = text.split(PHONE_REGEX);
  const phoneChunkRegex = /^\+?\d[\d\s().-]{7,}\d$/;

  return chunks.map((chunk, index) => {
    if (phoneChunkRegex.test(chunk)) {
      return (
        <a
          key={`ph-${index}-${chunk}`}
          href={toTelHref(chunk)}
          className={styles.messageLink}
        >
          {chunk}
        </a>
      );
    }
    return <span key={`tx-${index}`}>{chunk}</span>;
  });
}

function renderMessageContent(content: string) {
  const lines = content.split('\n');
  return lines.map((line, index) => (
    <span key={`line-${index}`}>
      {renderInlineWithLinks(line)}
      {index < lines.length - 1 ? <br /> : null}
    </span>
  ));
}

export default function ChatBot() {
  const t = useTranslations('Chat');
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  // Автоматичний скрол до останнього повідомлення
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.content,
          history: messages,
        }),
      });

      if (!res.ok) {
        throw new Error('Chat API error');
      }

      const data = await res.json();

      const botMessage: Message = {
        role: 'assistant',
        content: data.text || t('botResponsePlaceholder'),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: t('botResponsePlaceholder') },
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={styles.wrapper}>
      {/* Кнопка розгортання (Trigger) */}
      {!isOpen && (
        <button
          className={styles.launcher}
          onClick={toggleChat}
          aria-label='Open chat'
        >
          <MessageCircle size={28} />
        </button>
      )}

      {/* Вікно чату */}
      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.header}>
            <div className={styles.headerInfo}>
              <div className={styles.statusDot} />
              <span className={styles.headerTitle}>{t('headerTitle')}</span>
            </div>
            <div className={styles.headerActions}>
              <button onClick={toggleChat} className={styles.iconBtn}>
                <Minus size={20} />
              </button>
              <button onClick={toggleChat} className={styles.iconBtn}>
                <X size={20} />
              </button>
            </div>
          </div>

          <div className={styles.messagesArea} ref={scrollRef}>
            <div className={styles.welcomeMsg}>{t('welcome')}</div>

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`${styles.message} ${styles[msg.role]}`}
              >
                <div className={styles.bubble}>
                  {renderMessageContent(msg.content)}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className={`${styles.message} ${styles.assistant}`}>
                <div className={`${styles.bubble} ${styles.typingBubble}`}>
                  <span className={styles.typingText}></span>
                  <span className={styles.typingDots} aria-hidden='true'>
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                </div>
              </div>
            )}
          </div>

          <form className={styles.inputArea} onSubmit={handleSendMessage}>
            <input
              type='text'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('placeholder')}
              className={styles.input}
            />
            <button
              type='submit'
              className={styles.sendBtn}
              disabled={isLoading || !input.trim()}
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
