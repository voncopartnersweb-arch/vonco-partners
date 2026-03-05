'use client';
import { Link } from '@/i18n/navigation';
import { usePathname } from 'next/navigation';

export default function NavLink({
  children,
  href,
  activeStyle,
  unActiveStyle,
}: {
  children: React.ReactNode;
  href: string;
  activeStyle: string;
  unActiveStyle: string;
}) {
  const pathName = usePathname();

  const getIsActive = () => {
    // 1. Отримуємо шлях без локалі (наприклад: /uk/cars -> /cars)
    // Регулярний вираз видаляє /uk, /en, /pl тощо на початку рядка
    const pathWithoutLocale = pathName.replace(/^\/[a-z]{2}(\/|$)/, '/') || '/';

    // 2. Логіка активності
    if (href === '/') {
      return pathWithoutLocale === '/';
    }

    return pathWithoutLocale.startsWith(href);
  };

  const active = getIsActive();

  return (
    <Link href={href} className={active ? activeStyle : unActiveStyle}>
      {children}
    </Link>
  );
}
