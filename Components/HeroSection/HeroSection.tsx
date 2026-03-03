import styles from './HeroSection.module.css';
import { getTranslations } from 'next-intl/server';

export default async function HeroSection() {
  const t = await getTranslations('Hero');

  return (
    <section className={styles.hero}>
      <div className={styles.overlay}></div>

      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>{t('title')}</h1>
          <p className={styles.description}>{t('subtitle')}</p>
        </div>
      </div>
    </section>
  );
}
