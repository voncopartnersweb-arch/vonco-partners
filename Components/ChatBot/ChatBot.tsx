'use client';
import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Minus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import styles from './ChatBot.module.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
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
  console.log('ChatBot mounted');
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
          message: messages
            .concat(userMessage)
            .map((m) => m.content)
            .join('\n'),
        }), // відправляємо всю історію повідомлень
      });

      const data = await res.json();
      const replyMessage = data.received._output;
      console.log('ВІДПОВІДЬ ОТРИМАНА replyMessage:', replyMessage);
      const botMessage: Message = {
        role: 'assistant',
        content: replyMessage,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('ChatBot mounted');
  }, []);
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
              <span className={styles.headerTitle}>Vonco AI Assistant</span>
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
                <div className={styles.bubble}>{msg.content}</div>
              </div>
            ))}
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
              onClick={() => {
                console.log('Clicked');
              }}
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
