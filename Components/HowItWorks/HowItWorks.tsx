import { useTranslations } from 'next-intl';

const HowItWorks = () => {
  const t = useTranslations('Steps');
  const hasSectionTitle = t.has('sectionTitle');
  const HeadingTag = hasSectionTitle ? 'h3' : 'h2';

  const steps = [
    {
      id: 1,
      icon: (
        <svg
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
        >
          <path d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2zM9 8h.01' />
        </svg>
      ),
    },
    {
      id: 2,
      icon: (
        <svg
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
        >
          <path d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' />
        </svg>
      ),
    },
    {
      id: 3,
      icon: (
        <svg
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
        >
          <path d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2z' />
          <path d='M5 7h14M5 11h14' opacity='0.5' />
        </svg>
      ),
    },
    {
      id: 4,
      icon: (
        <svg
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
        >
          <path d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' />
          <path d='M17 17h.01M17 20h.01M20 20h.01' />
        </svg>
      ),
    },
  ];

  return (
    <section className='mx-auto max-w-[1400px] px-5 py-[clamp(60px,10vw,100px)]' aria-labelledby='how-it-works-title'>
      {hasSectionTitle ? (
        <div className='mb-8'>
          <h2 id='how-it-works-title' className='text-[clamp(1.75rem,3vw,2.6rem)] font-black tracking-tight text-foreground'>
            {t('sectionTitle')}
          </h2>
        </div>
      ) : null}
      <div className='grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1'>
        {steps.map((step) => (
          <div key={step.id} className='group rounded-3xl border border-line bg-surface p-6 shadow-soft transition hover:-translate-y-1 hover:border-red-300/50 hover:shadow-card dark:hover:border-red-500/40'>
            <div className='mb-6 flex size-14 items-center justify-center rounded-2xl bg-brand-soft p-3 text-brand transition group-hover:scale-105'>{step.icon}</div>
            <div>
              <HeadingTag className='mb-3 text-xl font-extrabold tracking-tight text-foreground'>
                {t(`step${step.id}.title`)}
              </HeadingTag>
              <p className='leading-relaxed text-muted'>{t(`step${step.id}.desc`)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
