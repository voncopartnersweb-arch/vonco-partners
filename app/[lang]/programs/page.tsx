import type { Metadata } from 'next';
import Script from 'next/script';
import { getTranslations } from 'next-intl/server';
import Breadcrumbs from '@/Components/Breadcrumbs/Breadcrumbs';
import { Link } from '@/i18n/navigation';
import { COMPANY } from '@/data/company';
import { getProgramCampaignsContent } from '@/data/programCampaigns';
import { getProgramsContent } from '@/data/programsContent';
import {
  buildDescription,
  buildLanguageAlternates,
  buildTitle,
  getLocalizedPath,
  getLocalizedUrl,
} from '@/lib/seo';
import { buildBreadcrumbSchema, LOCAL_BUSINESS_ID } from '@/lib/schema';
import { pageStyles as styles } from '@/lib/uiStyles';

type PageProps = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const content = getProgramsContent(lang);
  const campaigns = getProgramCampaignsContent(lang);
  const title = buildTitle(content.seoTitle);
  const description = buildDescription(campaigns.seoDescription);

  return {
    title,
    description,
    alternates: {
      canonical: getLocalizedPath(lang, '/programs'),
      languages: buildLanguageAlternates('/programs'),
    },
    openGraph: {
      title,
      description,
      url: getLocalizedUrl(lang, '/programs'),
      type: 'website',
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: ['/og-image.jpg'] },
  };
}

