import Image from 'next/image';

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
};

export default function BrandLogo({
  className = 'h-10 w-auto',
  priority = false,
}: BrandLogoProps) {
  return (
    <span className={`relative inline-flex shrink-0 ${className}`}>
      <Image
        src='/brand/vonco-logo-light.png'
        alt='Vonco Partners'
        width={500}
        height={163}
        unoptimized
        priority={priority}
        sizes='(max-width: 767px) 190px, 220px'
        className='absolute inset-0 h-full w-full object-contain opacity-100 transition-opacity dark:opacity-0'
      />
      <Image
        src='/brand/vonco-logo-dark.png'
        alt=''
        width={500}
        height={163}
        unoptimized
        priority={priority}
        sizes='(max-width: 767px) 190px, 220px'
        className='absolute inset-0 h-full w-full object-contain opacity-0 transition-opacity dark:opacity-100'
      />
    </span>
  );
}
