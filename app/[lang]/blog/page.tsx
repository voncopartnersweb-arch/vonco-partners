import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import Breadcrumbs from '@/Components/Breadcrumbs/Breadcrumbs';
import {
  BLOG_LOCALES,
  getArticles,
  getBlogLabels,
  isBlogLocale,
} from '@/data/blog';
import {
  buildDescription,
  buildLanguageAlternates,
  buildTitle,
  getLocalizedPath,
  getLocalizedUrl,
} from '@/lib/seo';
import { pageStyles as styles } from '@/lib/uiStyles';

type PageProps = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isBlogLocale(lang)) {
    return { title: 'Blog', robots: { index: false, follow: false } };
  }
  const labels = getBlogLabels(lang);
  const tMeta = await getTranslations({ locale: lang, namespace: 'Metadata' });
  const title = buildTitle(labels.blog);
  const description = buildDescription(tMeta('description'));

  return {
    title,
    description,
    alternates: {
      canonical: getLocalizedPath(lang, '/blog'),
      languages: buildLanguageAlternates('/blog', BLOG_LOCALES),
    },
    openGraph: {
      title,
      description,
      url: getLocalizedUrl(lang, '/blog'),
      type: 'website',
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: title }],
    },
  };
}

export default async function BlogPage({ params }: PageProps) {
  const { lang } = await params;
  if (!isBlogLocale(lang)) notFound();
  const labels = getBlogLabels(lang);
  const articles = getArticles(lang);
  const tNav = await getTranslations({ locale: lang, namespace: 'Navbar' });

  return (
    <main className={styles.page}>
      <Breadcrumbs
        items={[
          { label: tNav('home'), href: '/' },
          { label: labels.blog },
        ]}
      />
      <header className={styles.hero}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>Vonco Partners</p>
          <h1>{labels.blog}</h1>
        </div>
      </header>
      <section className={styles.container}>
        <div className={styles.grid}>
          {articles.map((article) => (
            <article className={styles.card} key={article.slug}>
              <p className={styles.meta}>{article.publishedAt} · {article.readTime}</p>
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              <Link href={`/blog/${article.slug}`}>{labels.read} →</Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
