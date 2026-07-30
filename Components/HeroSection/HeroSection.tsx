import { getTranslations } from 'next-intl/server';
import Image, { getImageProps } from 'next/image';

export default async function HeroSection() {
  const t = await getTranslations('Hero');
  const commonImageProps = {
    alt: '',
    fill: true,
    priority: true,
    sizes: '100vw',
  } as const;
  const {
    props: { srcSet: desktopSrcSet, ...desktopImageProps },
  } = getImageProps({
    ...commonImageProps,
    src: '/images/vonco-taxi-hero-camry.jpg',
    sizes: '(min-width: 768px) 1400px, 100vw',
  });
  const {
    props: { srcSet: mobileSrcSet },
  } = getImageProps({
    ...commonImageProps,
    src: '/images/vonco-taxi-hero-camry-mobile.jpg',
  });

  return (
    <section className='relative isolate flex min-h-[clamp(470px,50vw,660px)] w-full items-center overflow-hidden rounded-[32px] border border-line bg-surface shadow-[0_24px_70px_rgba(20,20,24,.12)] max-md:min-h-[560px] max-md:items-end max-md:rounded-3xl dark:shadow-[0_24px_70px_rgba(0,0,0,.35)]'>
      <picture>
        <source
          media='(max-width: 767px)'
          srcSet={mobileSrcSet}
          sizes='100vw'
        />
        <source
          media='(min-width: 768px)'
          srcSet={desktopSrcSet}
          sizes='1400px'
        />
        <img
          {...desktopImageProps}
          alt=''
          className='object-cover object-[64%_center] max-md:object-[center_43%]'
        />
      </picture>
      <div
        className='absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,.99)_0%,rgba(255,255,255,.96)_34%,rgba(255,255,255,.68)_56%,rgba(255,255,255,.08)_82%)] max-md:bg-[linear-gradient(0deg,rgba(255,255,255,.99)_0%,rgba(255,255,255,.96)_43%,rgba(255,255,255,.20)_78%,rgba(255,255,255,.04)_100%)] dark:bg-[linear-gradient(90deg,rgba(8,8,10,.99)_0%,rgba(8,8,10,.95)_35%,rgba(8,8,10,.67)_58%,rgba(8,8,10,.10)_84%)] dark:max-md:bg-[linear-gradient(0deg,rgba(8,8,10,.99)_0%,rgba(8,8,10,.96)_43%,rgba(8,8,10,.26)_78%,rgba(8,8,10,.08)_100%)]'
        aria-hidden='true'
      />
      <div className='pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-red-500/10 blur-3xl dark:bg-red-600/15' />
      <div className='relative z-10 mx-auto w-full max-w-[1300px] px-[clamp(22px,6vw,76px)] py-[clamp(40px,8vw,86px)]'>
        <div className='flex max-w-[760px] flex-col gap-5 max-md:max-w-none'>
          <div className='flex w-fit items-center gap-3 rounded-2xl border border-line bg-surface/85 p-2 pr-4 shadow-sm backdrop-blur-md'>
            <Image
              src='/vonco-logo.jpg'
              alt=''
              width={52}
              height={52}
              className='size-12 rounded-xl object-cover'
            />
            <span className='text-sm font-black tracking-[0.08em] text-foreground uppercase sm:text-base'>
              Vonco <span className='text-brand'>Partners</span>
            </span>
          </div>
          <h1 className='text-[clamp(2.1rem,5vw,4.15rem)] font-black leading-[1.01] tracking-[-0.05em] text-balance text-foreground'>
            {t('title')}
          </h1>
          <p className='max-w-2xl text-[clamp(1rem,1.7vw,1.2rem)] leading-relaxed text-muted'>
            {t('subtitle')}
          </p>
        </div>
      </div>
    </section>
  );
}
