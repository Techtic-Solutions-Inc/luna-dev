import { cn } from '@/lib/cn';

interface LoadingSkeletonProps {
  variant?: 'home' | 'steps' | 'gallery';
  className?: string;
}

export function LoadingSkeleton({ variant = 'home', className }: LoadingSkeletonProps) {
  if (variant === 'steps') {
    return (
      <div className={cn('bg-grid bg-color-105 px-6 py-24', className)} aria-busy="true" aria-live="polite">
        <div className="mx-auto max-w-content space-y-12">
          <div className="mx-auto h-12 w-96 max-w-full animate-pulse rounded-16 bg-white/10" />
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="grid gap-10 md:grid-cols-2">
              <div className="space-y-4">
                <div className="h-8 w-24 animate-pulse rounded-100 bg-white/10" />
                <div className="h-16 animate-pulse rounded-16 bg-white/10" />
                <div className="h-20 animate-pulse rounded-16 bg-white/10" />
              </div>
              <div className="h-[320px] animate-pulse rounded-24 bg-white/10" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'gallery') {
    return (
      <div className={cn('bg-white py-20', className)} aria-busy="true" aria-live="polite">
        <div className="mx-auto h-12 w-80 animate-pulse rounded-16 bg-color-128" />
        <div className="mt-12 flex gap-4 overflow-hidden px-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-[420px] w-[240px] shrink-0 animate-pulse rounded-24 bg-color-128" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn('bg-page', className)} aria-busy="true" aria-live="polite">
      <div className="mx-auto grid max-w-content gap-10 px-6 py-16 md:grid-cols-2">
        <div className="space-y-4">
          <div className="h-16 animate-pulse rounded-16 bg-white/10" />
          <div className="h-16 animate-pulse rounded-16 bg-white/10" />
          <div className="h-24 animate-pulse rounded-16 bg-white/10" />
        </div>
        <div className="h-[420px] animate-pulse rounded-24 bg-white/10" />
      </div>
      <LoadingSkeleton variant="gallery" />
      <LoadingSkeleton variant="steps" />
    </div>
  );
}

export default LoadingSkeleton;
