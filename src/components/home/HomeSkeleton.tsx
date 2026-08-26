import { Skeleton } from '@/components/ui/Skeleton';

export function HomeSkeleton() {
  return (
    <div aria-hidden="true" className="mx-auto max-w-[1920px] px-6 py-[60px] md:px-[40px]">
      <div className="grid gap-[40px] lg:grid-cols-2">
        <div className="flex flex-col gap-5">
          <Skeleton className="h-[200px] w-full max-w-[640px]" />
          <Skeleton className="h-[72px] w-full max-w-[560px]" />
          <Skeleton className="h-[44px] w-[200px]" />
        </div>
        <Skeleton className="h-[420px] w-full rounded-[10px]" />
      </div>
      <div className="mt-[60px] flex flex-col items-center gap-4">
        <Skeleton className="h-[24px] w-[480px] max-w-full" />
        <Skeleton className="h-[52px] w-[180px] rounded-[100px]" />
      </div>
    </div>
  );
}
