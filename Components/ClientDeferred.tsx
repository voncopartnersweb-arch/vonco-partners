'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';

type ClientDeferredProps = {
  children: ReactNode;
  delayMs?: number;
  placeholderClassName?: string;
};

export default function ClientDeferred({
  children,
  delayMs = 800,
  placeholderClassName = 'min-h-[420px]',
}: ClientDeferredProps) {
  const [shouldRender, setShouldRender] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    if (!('IntersectionObserver' in window)) {
      const timeoutId = setTimeout(() => setShouldRender(true), delayMs);
      return () => clearTimeout(timeoutId);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setShouldRender(true);
        observer.disconnect();
      },
      { rootMargin: '500px 0px' },
    );
    observer.observe(element);

    return () => observer.disconnect();
  }, [delayMs]);

  return (
    <div
      ref={containerRef}
      className={`${placeholderClassName} [content-visibility:auto] [contain-intrinsic-size:auto_720px]`}
    >
      {shouldRender ? children : null}
    </div>
  );
}
