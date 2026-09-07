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
        'flex items-start gap-3 rounded-[8px] border border-[#ff2f2f]/30 bg-[#ff2f2f]/10 px-4 py-3 text-[14px] text-[#ffffff]',
        className,
      )}
    >
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#ff2f2f]" aria-hidden="true" />
      <div className="flex-1">
        <p>{message}</p>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-2 text-[14px] font-[600] text-[#c8a47e] underline underline-offset-2 hover:text-[#b8936a]"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  )
}
