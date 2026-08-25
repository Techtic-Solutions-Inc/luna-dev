import { Skeleton } from "@/components/ui/Skeleton";

export function HomeSkeleton() {
  return (
    <div className="flex flex-col" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading home content</span>
      <section className="grid gap-32 px-20 py-40 lg:grid-cols-2 lg:px-60 lg:py-80">
        <div className="flex flex-col gap-20">
          <Skeleton className="h-32 w-4/5" />
          <Skeleton className="h-32 w-3/5" />
          <Skeleton className="h-80 w-full max-w-[520px]" />
          <div className="flex gap-12">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-36 w-36 rounded-1000" />
            ))}
          </div>
        </div>
        <Skeleton className="h-[420px] w-full rounded-24" />
      </section>
      <section className="bg-secondary px-20 py-60 lg:px-60">
        <Skeleton className="mx-auto h-32 w-1/2" />
        <Skeleton className="mx-auto mt-16 h-16 w-3/5" />
        <div className="mt-40 flex gap-16 overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-[360px] w-[220px] shrink-0 rounded-24" />
          ))}
        </div>
      </section>
      <section className="px-20 py-60 lg:px-60">
        <Skeleton className="mx-auto h-32 w-2/5" />
        <div className="mt-48 flex flex-col gap-64">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="grid gap-32 lg:grid-cols-2">
              <div className="flex flex-col gap-16">
                <Skeleton className="h-28 w-80 rounded-1000" />
                <Skeleton className="h-32 w-4/5" />
                <Skeleton className="h-60 w-full" />
              </div>
              <Skeleton className="h-[280px] w-full rounded-24" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
