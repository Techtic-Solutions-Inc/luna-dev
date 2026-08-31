import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  className?: string;
  label?: string;
}

export function LoadingSkeleton({
  className,
  label = 'Loading home content',
}: LoadingSkeletonProps) {
  return (
    <div
      className={cn('visitor-home min-h-screen bg-[#11161c] text-white', className)}
      style={{
        fontFamily:
          "'Almarai', 'Public Sans', 'EB Garamond', 'Space Grotesk', 'Fellix', sans-serif",
      }}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <div className="mx-auto flex w-full max-w-[1920px] flex-col gap-gap-30 px-[40px] py-[24px]">
        <div className="flex items-center justify-between gap-gap-16">
          <Skeleton className="h-[36px] w-[160px] bg-white/10" />
          <div className="hidden items-center gap-gap-24 tablet:flex">
            <Skeleton className="h-[16px] w-[48px] bg-white/10" />
            <Skeleton className="h-[16px] w-[64px] bg-white/10" />
            <Skeleton className="h-[16px] w-[40px] bg-white/10" />
            <Skeleton className="h-[16px] w-[56px] bg-white/10" />
          </div>
          <div className="flex gap-gap-12">
            <Skeleton className="h-[44px] w-[120px] rounded-[100px] bg-white/10" />
            <Skeleton className="h-[44px] w-[88px] rounded-[100px] bg-white/10" />
          </div>
        </div>

        <div className="grid gap-gap-30 desktop:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)]">
          <div className="flex flex-col gap-gap-20 py-[40px]">
            <Skeleton className="h-[65px] w-full bg-white/10" />
            <Skeleton className="h-[65px] w-4/5 bg-white/10" />
            <Skeleton className="h-[65px] w-3/5 bg-white/10" />
            <Skeleton className="mt-[12px] h-[72px] w-full max-w-[480px] bg-white/10" />
            <div className="mt-[12px] flex gap-gap-12">
              {Array.from({ length: 5 }, (_, index) => (
                <Skeleton key={index} className="h-[44px] w-[44px] rounded-full bg-white/10" />
              ))}
            </div>
          </div>
          <Skeleton className="min-h-[420px] rounded-[16px] bg-white/10" />
        </div>

        <div className="flex flex-col items-center gap-gap-16 py-[40px]">
          <Skeleton className="h-[24px] w-[420px] max-w-full bg-white/10" />
          <Skeleton className="h-[48px] w-[160px] rounded-[100px] bg-white/10" />
        </div>
      </div>

      <div className="bg-white px-[40px] py-[60px]">
        <div className="mx-auto flex max-w-[1920px] flex-col items-center gap-gap-20">
          <Skeleton className="h-[48px] w-[520px] max-w-full bg-[#d9d9d9]" />
          <Skeleton className="h-[24px] w-[640px] max-w-full bg-[#d9d9d9]" />
          <div className="grid w-full grid-cols-1 gap-[20px] tablet:grid-cols-2 desktop:grid-cols-3">
            {Array.from({ length: 3 }, (_, index) => (
              <Skeleton key={index} className="h-[420px] rounded-[16px] bg-[#d9d9d9]" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
