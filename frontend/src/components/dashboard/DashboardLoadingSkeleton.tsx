export function DashboardLoadingSkeleton() {
  return (
    <div className="space-y-8 md:space-y-12" aria-busy="true" aria-label="Loading dashboard">
      <div>
        <div className="h-10 w-64 max-w-full animate-pulse rounded bg-white/10 sm:h-12 sm:w-80" />
        <div className="mt-3 h-5 w-full max-w-[720px] animate-pulse rounded bg-white/10" />
        <div className="mt-2 h-5 w-4/5 max-w-[600px] animate-pulse rounded bg-white/10" />
      </div>

      <div className="h-[52px] w-full animate-pulse rounded-full bg-white/10" />

      <div className="flex gap-3">
        <div className="h-11 w-36 animate-pulse rounded-full bg-white/10" />
        <div className="h-11 w-44 animate-pulse rounded-full bg-white/10" />
      </div>

      <div className="flex gap-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={`preview-skeleton-${index}`}
            className="h-[120px] w-[72px] animate-pulse rounded-[10px] bg-white/10 sm:w-[88px]"
          />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="h-[120px] animate-pulse rounded-[16px] bg-white/10 md:rounded-[20px]" />
        <div className="h-[120px] animate-pulse rounded-[16px] bg-white/10 md:rounded-[20px]" />
      </div>

      <div className="h-[140px] animate-pulse rounded-[16px] bg-white/10 md:rounded-[20px]" />

      <div className="flex gap-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={`calendar-skeleton-${index}`}
            className="h-[220px] w-[140px] animate-pulse rounded-[14px] bg-white/10 sm:w-[160px]"
          />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="h-[280px] animate-pulse rounded-[16px] bg-white/10 md:rounded-[20px]" />
        <div className="h-[280px] animate-pulse rounded-[16px] bg-white/10 md:rounded-[20px]" />
      </div>
    </div>
  );
}
