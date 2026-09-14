import type { ReactNode } from 'react';
import { Inbox } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  tone?: 'default' | 'home';
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  tone = 'default',
  className,
}: EmptyStateProps) {
  const isHomeTone = tone === 'home';

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-12 text-center',
        isHomeTone && 'text-home-foreground',
        className,
      )}
    >
      <div
        className={cn('mb-4', isHomeTone ? 'text-home-muted-foreground' : 'text-muted-foreground')}
      >
        {icon ?? <Inbox className="h-12 w-12" aria-hidden="true" />}
      </div>
      <h3
        className={cn(
          'mb-2 text-lg font-semibold',
          isHomeTone ? 'text-home-foreground' : 'text-foreground',
        )}
      >
        {title}
      </h3>
      {description && (
        <p
          className={cn(
            'mb-6 max-w-sm text-sm',
            isHomeTone ? 'text-home-muted-foreground' : 'text-muted-foreground',
          )}
        >
          {description}
        </p>
      )}
      {actionLabel && onAction && <Button onClick={onAction}>{actionLabel}</Button>}
    </div>
  );
}
