import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface LoadingStateProps {
  rows?: number;
  className?: string;
  label?: string;
}

export function LoadingState({ rows = 4, className, label = 'Loading' }: LoadingStateProps) {
  return (
    <div
      className={cn('flex flex-col gap-gap-12', className)}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      {Array.from({ length: rows }, (_, index) => (
        <Skeleton key={index} className="h-gap-48 w-full" />
      ))}
    </div>
  );
}
