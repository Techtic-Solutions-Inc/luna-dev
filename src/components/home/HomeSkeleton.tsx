import { Skeleton } from '../ui/Skeleton';

export function HomeSkeleton() {
  return (
    <div className="home-hero-bg min-h-screen px-[20px] py-[40px] md:px-[40px]" aria-hidden="true">
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
        <Skeleton className="min-h-[400px] w-full" />
      </div>
      <div className="mx-auto mt-[60px] grid max-w-[1760px] grid-cols-2 gap-[16px] md:grid-cols-4">
        <Skeleton className="h-[280px]" />
        <Skeleton className="h-[280px]" />
        <Skeleton className="h-[280px]" />
        <Skeleton className="h-[280px]" />
      </div>
    </div>
  );
}
