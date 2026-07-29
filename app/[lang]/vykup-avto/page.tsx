import { Metadata } from 'next';
import Script from 'next/script';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Breadcrumbs from '@/Components/Breadcrumbs/Breadcrumbs';
import { COMPANY } from '@/data/company';
import { getBuyoutContent } from '@/data/buyoutContent';
import {
  buildDescription,
  buildLanguageAlternates,
  buildTitle,
  getLocalizedPath,
  getLocalizedUrl,
} from '@/lib/seo';
import { buildBreadcrumbSchema, LOCAL_BUSINESS_ID } from '@/lib/schema';
import { pageStyles as styles } from '@/lib/uiStyles';
import SeoRelatedLinks from '@/Components/SeoRelatedLinks';

type PageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const content = getBuyoutContent(lang);
  const tWork = await getTranslations({ locale: lang, namespace: 'WorkPage' });
  const tServices = await getTranslations({ locale: lang, namespace: 'ServicesPage' });
  const title = buildTitle(content?.seoTitle ?? tWork('buyoutTitle'));
  const description = buildDescription(
    content?.seoDescription ?? `${tWork('buyoutText')} ${tServices('faqBuyoutText')}`,
  );

  return {
    title,
    description,
    alternates: {
      canonical: getLocalizedPath(lang, '/vykup-avto'),
      languages: buildLanguageAlternates('/vykup-avto'),
    },
    openGraph: {
      title,
      description,
      url: getLocalizedUrl(lang, '/vykup-avto'),
      type: 'website',
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.jpg'],
    },
  };
}

