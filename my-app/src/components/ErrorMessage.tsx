import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ErrorMessageProps {
  message: string;
  className?: string;
  onRetry?: () => void;
  retryLabel?: string;
}

export function ErrorMessage({
  message,
  className,
  onRetry,
  retryLabel = 'Try again',
}: ErrorMessageProps) {
  return (
    <div
      role="alert"
      className={cn(
        'flex items-start gap-3 rounded-[8px] border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive',
        className,
      )}
    >
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <div className="flex-1">
        <p>{message}</p>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-2 font-semibold underline underline-offset-2 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {retryLabel}
          </button>
        )}
      </div>
    </div>
  );
}
