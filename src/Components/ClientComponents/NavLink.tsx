'use client';
import Link from 'next/link';
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
  const isActive = (path: string) => {
    return pathName.startsWith(path);
  };
  return (
    <Link href={href} className={isActive(href) ? activeStyle : unActiveStyle}>
      {children}
    </Link>
  );
}
