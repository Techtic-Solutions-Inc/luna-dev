import type { ReactNode } from 'react';
import { Inbox } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-gap-12 rounded-lg border border-dashed border-border px-padding-24 py-padding-40 text-center',
        className,
      )}
      role="status"
    >
      <Inbox className="h-10 w-10 text-muted-foreground" aria-hidden="true" />
      <div className="flex flex-col gap-gap-6">
        <p className="text-body-17 text-foreground">{title}</p>
        {description ? (
          <p className="max-w-md text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}