export default async function ProgramsPage({ params }: PageProps) {
  const { lang } = await params;
  const content = getProgramsContent(lang);
  const campaigns = getProgramCampaignsContent(lang);
  const tNav = await getTranslations({ locale: lang, namespace: 'Navbar' });
  const tWork = await getTranslations({ locale: lang, namespace: 'WorkPage' });
  const faq = [
    { q: campaigns.statusTitle, a: campaigns.statusText },
    { q: content.howTitle, a: content.howSteps.join(' ') },
    { q: content.sourcesTitle, a: content.sourcesText },
  ];
  const sourcePost =
    'https://www.facebook.com/photo/?fbid=931499813175274&set=pb.100089457913783.-2207520000';

  return (
    <main className={styles.page}>
      <Breadcrumbs
        items={[
          { label: tNav('home'), href: '/' },
          { label: content.navLabel },
        ]}
      />
      <div className={styles.container}>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>{content.badge}</p>
          <h1 className={styles.title}>{content.title}</h1>
          <p className={styles.subtitle}>{content.lead}</p>
          <div className={styles.actions}>
            <Link href='/contacts' className={styles.primary}>{tWork('ctaSecondary')}</Link>
            <Link href='/work' className={styles.secondary}>{tNav('work')}</Link>
          </div>
        </section>

        <section
          className='relative overflow-hidden rounded-[2rem] border border-brand/25 bg-gradient-to-br from-brand/15 via-surface to-surface p-6 shadow-[0_24px_70px_-45px_rgba(22,163,74,.65)] sm:p-8 lg:p-10'
          aria-labelledby='current-referral-program'
        >
          <div className='pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-brand/15 blur-3xl' aria-hidden='true' />
          <div className='relative grid items-center gap-8 lg:grid-cols-[.7fr_1.3fr]'>
            <div>
              <span className='inline-flex rounded-full bg-brand px-4 py-2 text-sm font-bold text-white'>
                {campaigns.currentLabel}
              </span>
              <p className='mt-5 text-5xl font-black tracking-[-.06em] text-brand sm:text-6xl lg:text-7xl'>
                {campaigns.currentAmount}
              </p>
            </div>
            <div>
              <h2 id='current-referral-program' className={styles.sectionTitle}>
                {campaigns.currentTitle}
              </h2>
              <p className={`${styles.sectionText} mt-4`}>{campaigns.currentText}</p>
              <p className='mt-4 font-semibold text-foreground'>{campaigns.currentNote}</p>
              <div className={`${styles.actions} mt-6`}>
                <Link href='/contacts' className={styles.primary}>{tWork('ctaSecondary')}</Link>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby='fuel-program'>
          <div className='grid items-start gap-6 lg:grid-cols-[.85fr_1.15fr]'>
            <div>
              <span className='mb-4 inline-flex rounded-full bg-brand px-3 py-1 text-xs font-bold uppercase tracking-[.08em] text-white'>
                {campaigns.fuelArchiveLabel}
              </span>
              <span className={`${styles.badge} block w-fit`}>8%</span>
              <h2 id='fuel-program' className={styles.sectionTitle}>{content.fuelTitle}</h2>
              <p className={styles.sectionText}>{content.fuelText}</p>
              <p className={styles.lastUpdated}>{content.publishedLabel}</p>
            </div>
            <ul className={styles.list}>
              {content.fuelBenefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
            </ul>
          </div>
        </section>

        <aside className={styles.noticeBlock} aria-labelledby='program-availability'>
          <h2 id='program-availability' className={styles.noticeTitle}>{campaigns.statusTitle}</h2>
          <p className={styles.noticeText}>{campaigns.statusText}</p>
        </aside>

        <section className={styles.section} aria-labelledby='previous-programs'>
          <h2 id='previous-programs' className={styles.sectionTitle}>{campaigns.varietyTitle}</h2>
          <p className={`${styles.sectionText} mb-6 max-w-4xl`}>{campaigns.varietyIntro}</p>
          <div className={styles.grid}>
            {campaigns.previousPrograms.map((program) => (
              <article className={`${styles.card} flex h-full flex-col`} key={program.title}>
                <span className='mb-5 w-fit rounded-full border border-border bg-surface-muted px-3 py-1 text-xs font-bold uppercase tracking-[.08em] text-muted'>
                  {campaigns.previousLabel}
                </span>
                <h3 className={styles.cardTitle}>{program.title}</h3>
                <p className={styles.text}>{program.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby='driver-support-programs'>
          <h2 id='driver-support-programs' className={styles.sectionTitle}>{content.supportTitle}</h2>
          <p className={`${styles.sectionText} mb-6 max-w-4xl`}>{content.supportIntro}</p>
          <div className={styles.grid}>
            {content.supportCards.map((card) => (
              <article className={styles.card} key={card.title}>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.text}>{card.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby='program-steps'>
          <h2 id='program-steps' className={styles.sectionTitle}>{content.howTitle}</h2>
          <div className={styles.grid}>
            {content.howSteps.map((step, index) => (
              <article className={styles.card} key={step}>
                <span className='mb-4 block text-3xl font-black text-brand/35'>{String(index + 1).padStart(2, '0')}</span>
                <p className={styles.text}>{step}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby='program-sources'>
          <h2 id='program-sources' className={styles.sectionTitle}>{content.sourcesTitle}</h2>
          <p className={`${styles.sectionText} max-w-4xl`}>{content.sourcesText}</p>
          <div className={styles.actions}>
            <a href={sourcePost} target='_blank' rel='noopener noreferrer' className={styles.secondaryBtn}>Facebook — 26.03.2026</a>
            <a href={COMPANY.social.instagram} target='_blank' rel='noopener noreferrer' className={styles.secondaryBtn}>Instagram</a>
            <a href={COMPANY.social.facebook} target='_blank' rel='noopener noreferrer' className={styles.secondaryBtn}>Facebook</a>
          </div>
        </section>

        <section className={styles.cta}>
          <h2 className={styles.ctaTitle}>{content.ctaTitle}</h2>
          <p className={`${styles.text} max-w-3xl`}>{content.ctaText}</p>
          <div className={styles.actions}>
            <Link href='/contacts' className={styles.primary}>{tWork('ctaSecondary')}</Link>
          </div>
        </section>
      </div>

      <Script
        id={`programs-schema-${lang}`}
        type='application/ld+json'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Service',
                name: content.title,
                description: campaigns.seoDescription,
                url: getLocalizedUrl(lang, '/programs'),
                provider: { '@id': LOCAL_BUSINESS_ID },
              },
              buildBreadcrumbSchema([
                { name: tNav('home'), url: getLocalizedUrl(lang) },
                { name: content.navLabel, url: getLocalizedUrl(lang, '/programs') },
              ]),
              {
                '@type': 'FAQPage',
                mainEntity: faq.map((item) => ({
                  '@type': 'Question',
                  name: item.q,
                  acceptedAnswer: { '@type': 'Answer', text: item.a },
                })),
              },
            ],
          }),
        }}
      />
    </main>
  );
}
