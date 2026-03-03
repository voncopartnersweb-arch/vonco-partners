'use client';

import { ReactNode, useEffect, useState } from 'react';

type ClientDeferredProps = {
  children: ReactNode;
  delayMs?: number;
};

export default function ClientDeferred({
  children,
  delayMs = 800,
}: ClientDeferredProps) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let idleId: number | undefined;

    const renderNow = () => setShouldRender(true);
    const win = window as Window & {
      requestIdleCallback?: (
        callback: IdleRequestCallback,
        options?: IdleRequestOptions,
      ) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    if (typeof win.requestIdleCallback === 'function') {
      idleId = win.requestIdleCallback(renderNow, { timeout: delayMs });
    } else {
      timeoutId = setTimeout(renderNow, delayMs);
    }

    return () => {
      if (idleId !== undefined && typeof win.cancelIdleCallback === 'function') {
        win.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    };
  }, [delayMs]);

  if (!shouldRender) {
    return null;
  }

  return <>{children}</>;
}
