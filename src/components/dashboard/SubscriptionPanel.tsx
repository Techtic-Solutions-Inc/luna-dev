interface SubscriptionPanelProps {
  currentCredits: number;
  totalCredits: number;
  contentGenerated?: number;
  downloads?: number;
}

export function SubscriptionPanel({
  currentCredits,
  totalCredits,
  contentGenerated,
  downloads,
}: SubscriptionPanelProps) {
  const usedPercent =
    totalCredits > 0 ? Math.min(100, (currentCredits / totalCredits) * 100) : 0;

  return (
    <section id="subscription" aria-labelledby="subscription-heading">
      <h2
        id="subscription-heading"
        className="mb-4 text-[24px] font-medium leading-8 text-ink"
      >
        Subscription
      </h2>
      <div className="rounded-section border border-line bg-panel p-6">
        <div className="mb-6">
          <p className="text-[14px] text-muted">AI Credits</p>
          <p className="mt-1 text-[32px] font-medium leading-[41.76px] text-accent">
            {currentCredits.toLocaleString()}
            <span className="text-[18px] text-muted">
              {' '}
              / {totalCredits.toLocaleString()}
            </span>
          </p>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#44413e]">
            <div
              className="h-full rounded-full bg-accent transition-all"
              style={{ width: `${usedPercent}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {downloads !== undefined && (
            <div className="rounded-control border border-line bg-card p-4">
              <p className="text-[14px] text-muted">Downloads</p>
              <p className="mt-1 text-[32px] font-medium leading-[41.76px] text-accent">
                {downloads.toLocaleString()}
              </p>
            </div>
          )}
          {contentGenerated !== undefined && (
            <div className="rounded-control border border-line bg-card p-4">
              <p className="text-[14px] text-muted">Content Generated</p>
              <p className="mt-1 text-[32px] font-medium leading-[41.76px] text-accent">
                {contentGenerated.toLocaleString()}
              </p>
            </div>
          )}
        </div>

        <p className="mt-4 text-[14px] text-muted">
          Subscription details are read-only. Contact support to manage your plan.
        </p>
      </div>
    </section>
  );
}
