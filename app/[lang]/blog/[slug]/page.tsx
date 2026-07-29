import { Metadata } from 'next';
import Script from 'next/script';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import Breadcrumbs from '@/Components/Breadcrumbs/Breadcrumbs';
import {
  getArticle,
  getArticleLocales,
  getArticleSlugs,
  getBlogLabels,
  isBlogLocale,
} from '@/data/blog';
import {
  buildDescription,
  buildLanguageAlternates,
  buildTitle,
  getLocalizedPath,
  getLocalizedUrl,
  SITE_URL,
} from '@/lib/seo';
import { buildBreadcrumbSchema, LOCAL_BUSINESS_ID } from '@/lib/schema';
import { pageStyles as styles } from '@/lib/uiStyles';
import {
  DOCUMENT_GUIDE_SOURCES,
  getDocumentGuideContent,
} from '@/data/documentsContent';

type PageProps = { params: Promise<{ lang: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isBlogLocale(lang)) {
    return { title: 'Article', robots: { index: false, follow: false } };
  }
  const article = getArticle(lang, slug);
  if (!article) return { title: 'Article', robots: { index: false, follow: false } };
  const title = buildTitle(article.seoTitle ?? article.title);
  const description = buildDescription(article.description);
  const articleLocales = getArticleLocales(slug);

  return {
    title,
    description,
    alternates: {
      canonical: getLocalizedPath(lang, `/blog/${slug}`),
      languages: buildLanguageAlternates(`/blog/${slug}`, articleLocales),
    },
    openGraph: {
      title,
      description,
      url: getLocalizedUrl(lang, `/blog/${slug}`),
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: title }],
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { lang, slug } = await params;
  if (!isBlogLocale(lang)) notFound();
  const article = getArticle(lang, slug);
  if (!article) notFound();
  const labels = getBlogLabels(lang);
  const documentsContent = getDocumentGuideContent(lang);
  const tNav = await getTranslations({ locale: lang, namespace: 'Navbar' });
  const breadcrumbs = [
    { name: tNav('home'), url: getLocalizedUrl(lang) },
    { name: labels.blog, url: getLocalizedUrl(lang, '/blog') },
    { name: article.title, url: getLocalizedUrl(lang, `/blog/${slug}`) },
  ];
  const reviewedAt = article.reviewedAt ?? article.updatedAt;

  return (
    <main className={styles.page}>
      <Breadcrumbs
        items={[
          { label: tNav('home'), href: '/' },
          { label: labels.blog, href: '/blog' },
          { label: article.title },
        ]}
      />
      <article className={styles.article}>
        <header>
          <p className={styles.meta}>{article.publishedAt} · {article.readTime}</p>
          <h1>{article.title}</h1>
          <p className={styles.lead}>{article.description}</p>
          <div className={styles.reviewBox}>
            <strong>{labels.reviewedBy}</strong>
            <p>
              {labels.lastReviewed}:{' '}
              <time dateTime={reviewedAt}>{reviewedAt}</time>
            </p>
          </div>
        </header>
        {article.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </section>
        ))}
        {article.relatedLinks?.length ? (
          <section>
            <h2>{labels.related}</h2>
            <ul>
              {article.relatedLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
        <section>
          <h2>{labels.sources}</h2>
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
        </section>
        <div className={styles.cta}>
          <Link href='/contacts#driver-application'>{tNav('contacts')} →</Link>
          {documentsContent ? (
            <Link href='/documents-for-taxi-work'>
              {documentsContent.navLabel} →
            </Link>
          ) : null}
          <Link href='/blog'>{labels.back}</Link>
        </div>
      </article>
      <Script
        id={`article-schema-${lang}-${slug}`}
        type='application/ld+json'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Article',
                headline: article.title,
                description: article.description,
                datePublished: article.publishedAt,
                dateModified: article.updatedAt,
                inLanguage: lang,
                mainEntityOfPage: getLocalizedUrl(lang, `/blog/${slug}`),
                image: `${SITE_URL}/og-image.jpg`,
                author: { '@id': LOCAL_BUSINESS_ID },
                reviewedBy: { '@id': LOCAL_BUSINESS_ID },
                publisher: { '@id': LOCAL_BUSINESS_ID },
                citation: DOCUMENT_GUIDE_SOURCES.map((source) => source.href),
              },
              buildBreadcrumbSchema(breadcrumbs),
            ],
          }),
        }}
      />
    </main>
  );
}
