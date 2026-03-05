import styles from './WorkWithUs.module.css';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import { COMPANY } from '@/data/company';
import { Metadata } from 'next';
import { buildLanguageAlternates } from '@/lib/seo';

type WorkPageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: WorkPageProps): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'WorkPage' });

  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: {
      canonical: `/${lang}/work`,
      languages: buildLanguageAlternates('/work'),
    },
  };
}

export default async function WorkWithUs() {
  const t = await getTranslations('WorkPage');

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.hero}>
          <p className={styles.badge}>{t('badge')}</p>
          <h1 className={styles.title}>{t('title')}</h1>
          <p className={styles.subtitle}>{t('subtitle')}</p>
        </header>

        <section className={styles.block}>
          <h2 className={styles.sectionTitle}>{t('aboutTitle')}</h2>
          <p className={styles.text}>{t('aboutText')}</p>
        </section>

        <section className={styles.block}>
          <h2 className={styles.sectionTitle}>{t('benefitsTitle')}</h2>
          <div className={styles.benefitsGrid}>
            <article className={styles.card}>
              <h3>{t('benefits.earningsTitle')}</h3>
              <p>{t('benefits.earningsText')}</p>
            </article>
            <article className={styles.card}>
              <h3>{t('benefits.scheduleTitle')}</h3>
              <p>{t('benefits.scheduleText')}</p>
            </article>
            <article className={styles.card}>
              <h3>{t('benefits.supportTitle')}</h3>
              <p>{t('benefits.supportText')}</p>
            </article>
            <article className={styles.card}>
              <h3>{t('benefits.legalTitle')}</h3>
              <p>{t('benefits.legalText')}</p>
            </article>
          </div>
        </section>

        <section className={styles.block}>
          <h2 className={styles.sectionTitle}>{t('requirementsTitle')}</h2>
          <p className={styles.text}>{t('requirementsIntro')}</p>
          <ul className={styles.list}>
            <li>{t('requirements.license')}</li>
            <li>{t('requirements.residence')}</li>
            <li>{t('requirements.language')}</li>
            <li>{t('requirements.motivation')}</li>
          </ul>
        </section>

        <section className={styles.block}>
          <h2 className={styles.sectionTitle}>{t('howToStartTitle')}</h2>
          <ol className={styles.steps}>
            <li>{t('steps.apply')}</li>
            <li>{t('steps.call')}</li>
            <li>{t('steps.documents')}</li>
            <li>{t('steps.start')}</li>
          </ol>
        </section>

        <section className={styles.cta}>
          <h2>{t('ctaTitle')}</h2>
          <p>{t('ctaText')}</p>
          <div className={styles.actions}>
            <a
              href={`tel:${COMPANY.phones.katowiceRegion.tel}`}
              className={styles.primaryBtn}
            >
              {t('ctaPrimary')}
            </a>
            <Link href='/contacts' className={styles.secondaryBtn}>
              {t('ctaSecondary')}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
