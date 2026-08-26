import { Skeleton } from '@/components/ui/Skeleton';

export function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-4" aria-hidden="true">
      <div className="flex flex-col gap-4 rounded-section bg-canvas py-8 px-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-[44px] w-full" />
      </div>
      <div className="flex flex-col gap-4 rounded-section bg-panel p-4">
        <div className="flex gap-4 overflow-hidden">
          <Skeleton className="h-[300px] w-[200px] shrink-0" />
          <Skeleton className="h-[300px] w-[200px] shrink-0" />
          <Skeleton className="h-[300px] w-[200px] shrink-0" />
        </div>
      </div>
    </div>
  );
}
