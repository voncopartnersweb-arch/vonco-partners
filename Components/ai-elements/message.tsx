'use client';

import { cjk } from '@streamdown/cjk';
import { code } from '@streamdown/code';
import { math } from '@streamdown/math';
import { mermaid } from '@streamdown/mermaid';
import type { UIMessage } from 'ai';
import { memo, type ComponentProps, type HTMLAttributes } from 'react';
import { Streamdown } from 'streamdown';

import { cn } from '@/lib/utils';

export type MessageProps = HTMLAttributes<HTMLDivElement> & {
  from: UIMessage['role'];
};

export function Message({ className, from, ...props }: MessageProps) {
  return (
    <div
      className={cn(
        'flex w-full min-w-0',
        from === 'user' ? 'justify-end' : 'justify-start',
        className,
      )}
      data-role={from}
      {...props}
    />
  );
}

export type MessageContentProps = HTMLAttributes<HTMLDivElement>;

export function MessageContent({
  className,
  ...props
}: MessageContentProps) {
  return (
    <div
      className={cn(
        'max-w-[86%] min-w-0 rounded-2xl border border-line bg-surface px-4 py-3 text-[15px] leading-6 shadow-sm',
        'group-data-[role=user]:border-brand-solid group-data-[role=user]:bg-brand-solid group-data-[role=user]:text-white',
        className,
      )}
      {...props}
    />
  );
}

export type MessageResponseProps = ComponentProps<typeof Streamdown>;

const streamdownPlugins = { cjk, code, math, mermaid };

export const MessageResponse = memo(function MessageResponse({
  className,
  ...props
}: MessageResponseProps) {
  return (
    <Streamdown
      className={cn(
        'min-w-0 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_a]:font-bold [&_a]:text-brand [&_a]:underline [&_a]:underline-offset-4 group-data-[role=user]:[&_a]:text-white',
        className,
      )}
      plugins={streamdownPlugins}
      {...props}
    />
  );
});
