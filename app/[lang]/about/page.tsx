import type { Metadata } from 'next';
import JsonLd from '@/Components/JsonLd';
import { getTranslations } from 'next-intl/server';
import Breadcrumbs from '@/Components/Breadcrumbs/Breadcrumbs';
import { pageStyles as styles } from '@/lib/uiStyles';
import { COMPANY, COMPANY_EMAIL_HREF } from '@/data/company';
import { APP_PAGES, CITY_PAGES } from '@/data/landingPages';
import { getProgramsContent } from '@/data/programsContent';
import { Link } from '@/i18n/navigation';
import {
  buildDescription,
  buildLanguageAlternates,
  buildTitle,
  getLocalizedPath,
  getLocalizedUrl,
  SUPPORTED_LOCALES,
} from '@/lib/seo';
import { buildBreadcrumbSchema, LOCAL_BUSINESS_ID } from '@/lib/schema';
import Image from 'next/image';

type AboutPageProps = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'AboutPage' });
  const seoTitle = buildTitle(t('seoTitle'));
  const seoDescription = buildDescription(t('seoDescription'));

  return {
    title: seoTitle,
    description: seoDescription,
    alternates: {
      canonical: getLocalizedPath(lang, '/about'),
      languages: buildLanguageAlternates('/about'),
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: getLocalizedUrl(lang, '/about'),
      type: 'website',
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: seoTitle }],
    },
    twitter: { card: 'summary_large_image', title: seoTitle, description: seoDescription, images: ['/og-image.jpg'] },
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'AboutPage' });
  const tNav = await getTranslations({ locale: lang, namespace: 'Navbar' });
  const tWork = await getTranslations({ locale: lang, namespace: 'WorkPage' });
  const tServices = await getTranslations({ locale: lang, namespace: 'ServicesPage' });
  const tHome = await getTranslations({ locale: lang, namespace: 'HomePage' });
  const programs = getProgramsContent(lang);
  const serviceCards = [
    ['rentalTitle', 'rentalText'],
    ['buyoutTitle', 'buyoutText'],
    ['onboardingTitle', 'onboardingText'],
    ['serviceTitle', 'serviceText'],
    ['supportTitle', 'supportText'],
  ] as const;
  const cooperationCards = [
    { title: tWork('fleetTitle'), text: tWork('fleetText'), href: '/cars' as const },
    { title: tWork('buyoutTitle'), text: tWork('buyoutText'), href: '/vykup-avto' as const },
    { title: tServices('platformsTitle'), text: tServices('platformsText'), href: '/work' as const },
  ];
  const process = [1, 2, 3, 4].map((index) => ({
    title: tServices(`processStep${index}Title`),
    text: tServices(`processStep${index}Text`),
  }));
  const faq = [
    { q: t('faqCompanyTitle'), a: t('faqCompanyText') },
    { q: t('faqServicesTitle'), a: t('faqServicesText') },
    { q: programs.supportTitle, a: programs.supportIntro },
    {
      q: t('legalTitle'),
      a: `${COMPANY.legalName}, ${COMPANY.legal.addressLine1}, ${COMPANY.legal.cityPostal}.`,
    },
  ];

  return (
    <main className={styles.page}>
      <Breadcrumbs items={[{ label: tNav('home'), href: '/' }, { label: tNav('about') }]} />
      <div className={styles.container}>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>{COMPANY.name}</p>
          <h1 className={styles.title}>{t('heroTitle')}</h1>
          <p className={styles.subtitle}>{t('heroText')}</p>
          <div className={styles.actions}>
            <Link href='/contacts' className={styles.primaryBtn}>{t('ctaPrimary')}</Link>
            <Link href='/programs' className={styles.secondaryBtn}>{programs.navLabel}</Link>
          </div>
        </section>

        <section className='mb-8 grid gap-4 sm:grid-cols-3' aria-label={t('companyTitle')}>
          <article className={styles.card}>
            <strong className='block text-4xl font-black text-brand'>{APP_PAGES.length}</strong>
            <span className='mt-2 block text-[15px] leading-6 text-muted'>Uber · Bolt · Free Now</span>
          </article>
          <article className={styles.card}>
            <strong className='block text-4xl font-black text-brand'>{CITY_PAGES.length}</strong>
            <span className='mt-2 block text-[15px] leading-6 text-muted'>{tWork('coverageTitle')}</span>
          </article>
          <article className={styles.card}>
            <strong className='block text-4xl font-black text-brand'>{SUPPORTED_LOCALES.length}</strong>
            <span className='mt-2 block text-[15px] leading-6 text-muted'>{tHome('language')}</span>
          </article>
        </section>

        <section className={`${styles.section} relative overflow-hidden`} aria-labelledby='about-company'>
          <div className='pointer-events-none absolute -bottom-14 right-2 hidden h-[340px] w-[255px] opacity-90 drop-shadow-[0_18px_28px_rgba(53,47,127,.18)] lg:block dark:opacity-85 dark:drop-shadow-[0_18px_30px_rgba(0,0,0,.32)]' aria-hidden='true'>
            <Image
              src='/brand/vonco-assistant.webp'
              alt=''
              fill
              sizes='255px'
              className='object-contain object-bottom'
            />
          </div>
          <div className='relative grid gap-6 lg:grid-cols-[.8fr_1.2fr] lg:pr-64'>
            <div>
              <p className={styles.eyebrow}>{COMPANY.legalName}</p>
              <h2 id='about-company' className={styles.sectionTitle}>{t('companyTitle')}</h2>
            </div>
            <div className='space-y-4'>
              <p className={styles.sectionText}>{t('companyText')}</p>
              <p className={styles.sectionText}>{t('faqCompanyText')}</p>
              <p className={styles.sectionText}>{tWork('aboutText')}</p>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby='about-services'>
          <h2 id='about-services' className={styles.sectionTitle}>{t('whatWeDoTitle')}</h2>
          <div className={styles.grid}>
            {serviceCards.map(([title, text]) => (
              <article className={styles.card} key={title}>
                <h3 className={styles.cardTitle}>{t(`whatWeDo.${title}`)}</h3>
                <p className={styles.text}>{t(`whatWeDo.${text}`)}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby='cooperation-formats'>
          <h2 id='cooperation-formats' className={styles.sectionTitle}>{tServices('seoIntroTitle')}</h2>
          <p className={`${styles.sectionText} mb-6 max-w-4xl`}>{tServices('seoIntroText')}</p>
          <div className={styles.grid}>
            {cooperationCards.map((card) => (
              <article className={styles.card} key={card.href}>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.text}>{card.text}</p>
                <Link href={card.href} className='mt-5 inline-flex font-bold text-brand underline underline-offset-4'>
                  {card.title} →
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby='about-process'>
          <h2 id='about-process' className={styles.sectionTitle}>{t('howWeWorkTitle')}</h2>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
            {process.map((item, index) => (
              <article className={styles.card} key={item.title}>
                <span className='mb-4 block text-3xl font-black text-brand'>{String(index + 1).padStart(2, '0')}</span>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.text}>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby='social-support'>
          <div className='grid gap-6 lg:grid-cols-[.8fr_1.2fr]'>
            <div>
              <p className={styles.eyebrow}>Instagram · Facebook</p>
              <h2 id='social-support' className={styles.sectionTitle}>{programs.supportTitle}</h2>
              <p className={styles.sectionText}>{programs.supportIntro}</p>
              <div className={styles.actions}>
                <Link href='/programs' className={styles.primaryBtn}>{programs.navLabel}</Link>
                <a href={COMPANY.social.instagram} target='_blank' rel='noopener noreferrer' className={styles.secondaryBtn}>Instagram</a>
                <a href={COMPANY.social.facebook} target='_blank' rel='noopener noreferrer' className={styles.secondaryBtn}>Facebook</a>
              </div>
            </div>
            <div className='grid gap-4'>
              {programs.supportCards.map((card) => (
                <article className={styles.card} key={card.title}>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <p className={styles.text}>{card.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby='about-faq'>
          <h2 id='about-faq' className={styles.sectionTitle}>FAQ</h2>
          <div className={styles.faq}>
            {faq.map((item) => (
              <article className={styles.card} key={item.q}>
                <h3 className={styles.cardTitle}>{item.q}</h3>
                <p className={styles.text}>{item.a}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby='company-details'>
          <h2 id='company-details' className={styles.sectionTitle}>{t('legalTitle')}</h2>
          <ul className={styles.infoList}>
            <li><strong>{COMPANY.legalName}</strong></li>
            <li>{COMPANY.legal.addressLine1}, {COMPANY.legal.cityPostal}</li>
            {COMPANY.offices.map((office) => (
              <li key={office.id}>
                <a
                  href={office.mapUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={styles.email}
                >
                  {office.label}: {office.addressLine1}, {office.cityPostal}
                </a>
              </li>
            ))}
            <li>NIP: {COMPANY.legal.nip} · REGON: {COMPANY.legal.regon} · KRS: {COMPANY.legal.krs}</li>
            <li><a href={`tel:${COMPANY.phones.office.tel}`} className={styles.email}>{COMPANY.phones.office.display}</a> · <a href={COMPANY_EMAIL_HREF} className={styles.email}>{COMPANY.email}</a></li>
          </ul>
          <div className={styles.cta}>
            <h2 className={styles.ctaTitle}>{t('ctaTitle')}</h2>
            <p className={styles.sectionText}>{t('ctaText')}</p>
            <div className={styles.actions}>
              <Link href='/contacts' className={styles.primaryBtn}>{t('ctaPrimary')}</Link>
              <Link href='/cars' className={styles.secondaryBtn}>{t('ctaSecondary')}</Link>
            </div>
          </div>
        </section>
      </div>

      <JsonLd
        id={`about-schema-${lang}`}
        type='application/ld+json'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'AboutPage',
                name: t('heroTitle'),
                description: t('seoDescription'),
                url: getLocalizedUrl(lang, '/about'),
                mainEntity: { '@id': LOCAL_BUSINESS_ID },
              },
              buildBreadcrumbSchema([
                { name: tNav('home'), url: getLocalizedUrl(lang) },
                { name: tNav('about'), url: getLocalizedUrl(lang, '/about') },
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
