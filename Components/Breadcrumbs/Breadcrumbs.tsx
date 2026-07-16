import { Link } from '@/i18n/navigation';
import styles from './Breadcrumbs.module.css';

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className={styles.breadcrumbs} aria-label='Breadcrumb'>
      <ol className={styles.list}>
        {items.map((item, index) => {
          const current = index === items.length - 1;
          return (
            <li className={styles.item} key={`${item.label}-${index}`}>
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
