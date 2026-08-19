export function CalendarLoadingSkeleton() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="h-10 w-3/4 max-w-xl animate-pulse rounded bg-white/10" />
        <div className="h-5 w-full max-w-2xl animate-pulse rounded bg-white/10" />
        <div className="h-5 w-5/6 max-w-xl animate-pulse rounded bg-white/10" />
      </div>
      <div className="rounded-[20px] bg-[#FFF7ED] p-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="h-7 w-32 animate-pulse rounded bg-[#E5DACE]" />
          <div className="flex gap-2">
            <div className="h-9 w-9 animate-pulse rounded-full bg-[#E5DACE]" />
            <div className="h-9 w-9 animate-pulse rounded-full bg-[#E5DACE]" />
          </div>
        </div>
        <div className="min-w-[1100px] space-y-3">
          <div className="grid grid-cols-[96px_repeat(7,minmax(0,1fr))] gap-2 lg:grid-cols-[160px_repeat(7,minmax(0,1fr))]">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="h-8 animate-pulse rounded bg-[#E5DACE]" />
            ))}
          </div>
          {Array.from({ length: 4 }).map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="grid grid-cols-[96px_repeat(7,minmax(0,1fr))] gap-2 lg:grid-cols-[160px_repeat(7,minmax(0,1fr))]"
            >
              {Array.from({ length: 8 }).map((_, colIndex) => (
                <div key={colIndex} className="h-[120px] animate-pulse rounded bg-[#E5DACE]/70" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
