import { Skeleton } from '@/components/ui/Skeleton';

export function HomeSkeleton() {
  return (
    <div className="px-[20px] py-[30px] md:px-[30px] lg:px-[101px]" role="status" aria-label="Loading">
      <p className="sr-only" aria-live="polite">
        Loading home content
      </p>
      <div aria-hidden="true">
        <div className="mx-auto mt-[30px] grid max-w-[1760px] gap-[101px] lg:grid-cols-2">
          <div>
            <Skeleton className="h-[120px] w-full rounded-[16px]" />
            <Skeleton className="mt-[20px] h-[72px] w-full rounded-[16px]" />
            <div className="mt-[24px] flex gap-[12px]">
              <Skeleton className="h-[40px] w-[40px] rounded-[100px]" />
              <Skeleton className="h-[40px] w-[40px] rounded-[100px]" />
              <Skeleton className="h-[40px] w-[40px] rounded-[100px]" />
            </div>
          </div>
          <Skeleton className="min-h-[400px] w-full rounded-[16px]" />
        </div>
        <Skeleton className="mx-auto mt-[30px] h-[44px] w-[180px] rounded-[100px]" />
      </div>
    </div>
  );
}
