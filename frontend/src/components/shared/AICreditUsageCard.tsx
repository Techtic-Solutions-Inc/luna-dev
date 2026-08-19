interface AICreditUsageCardProps {
  used?: number;
  limit?: number;
  loading?: boolean;
}

export function AICreditUsageCard({
  used = 1420,
  limit = 5000,
  loading = false,
}: AICreditUsageCardProps) {
  const percentage = Math.min((used / limit) * 100, 100);

  if (loading) {
    return (
      <section
        aria-busy="true"
        aria-label="Loading AI credit usage"
        className="rounded-[10px] border border-color-22 bg-color-20 px-3 py-3"
      >
        <div className="h-3 w-24 animate-pulse rounded bg-white/10" />
        <div className="mt-3 h-3 w-full animate-pulse rounded bg-white/10" />
        <div className="mt-3 h-[3px] animate-pulse rounded-full bg-white/10" />
      </section>
    );
  }

  return (
    <section
      aria-label="AI credit usage"
      className="rounded-[10px] border border-color-22 bg-color-20 px-3 py-3"
    >
      <h2 className="text-[11px] font-bold text-white">AI Credit Usage</h2>
      <div className="mt-2 flex items-center justify-between text-[11px] text-white">
        <span>Current</span>
        <span>
          {used.toLocaleString('en-US')} / {limit.toLocaleString('en-US')}
        </span>
      </div>
      <div
        className="mt-2 h-[3px] overflow-hidden rounded-full bg-white/10"
        role="progressbar"
        aria-valuenow={used}
        aria-valuemin={0}
        aria-valuemax={limit}
        aria-label="AI credit usage"
      >
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-200"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </section>
  );
}
