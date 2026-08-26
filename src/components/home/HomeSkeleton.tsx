import { Skeleton } from '@/components/ui/Skeleton';

export function HomeSkeleton() {
  return (
    <div className="home-hero-bg min-h-screen bg-[#11161c] px-[20px] py-[30px] md:px-[30px]" role="status" aria-label="Loading">
      <p className="sr-only" aria-live="polite">
        Loading home content
      </p>
      <div aria-hidden="true">
        <div className="mx-auto flex max-w-[1760px] items-center justify-between">
          <Skeleton className="h-[32px] w-[180px]" />
          <Skeleton className="hidden h-[24px] w-[320px] md:block" />
          <Skeleton className="h-[44px] w-[200px]" />
        </div>
        <div className="mx-auto mt-[60px] grid max-w-[1760px] gap-[40px] lg:grid-cols-2">
          <div>
            <Skeleton className="h-[120px] w-full" />
            <Skeleton className="mt-[20px] h-[72px] w-full" />
            <div className="mt-[24px] flex gap-[12px]">
              <Skeleton className="h-[40px] w-[40px] rounded-full" />
              <Skeleton className="h-[40px] w-[40px] rounded-full" />
              <Skeleton className="h-[40px] w-[40px] rounded-full" />
            </div>
          </div>
          <Skeleton className="min-h-[400px] w-full rounded-[16px]" />
        </div>
        <Skeleton className="mx-auto mt-[40px] h-[44px] w-[180px] rounded-full" />
      </div>
    </div>
  );
}
