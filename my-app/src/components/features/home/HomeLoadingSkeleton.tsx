import { Skeleton } from '@/components/ui/skeleton';
import { HOME_PAGE_INSET_CLASS } from './homeSectionLayout';

export function HomeLoadingSkeleton() {
  return (
    <div className={`flex w-full flex-col gap-8 py-16 ${HOME_PAGE_INSET_CLASS}`}>
      <Skeleton className="h-8 w-36 rounded-md bg-white/10" />
      <div className="grid w-full gap-8 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <Skeleton className="h-12 w-full max-w-lg rounded-md bg-white/10" />
          <Skeleton className="h-12 w-full max-w-md rounded-md bg-white/10" />
          <Skeleton className="h-6 w-full max-w-sm rounded-md bg-white/10" />
        </div>
        <Skeleton className="h-80 w-full rounded-2xl bg-white/10" />
      </div>
    </div>
  );
}
