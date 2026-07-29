import type { Metadata } from 'next';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Breadcrumbs from '@/Components/Breadcrumbs/Breadcrumbs';
import {
  DOCUMENT_GUIDE_LOCALES,
  DOCUMENT_GUIDE_SOURCES,
  getDocumentGuideContent,
} from '@/data/documentsContent';
import {
  buildDescription,
  buildLanguageAlternates,
  buildTitle,
  getLocalizedPath,
  getLocalizedUrl,
  SITE_URL,
} from '@/lib/seo';
import {
  buildBreadcrumbSchema,
  LOCAL_BUSINESS_ID,
} from '@/lib/schema';
import { pageStyles as styles } from '@/lib/uiStyles';
import SeoRelatedLinks from '@/Components/SeoRelatedLinks';

type PageProps = {
  params: Promise<{ lang: string }>;
};

const PAGE_PATH = '/documents-for-taxi-work';
const LAST_REVIEWED = '2026-07-29';

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const content = getDocumentGuideContent(lang);

  if (!content) {
    return {
      title: 'Driver documents',
      robots: { index: false, follow: false },
    };
  }

  const title = buildTitle(content.seoTitle);
  const description = buildDescription(content.seoDescription);

  return {
    title,
    description,
    alternates: {
      canonical: getLocalizedPath(lang, PAGE_PATH),
      languages: buildLanguageAlternates(PAGE_PATH, DOCUMENT_GUIDE_LOCALES),
    },
    openGraph: {
      title,
      description,
      url: getLocalizedUrl(lang, PAGE_PATH),
      type: 'article',
      modifiedTime: LAST_REVIEWED,
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.jpg'],
    },
  };
}

export default async function DocumentsForTaxiWorkPage({
  params,
}: PageProps) {
  const { lang } = await params;
  const content = getDocumentGuideContent(lang);

  if (!content) notFound();

  const tNav = await getTranslations({ locale: lang, namespace: 'Navbar' });
  const breadcrumbs = [
    { name: tNav('home'), url: getLocalizedUrl(lang) },
    {
      name: content.title,
      url: getLocalizedUrl(lang, PAGE_PATH),
    },
  ];

  return (
    <main className={styles.page}>
      <Breadcrumbs
        items={[
          { label: tNav('home'), href: '/' },
          { label: content.navLabel },
        ]}
      />

      <div className={styles.container}>
        <header className={styles.hero}>
          <p className={styles.eyebrow}>{content.badge}</p>
          <h1 className={styles.title}>{content.title}</h1>
          <p className={styles.subtitle}>{content.lead}</p>
          <div className={styles.reviewBox}>
            <strong>{content.reviewLabel}</strong>
            <p>{content.reviewText}</p>
          </div>
          <div className={styles.actions}>
            <Link
              href='/contacts#driver-application'
              className={styles.primary}
            >
              {content.ctaPrimary}
            </Link>
            <Link href='/cars' className={styles.secondary}>
              {content.ctaSecondary}
            </Link>
          </div>
        </header>

        {content.sections.map((section) => (
          <section className={styles.section} key={section.title}>
            <h2 className={styles.sectionTitle}>{section.title}</h2>
            <p className={`${styles.text} mb-5 max-w-4xl`}>{section.intro}</p>
            <ul className={styles.list}>
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{content.formatsTitle}</h2>
          <div className={styles.grid}>
            {content.formats.map((format) => (
              <article className={styles.card} key={format.title}>
                <h3 className={styles.cardTitle}>{format.title}</h3>
                <p className={styles.text}>{format.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{content.processTitle}</h2>
          <ol className={styles.steps}>
            {content.steps.map((step, index) => (
              <li className={styles.card} key={step.title}>
                <span className={styles.stepNumber}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <strong className={styles.cardTitle}>{step.title}</strong>
                <p className={styles.text}>{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{content.checklistTitle}</h2>
          <ul className={styles.list}>
            {content.checklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{content.faqTitle}</h2>
          <div className={styles.faq}>
            {content.faq.map((item) => (
              <article className={styles.card} key={item.q}>
                <h3 className={styles.cardTitle}>{item.q}</h3>
                <p className={styles.text}>{item.a}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{content.sourcesTitle}</h2>
          <ul className={styles.sourceList}>
            {DOCUMENT_GUIDE_SOURCES.map((source) => (
              <li key={source.href}>
                <a
                  href={source.href}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {source.name}
                </a>
              </li>
            ))}
          </ul>
          <p className={styles.disclaimer}>{content.disclaimer}</p>
        </section>

        <SeoRelatedLinks lang={lang} current='documents' />

        <section className={styles.cta}>
          <h2 className={styles.ctaTitle}>{content.ctaTitle}</h2>
          <p className={`${styles.text} max-w-3xl`}>{content.ctaText}</p>
          <div className={styles.actions}>
            <Link
              href='/contacts#driver-application'
              className={styles.primary}
            >
              {content.ctaPrimary}
            </Link>
            <Link href='/cars' className={styles.secondary}>
              {content.ctaSecondary}
            </Link>
          </div>
        </section>
      </div>

      <Script
        id={`documents-guide-schema-${lang}`}
        type='application/ld+json'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Article',
                headline: content.title,
                description: content.seoDescription,
                datePublished: LAST_REVIEWED,
                dateModified: LAST_REVIEWED,
                inLanguage: lang,
                mainEntityOfPage: getLocalizedUrl(lang, PAGE_PATH),
                image: `${SITE_URL}/og-image.jpg`,
                author: { '@id': LOCAL_BUSINESS_ID },
                reviewedBy: { '@id': LOCAL_BUSINESS_ID },
                publisher: { '@id': LOCAL_BUSINESS_ID },
                citation: DOCUMENT_GUIDE_SOURCES.map((source) => source.href),
              },
              buildBreadcrumbSchema(breadcrumbs),
              {
                '@type': 'FAQPage',
                mainEntity: content.faq.map((item) => ({
                  '@type': 'Question',
                  name: item.q,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: item.a,
                  },
                })),
              },
            ],
          }),
        }}
      />
    </main>
  );
}
