export function DashboardLoadingSkeleton() {
  return (
    <div className="space-y-8 md:space-y-12" aria-busy="true" aria-label="Loading dashboard">
      <div>
        <div className="h-10 w-64 max-w-full animate-pulse rounded bg-white/10 sm:h-12 sm:w-80" />
        <div className="mt-3 h-5 w-full max-w-[720px] animate-pulse rounded bg-white/10" />
        <div className="mt-2 h-5 w-4/5 max-w-[600px] animate-pulse rounded bg-white/10" />
      </div>

      <div className="rounded-[16px] border border-white/5 bg-[#1f1b17]/90 p-5 md:rounded-[20px] md:p-6 lg:p-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="space-y-4">
            <div className="h-7 w-3/4 max-w-[420px] animate-pulse rounded bg-white/10" />
            <div className="h-5 w-full max-w-[560px] animate-pulse rounded bg-white/10" />
            <div className="h-[52px] w-full animate-pulse rounded-full bg-white/10" />
            <div className="flex gap-3">
              <div className="h-11 w-36 animate-pulse rounded-full bg-white/10" />
              <div className="h-11 w-44 animate-pulse rounded-full bg-white/10" />
            </div>
          </div>
          <div className="h-[220px] animate-pulse rounded-[16px] bg-white/10 md:h-[260px] md:rounded-[20px]" />
        </div>
      </div>

      <div>
        <div className="mb-4 h-8 w-56 animate-pulse rounded bg-white/10" />
        <div className="flex gap-3 md:gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={`preview-skeleton-${index}`}
              className="h-[220px] w-[140px] animate-pulse rounded-[14px] bg-white/10 sm:w-[160px] md:w-[180px]"
            />
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="h-[120px] animate-pulse rounded-[16px] bg-white/10 md:rounded-[20px]" />
        <div className="h-[120px] animate-pulse rounded-[16px] bg-white/10 md:rounded-[20px]" />
      </div>

      <div className="h-[140px] animate-pulse rounded-[16px] bg-white/10 md:rounded-[20px]" />

      <div>
        <div className="mb-4 h-8 w-64 animate-pulse rounded bg-white/10" />
        <div className="flex gap-3 md:gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={`calendar-skeleton-${index}`}
              className="h-[220px] w-[140px] animate-pulse rounded-[14px] bg-white/10 sm:w-[160px]"
            />
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="h-[280px] animate-pulse rounded-[16px] bg-white/10 md:rounded-[20px]" />
        <div className="h-[280px] animate-pulse rounded-[16px] bg-white/10 md:rounded-[20px]" />
      </div>
    </div>
  );
}
