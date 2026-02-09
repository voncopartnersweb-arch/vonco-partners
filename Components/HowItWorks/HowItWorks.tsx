import { useTranslations } from 'next-intl';
import styles from './HowItWorks.module.css';

const HowItWorks = () => {
  const t = useTranslations('Steps');

  const steps = [
    {
      id: 1,
      icon: (
        <svg
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
        >
          <path d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2zM9 8h.01' />
        </svg>
      ),
    },
    {
      id: 2,
      icon: (
        <svg
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
        >
          <path d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' />
        </svg>
      ),
    },
    {
      id: 3,
      icon: (
        <svg
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
        >
          <path d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2z' />
          <path d='M5 7h14M5 11h14' opacity='0.5' />
        </svg>
      ),
    },
    {
      id: 4,
      icon: (
        <svg
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
        >
          <path d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' />
          <path d='M17 17h.01M17 20h.01M20 20h.01' />
        </svg>
      ),
    },
  ];

  return (
    <section className={styles.container}>
      <div className={styles.grid}>
        {steps.map((step) => (
          <div key={step.id} className={styles.stepCard}>
            <div className={styles.iconWrapper}>{step.icon}</div>
            <div className={styles.content}>
              <h2 className={styles.title}>{t(`step${step.id}.title`)}</h2>
              <p className={styles.description}>{t(`step${step.id}.desc`)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
