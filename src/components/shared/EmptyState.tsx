import type { ReactNode } from 'react';
import { Inbox } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
  titleAs?: 'p' | 'h1';
}

export function EmptyState({
  title,
  description,
  action,
  className,
  titleAs = 'p',
}: EmptyStateProps) {
  const TitleTag = titleAs;
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-gap-12 rounded-lg border border-dashed border-border px-padding-24 py-padding-40 text-center',
        className,
      )}
      role="status"
    >
      <Inbox className="h-padding-40 w-padding-40 text-muted-foreground" aria-hidden="true" />
      <div className="flex flex-col gap-gap-6">
        <TitleTag className="text-body-17 text-foreground">{title}</TitleTag>
        {description ? (
          <p className="max-w-[var(--spacing-gap-465)] text-body-sm-2 text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  );
}
