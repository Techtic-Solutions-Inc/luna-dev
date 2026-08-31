import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = 'Unable to load data',
  message,
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-gap-12 rounded-lg border border-destructive/40 bg-destructive/10 px-padding-24 py-padding-32 text-center',
        className,
      )}
      role="alert"
    >
      <AlertCircle className="h-8 w-8 text-destructive" aria-hidden="true" />
      <div className="flex flex-col gap-gap-6">
        <p className="text-body-17 text-foreground">{title}</p>
        <p className="max-w-md text-sm text-muted-foreground">{message}</p>
      </div>
      {onRetry ? (
        <Button type="button" variant="outline" onClick={onRetry}>
          Try again
        </Button>
      ) : null}
    </div>
  );
}
