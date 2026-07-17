import { getTranslations } from 'next-intl/server';

export default async function HeroSection() {
  const t = await getTranslations('Hero');

  return (
    <section className='relative flex w-full items-center overflow-hidden rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_75%_35%,#3b0a0d_0%,#120506_42%,#09090b_100%)] px-[clamp(20px,6vw,72px)] py-[clamp(44px,9vw,96px)] text-white shadow-2xl shadow-red-950/25 max-md:rounded-2xl'>
      <div className='pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-red-600/20 blur-3xl' />
      <div className='relative z-10 mx-auto grid w-full max-w-[1300px] items-center'>
        <div className='flex max-w-4xl flex-col gap-5'>
          <span className='w-fit rounded-full border border-red-300/25 bg-red-500/10 px-3 py-1 text-xs font-bold tracking-[0.16em] text-red-200 uppercase'>Vonco Partners</span>
          <h1 className='text-[clamp(2rem,6vw,4.75rem)] font-black leading-[1.02] tracking-[-0.045em] text-balance text-white drop-shadow-[0_0_24px_rgba(255,0,0,.22)]'>{t('title')}</h1>
          <p className='max-w-3xl text-[clamp(1rem,2vw,1.2rem)] leading-relaxed text-zinc-300'>{t('subtitle')}</p>
        </div>
      </div>
    </section>
  );
}
