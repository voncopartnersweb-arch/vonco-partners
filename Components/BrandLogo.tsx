type BrandLogoProps = {
  className?: string;
  priority?: boolean;
};

export default function BrandLogo({
  className = 'h-10 w-auto',
}: BrandLogoProps) {
  return (
    <span
      role='img'
      aria-label='Vonco Partners'
      className={`inline-flex shrink-0 bg-[url('/brand/vonco-logo-light.png')] bg-contain bg-center bg-no-repeat dark:bg-[url('/brand/vonco-logo-dark.png')] ${className}`}
    />
  );
}
