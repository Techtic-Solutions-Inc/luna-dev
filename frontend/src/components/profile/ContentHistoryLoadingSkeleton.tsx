export function ContentHistoryLoadingSkeleton() {
  return (
    <div className="space-y-4" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-[12px] border border-white/5 bg-[#26231f] p-4 md:p-5"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="h-4 w-2/3 max-w-[280px] rounded bg-white/10" />
            <div className="h-4 w-10 rounded bg-white/10" />
          </div>
          <div className="mt-3 space-y-2">
            <div className="h-3 w-full rounded bg-white/10" />
            <div className="h-3 w-4/5 rounded bg-white/10" />
          </div>
          <div className="mt-4 h-3 w-32 rounded bg-white/10" />
        </div>
      ))}
    </div>
  );
}