export default async function BuyoutPage({ params }: PageProps) {
  const { lang } = await params;
  const tWork = await getTranslations({ locale: lang, namespace: 'WorkPage' });
  const tServices = await getTranslations({ locale: lang, namespace: 'ServicesPage' });
  const tAbout = await getTranslations({ locale: lang, namespace: 'AboutPage' });
  const tNav = await getTranslations({ locale: lang, namespace: 'Navbar' });
  const content = getBuyoutContent(lang) ?? {
    seoTitle: tWork('buyoutTitle'),
    seoDescription: `${tWork('buyoutText')} ${tServices('faqBuyoutText')}`,
    badge: tWork('badge'),
    title: tWork('buyoutTitle'),
    lead: tWork('buyoutText'),
    modelsTitle: tServices('seoIntroTitle'),
    modelsIntro: tServices('heroSubtitle'),
    ownCarTitle: tWork('title'),
    ownCarText: tWork('seoIntroText'),
    rentalTitle: tWork('fleetTitle'),
    rentalText: tWork('fleetText'),
    buyoutTitle: tWork('buyoutTitle'),
    buyoutText: tWork('buyoutText'),
    processTitle: tServices('processTitle'),
    steps: [1, 2, 3, 4].map((index) => ({
      title: tServices(`processStep${index}Title`),
      text: tServices(`processStep${index}Text`),
    })),
    paymentsTitle: tServices('faqBuyoutTitle'),
    paymentsText: tServices('faqBuyoutText'),
    costsTitle: tAbout('whatWeDoTitle'),
    rentalCostsTitle: tWork('fleetTitle'),
    rentalCostsText: tWork('fleetText'),
    buyoutCostsTitle: tWork('buyoutTitle'),
    buyoutCostsText: tAbout('whatWeDo.buyoutText'),
    contractTitle: tAbout('howWeWorkTitle'),
    contractText: tServices('faqBuyoutText'),
    contractPoints: [1, 2, 3].map((index) => tAbout(`howWeWork.step${index}`)),
    ctaTitle: tWork('ctaTitle'),
    ctaText: tWork('ctaText'),
    disclaimer: tServices('faqBuyoutText'),
  };

  const models = [
    {
      index: '01',
      title: content.ownCarTitle,
      text: content.ownCarText,
    },
    {
      index: '02',
      title: content.rentalTitle,
      text: content.rentalText,
    },
    {
      index: '03',
      title: content.buyoutTitle,
      text: content.buyoutText,
    },
  ];
  const faq = [
    { q: content.buyoutTitle, a: content.buyoutText },
    { q: content.paymentsTitle, a: content.paymentsText },
    {
      q: content.costsTitle,
      a: `${content.rentalCostsText} ${content.buyoutCostsText}`,
    },
    { q: content.contractTitle, a: content.contractText },
  ];
  const breadcrumbs = [
    { name: tNav('home'), url: getLocalizedUrl(lang) },
    { name: content.title, url: getLocalizedUrl(lang, '/vykup-avto') },
  ];

  return (
    <main className={styles.page}>
      <Breadcrumbs
        items={[
          { label: tNav('home'), href: '/' },
          { label: content.buyoutTitle },
        ]}
      />

      <div className={styles.container}>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>{content.badge}</p>
          <h1 className={styles.title}>{content.title}</h1>
          <p className={styles.subtitle}>{content.lead}</p>
          <div className={styles.actions}>
            <Link href='/contacts#driver-application' className={styles.primary}>
              {tWork('ctaSecondary')}
            </Link>
            <Link href='/cars' className={styles.secondary}>
              {tNav('cars')}
            </Link>
          </div>
        </section>

        <section className={styles.section} aria-labelledby='cooperation-models'>
          <p className={styles.eyebrow}>{COMPANY.name}</p>
          <h2 id='cooperation-models' className={styles.sectionTitle}>
            {content.modelsTitle}
          </h2>
          <p className={`${styles.sectionText} mb-6 max-w-4xl`}>
            {content.modelsIntro}
          </p>
          <div className={styles.grid}>
            {models.map((model) => (
              <article className={styles.card} key={model.index}>
                <span className='mb-5 inline-flex rounded-full bg-brand-soft px-3 py-1 text-xs font-black tracking-wider text-brand'>
                  {model.index}
                </span>
                <h3 className={styles.cardTitle}>{model.title}</h3>
                <p className={styles.text}>{model.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby='buyout-process'>
          <h2 id='buyout-process' className={styles.sectionTitle}>
            {content.processTitle}
          </h2>
          <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-5'>
            {content.steps.map((step, index) => (
              <article className={styles.card} key={step.title}>
                <span className='mb-4 block text-3xl font-black text-brand'>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className={styles.cardTitle}>{step.title}</h3>
                <p className={styles.text}>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className='mb-8 grid gap-6 lg:grid-cols-2'>
          <article className={styles.section}>
            <h2 className={styles.sectionTitle}>{content.paymentsTitle}</h2>
            <p className={styles.sectionText}>{content.paymentsText}</p>
          </article>
          <article className={styles.section}>
            <h2 className={styles.sectionTitle}>{content.costsTitle}</h2>
            <div className='grid gap-4'>
              <div className='rounded-2xl border border-line bg-surface-raised p-5'>
                <h3 className={styles.cardTitle}>{content.rentalCostsTitle}</h3>
                <p className={styles.text}>{content.rentalCostsText}</p>
              </div>
              <div className='rounded-2xl border border-red-300/25 bg-brand-soft p-5'>
                <h3 className={styles.cardTitle}>{content.buyoutCostsTitle}</h3>
                <p className={styles.text}>{content.buyoutCostsText}</p>
              </div>
            </div>
          </article>
        </section>

        <section className={styles.section} aria-labelledby='contract-details'>
          <div className='grid items-start gap-6 lg:grid-cols-[.8fr_1.2fr]'>
            <div>
              <p className={styles.eyebrow}>{content.buyoutTitle}</p>
              <h2 id='contract-details' className={styles.sectionTitle}>
                {content.contractTitle}
              </h2>
              <p className={styles.sectionText}>{content.contractText}</p>
            </div>
            <ul className={styles.list}>
              {content.contractPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.section} aria-labelledby='buyout-faq'>
          <h2 id='buyout-faq' className={styles.sectionTitle}>FAQ</h2>
          <div className={styles.faq}>
            {faq.map((item) => (
              <article className={styles.card} key={item.q}>
                <h3 className={styles.cardTitle}>{item.q}</h3>
                <p className={styles.text}>{item.a}</p>
              </article>
            ))}
          </div>
        </section>

        <SeoRelatedLinks lang={lang} current='buyout' />

        <section className={styles.cta}>
          <h2 className={styles.ctaTitle}>{content.ctaTitle}</h2>
          <p className={`${styles.text} max-w-3xl`}>{content.ctaText}</p>
          <div className={styles.actions}>
            <Link href='/contacts#driver-application' className={styles.primary}>
              {tWork('ctaSecondary')}
            </Link>
            <Link href='/cars' className={styles.secondary}>
              {tNav('cars')}
            </Link>
          </div>
          <p className={styles.disclaimer}>{content.disclaimer}</p>
        </section>
      </div>

      <Script
        id={`buyout-schema-${lang}`}
        type='application/ld+json'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Service',
                name: content.buyoutTitle,
                description: content.seoDescription,
                url: getLocalizedUrl(lang, '/vykup-avto'),
                provider: { '@id': LOCAL_BUSINESS_ID },
              },
              buildBreadcrumbSchema(breadcrumbs),
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
