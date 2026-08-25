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
      <section className="home-grid-bg px-20 pb-80 lg:px-60">
        <div className="mx-auto grid max-w-canvas overflow-hidden rounded-28 lg:grid-cols-2">
          <div className="p-32 lg:p-48">
            <Skeleton className="h-32 w-3/5" />
            <Skeleton className="mt-16 h-60 w-full max-w-[480px]" />
            <Skeleton className="mt-32 h-[260px] w-full rounded-16" />
          </div>
          <div className="flex flex-col justify-center p-32 lg:p-48">
            <Skeleton className="h-40 w-4/5" />
            <Skeleton className="mt-20 h-48 w-full max-w-[420px]" />
            <Skeleton className="mt-32 h-44 w-[140px] rounded-1000" />
          </div>
        </div>
      </section>
      <section className="bg-secondary px-20 py-80 lg:px-60">
        <div className="mx-auto grid max-w-canvas items-start gap-40 lg:grid-cols-2">
          <div>
            <Skeleton className="h-40 w-[280px]" />
            <Skeleton className="mt-20 h-48 w-full max-w-[420px]" />
          </div>
          <div className="grid gap-16 sm:grid-cols-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton
                key={i}
                className={`h-[220px] w-full rounded-24 ${i === 1 ? "sm:mt-32" : ""}`}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="bg-color-16 px-20 py-80 lg:px-60">
        <div className="mx-auto grid max-w-canvas gap-16 lg:grid-cols-2">
          <Skeleton className="min-h-[480px] w-full rounded-28" />
          <div className="flex flex-col gap-16 rounded-28 p-32 lg:p-40">
            <Skeleton className="mx-auto h-48 w-48 rounded-1000" />
            <Skeleton className="mx-auto h-32 w-2/5" />
            <div className="grid gap-16 sm:grid-cols-2">
              <Skeleton className="h-52 w-full rounded-1000" />
              <Skeleton className="h-52 w-full rounded-1000" />
            </div>
            <div className="grid gap-16 sm:grid-cols-2">
              <Skeleton className="h-52 w-full rounded-1000" />
              <Skeleton className="h-52 w-full rounded-1000" />
            </div>
            <Skeleton className="h-52 w-full rounded-1000" />
            <Skeleton className="h-52 w-full rounded-1000" />
            <Skeleton className="h-[120px] w-full rounded-28" />
            <Skeleton className="mx-auto h-52 w-[220px] rounded-1000" />
          </div>
        </div>
      </section>
    </div>
  );
}
