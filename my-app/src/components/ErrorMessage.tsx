import { AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ErrorMessageProps {
  message: string
  className?: string
  onRetry?: () => void
}

export function ErrorMessage({ message, className, onRetry }: ErrorMessageProps) {
  return (
    <div
      role="alert"
      className={cn(
        'flex items-start gap-3 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-[14px] text-foreground',
        className,
      )}
    >
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" aria-hidden="true" />
      <div className="flex-1">
        <p>{message}</p>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-2 text-[14px] font-[600] text-accent underline underline-offset-2 hover:text-accent/90"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  )
}
