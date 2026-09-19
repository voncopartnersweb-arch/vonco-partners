import { getTranslations } from 'next-intl/server';
import BrandLogo from '@/Components/BrandLogo';
import { Link } from '@/i18n/navigation';
import { ArrowUpRight, CarFront } from 'lucide-react';
import { preload } from 'react-dom';
import OpenDriverFormButton from '@/Components/OpenDriverFormButton';

const MOBILE_HERO_AVIF =
  '/images/vonco-taxi-hero-wawel-mobile-430.avif';
const MOBILE_HERO_WEBP =
  '/images/vonco-taxi-hero-wawel-mobile-430.webp';
const DESKTOP_HERO_AVIF = '/images/vonco-taxi-hero-wawel-1536.avif';
const DESKTOP_HERO_JPG = '/images/vonco-taxi-hero-wawel.jpg';

export default async function HeroSection() {
  const t = await getTranslations('Hero');
  const tNav = await getTranslations('Navbar');

  preload(MOBILE_HERO_AVIF, {
    as: 'image',
    type: 'image/avif',
    media: '(max-width: 767px)',
    fetchPriority: 'high',
  });
  preload(DESKTOP_HERO_AVIF, {
    as: 'image',
    type: 'image/avif',
    media: '(min-width: 768px)',
    fetchPriority: 'high',
  });

  return (
    <section className='relative isolate flex min-h-[clamp(520px,52vw,700px)] w-full items-center overflow-hidden rounded-[36px] border border-line bg-surface shadow-[0_24px_70px_rgba(53,47,127,.16)] max-md:min-h-[650px] max-md:items-end max-md:rounded-[28px] dark:shadow-[0_24px_70px_rgba(0,0,0,.38)]'>
      <picture>
        <source
          media='(max-width: 767px)'
          type='image/avif'
          srcSet={MOBILE_HERO_AVIF}
        />
        <source
          media='(max-width: 767px)'
          type='image/webp'
          srcSet={MOBILE_HERO_WEBP}
        />
        <source
          media='(min-width: 768px)'
          type='image/avif'
          srcSet={DESKTOP_HERO_AVIF}
        />
        <img
          src={DESKTOP_HERO_JPG}
          alt='Vonco Partners taxi in Kraków'
          width='1536'
          height='1024'
          loading='eager'
          fetchPriority='high'
          decoding='sync'
          className='absolute inset-0 h-full w-full object-cover object-[64%_center] max-md:object-[center_34%]'
        />
      </picture>
      <div
        className='absolute inset-0 bg-[linear-gradient(90deg,rgba(246,245,249,.99)_0%,rgba(246,245,249,.96)_39%,rgba(246,245,249,.78)_51%,rgba(246,245,249,.14)_64%,rgba(246,245,249,0)_76%)] max-md:bg-[linear-gradient(0deg,rgba(246,245,249,.99)_0%,rgba(246,245,249,.98)_43%,rgba(246,245,249,.78)_55%,rgba(246,245,249,.08)_72%,rgba(246,245,249,0)_82%)] dark:bg-[linear-gradient(90deg,rgba(26,19,40,.99)_0%,rgba(26,19,40,.96)_40%,rgba(26,19,40,.77)_52%,rgba(26,19,40,.13)_66%,rgba(26,19,40,0)_77%)] dark:max-md:bg-[linear-gradient(0deg,rgba(26,19,40,.99)_0%,rgba(26,19,40,.98)_43%,rgba(26,19,40,.76)_56%,rgba(26,19,40,.08)_73%,rgba(26,19,40,0)_83%)]'
        aria-hidden='true'
      />
      <div className='pointer-events-none absolute -left-24 -top-24 size-80 rounded-full bg-[radial-gradient(circle,rgba(124,115,241,.22)_0%,rgba(124,115,241,0)_70%)] dark:bg-[radial-gradient(circle,rgba(124,115,241,.28)_0%,rgba(124,115,241,0)_70%)]' />
      <div
        className='pointer-events-none absolute inset-0 bg-[url("/brand/vonco-route-pattern.svg")] bg-[length:900px_auto] bg-[position:20px_30px] bg-no-repeat opacity-35 max-md:bg-[length:720px_auto] max-md:bg-[position:center_80px]'
        aria-hidden='true'
      />
      <div className='relative z-10 mx-auto w-full max-w-[1300px] px-[clamp(22px,6vw,76px)] py-[clamp(40px,8vw,86px)]'>
        <div className='flex max-w-[760px] flex-col gap-5 max-md:max-w-none'>
          <div className='flex w-fit items-center rounded-2xl border border-line bg-surface/95 px-4 py-3 shadow-sm dark:bg-surface/94'>
            <BrandLogo className='h-12 w-[190px] sm:h-14 sm:w-[220px]' priority />
          </div>
          <h1 className='max-w-[720px] text-[clamp(2.65rem,5.6vw,5.1rem)] font-bold leading-[1.02] tracking-[.01em] text-balance text-foreground uppercase'>
            {t('title')}
          </h1>
          <p className='max-w-2xl text-[clamp(1rem,1.7vw,1.2rem)] leading-relaxed text-muted'>
            {t('subtitle')}
          </p>
          <div className='mt-2 flex flex-wrap gap-3'>
            <OpenDriverFormButton className='inline-flex min-h-13 items-center justify-center rounded-2xl bg-accent px-6 font-extrabold text-navy shadow-[0_14px_34px_rgba(255,243,43,.22)] transition hover:-translate-y-0.5 hover:bg-accent-strong focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent' />
            <Link
              href='/work'
              className='inline-flex min-h-13 items-center justify-center gap-2 rounded-2xl border border-line bg-surface/95 px-6 font-extrabold text-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-brand/60 hover:bg-brand-soft focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand dark:bg-surface/94'
            >
              {tNav('work')}
              <ArrowUpRight size={19} aria-hidden='true' />
            </Link>
            <Link
              href='/cars'
              className='inline-flex min-h-13 items-center justify-center gap-2 rounded-2xl border border-line bg-surface/95 px-6 font-extrabold text-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-brand/60 hover:bg-brand-soft focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand dark:bg-surface/94'
            >
              <CarFront size={19} aria-hidden='true' />
              {tNav('cars')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
