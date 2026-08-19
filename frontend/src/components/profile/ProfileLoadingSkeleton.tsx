export function ProfileLoadingSkeleton() {
  return (
    <div className="mt-10 space-y-10 rounded-[16px] border border-white/5 bg-[#1f1b17] p-6 md:rounded-[20px] md:space-y-12 md:p-8">
      <div className="space-y-6">
        <div className="h-6 w-40 animate-pulse rounded bg-white/10" />
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <div className="h-4 w-24 animate-pulse rounded bg-white/10" />
              <div className="h-11 animate-pulse rounded-[8px] bg-white/10" />
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <div className="h-4 w-16 animate-pulse rounded bg-white/10" />
          <div className="h-[120px] animate-pulse rounded-[8px] bg-white/10" />
        </div>
      </div>
      <div className="space-y-4">
        <div className="h-6 w-32 animate-pulse rounded bg-white/10" />
        <div className="h-11 animate-pulse rounded-[8px] bg-white/10" />
      </div>
      <div className="space-y-4">
        <div className="h-6 w-24 animate-pulse rounded bg-white/10" />
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-11 animate-pulse rounded-[8px] bg-white/10" />
          ))}
        </div>
      </div>
    </div>
  );
}
