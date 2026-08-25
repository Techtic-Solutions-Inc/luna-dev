import { Skeleton } from "@/components/ui/Skeleton";

export function DashboardSkeleton() {
  return (
    <div className="flex min-h-screen bg-color-16" aria-busy="true">
      <aside className="hidden w-sidebar flex-col gap-16 border-r border-color-129 p-20 lg:flex">
        <Skeleton className="h-48 w-40" />
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} className="h-36 w-full" />
        ))}
      </aside>
      <div className="flex-1 p-24">
        <Skeleton className="h-40 w-[280px]" />
        <Skeleton className="mt-16 h-44 w-full rounded-1000" />
        <div className="mt-24 flex gap-16">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-[300px] w-[200px]" />
          ))}
        </div>
      </div>
    </div>
  );
}
