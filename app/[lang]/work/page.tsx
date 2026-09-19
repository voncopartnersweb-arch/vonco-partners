import { pageStyles as styles } from '@/lib/uiStyles';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import { COMPANY } from '@/data/company';
import { Metadata } from 'next';
import {
  buildDescription,
  buildLanguageAlternates,
  buildTitle,
  getLocalizedPath,
  getLocalizedUrl,
} from '@/lib/seo';
import JsonLd from '@/Components/JsonLd';
import SeoRelatedLinks from '@/Components/SeoRelatedLinks';
import OpenDriverFormButton from '@/Components/OpenDriverFormButton';
import {
  getArticles,
  getBlogLabels,
  isBlogLocale,
} from '@/data/blog';

type WorkPageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: WorkPageProps): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'WorkPage' });
  const seoTitle = buildTitle(t('seoTitle'));
  const seoDescription = buildDescription(
    t.has('seoDescription') ? t('seoDescription') : t('subtitle'),
  );

  return {
    title: seoTitle,
    description: seoDescription,
    alternates: {
      canonical: getLocalizedPath(lang, '/work'),
      languages: buildLanguageAlternates('/work'),
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: getLocalizedUrl(lang, '/work'),
      type: 'website',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: seoTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: ['/og-image.jpg'],
    },
  };
}

export default async function WorkWithUs({ params }: WorkPageProps) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'WorkPage' });
  const guideArticles = isBlogLocale(lang) ? getArticles(lang) : [];
  const guideLabels = isBlogLocale(lang) ? getBlogLabels(lang) : null;
  const faq = [
    {
      q: t('requirementsTitle'),
      a: [
        t('requirements.license'),
        t('requirements.residence'),
        t('requirements.language'),
        t('requirements.motivation'),
      ].join('; '),
    },
    {
      q: t('howToStartTitle'),
      a: [
        t('steps.apply'),
        t('steps.call'),
        t('steps.documents'),
        t('steps.start'),
      ].join('; '),
    },
    {
      q: t('benefitsTitle'),
      a: [
        t('benefits.earningsText'),
        t('benefits.scheduleText'),
        t('benefits.supportText'),
        t('benefits.legalText'),
      ].join(' '),
    },
  ];

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.hero}>
          <p className={styles.badge}>{t('badge')}</p>
          <h1 className={styles.title}>{t('title')}</h1>
          <p className={styles.subtitle}>{t('subtitle')}</p>
          <div className={styles.actions}>
            <OpenDriverFormButton className={styles.primaryBtn} />
          </div>
        </header>

        <section className={styles.block}>
          <h2 className={styles.sectionTitle}>{t('seoIntroTitle')}</h2>
          <p className={styles.text}>{t('seoIntroText')}</p>
        </section>

        <section className={styles.block}>
          <h2 className={styles.sectionTitle}>{t('processTitle')}</h2>
          <div className={styles.benefitsGrid}>
            <article className={styles.card}>
              <h3>{t('processStep1Title')}</h3>
              <p>{t('processStep1Text')}</p>
            </article>
            <article className={styles.card}>
              <h3>{t('processStep2Title')}</h3>
              <p>{t('processStep2Text')}</p>
            </article>
            <article className={styles.card}>
              <h3>{t('processStep3Title')}</h3>
              <p>{t('processStep3Text')}</p>
            </article>
            <article className={styles.card}>
              <h3>{t('processStep4Title')}</h3>
              <p>{t('processStep4Text')}</p>
            </article>
          </div>
        </section>

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

        <section className={styles.block}>
          <h2 className={styles.sectionTitle}>{t('fleetTitle')}</h2>
          <p className={styles.text}>{t('fleetText')}</p>
        </section>

        <section className={styles.block}>
          <h2 className={styles.sectionTitle}>{t('buyoutTitle')}</h2>
          <p className={styles.text}>{t('buyoutText')}</p>
        </section>

        <section className={styles.block}>
          <h2 className={styles.sectionTitle}>{t('coverageTitle')}</h2>
          <p className={styles.text}>{t('coverageText')}</p>
        </section>

        <SeoRelatedLinks lang={lang} current='work' />

        {guideLabels && guideArticles.length ? (
          <section className={styles.block}>
            <h2 className={styles.sectionTitle}>{guideLabels.blog}</h2>
            <ul className={styles.list}>
              {guideArticles.map((article) => (
                <li key={article.slug}>
                  <Link href={`/blog/${article.slug}`}>{article.title}</Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

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
            <OpenDriverFormButton className={styles.secondaryBtn} />
          </div>
        </section>
      </div>

      <JsonLd
        id='faq-work'
        type='application/ld+json'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faq.map((item) => ({
              '@type': 'Question',
              name: item.q,
              acceptedAnswer: { '@type': 'Answer', text: item.a },
            })),
          }),
        }}
      />
    </main>
  );
}
