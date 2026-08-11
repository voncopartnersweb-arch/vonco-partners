import { Link } from '@/i18n/navigation';

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className='mx-auto w-full max-w-[1200px] px-5 pt-4 text-[15px] text-muted' aria-label='Breadcrumb'>
      <ol className='flex list-none flex-wrap gap-2'>
        {items.map((item, index) => {
          const current = index === items.length - 1;
          return (
            <li className="inline-flex items-center gap-2 after:text-line after:content-['/'] last:after:hidden [&_a]:underline [&_a]:underline-offset-4 [&_[aria-current='page']]:font-bold [&_[aria-current='page']]:text-foreground" key={`${item.label}-${index}`}>
              {current || !item.href ? (
                <span aria-current={current ? 'page' : undefined}>{item.label}</span>
              ) : (
                <Link href={item.href}>{item.label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
