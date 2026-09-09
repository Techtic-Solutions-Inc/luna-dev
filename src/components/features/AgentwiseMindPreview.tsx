/** Coded UI preview for "Agentwise Ultimate Mind" — not a screenshot */
export function AgentwiseMindPreview() {
  return (
    <div
      className="home-page__mind-preview overflow-hidden rounded-[16px] border p-[16px] shadow-lg"
      role="img"
      aria-label="Agentwise Ultimate Mind dashboard preview"
    >
      <div className="mb-[12px] flex items-center justify-between">
        <span className="font-garamond text-[18px] font-medium leading-[24px] [color:var(--token-primary)]">
          Agentwise Ultimate Mind
        </span>
        <div className="flex gap-[6px]">
          <span className="h-[8px] w-[8px] rounded-full [background-color:var(--token-border)]" />
          <span className="h-[8px] w-[8px] rounded-full [background-color:var(--token-background)]" />
          <span className="h-[8px] w-[8px] rounded-full [background-color:var(--token-background)]" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-[8px]">
        {['Leads', 'Content', 'Insights'].map((label) => (
          <div key={label} className="home-page__mind-cell rounded-[8px] border p-[10px]">
            <p className="font-almarai text-[10px] leading-[11px] [color:var(--token-background)]">
              {label}
            </p>
            <p className="mt-[4px] font-almarai text-[14px] font-bold leading-[15.624px] [color:var(--token-primary)]">
              —
            </p>
          </div>
        ))}
      </div>
      <div className="mt-[12px] grid grid-cols-[1fr_2fr] gap-[8px]">
        <div className="home-page__mind-cell rounded-[8px] border p-[10px]">
          <p className="font-almarai text-[10px] [color:var(--token-background)]">AI Advisor</p>
          <div className="mt-[8px] space-y-[4px]">
            <div className="h-[6px] w-full rounded-full [background-color:var(--token-background)]/40" />
            <div className="h-[6px] w-4/5 rounded-full [background-color:var(--token-background)]/40" />
            <div className="h-[6px] w-3/5 rounded-full [background-color:var(--token-border)]" />
          </div>
        </div>
        <div className="home-page__mind-cell rounded-[8px] border p-[10px]">
          <p className="font-almarai text-[10px] [color:var(--token-background)]">
            Marketing Queue
          </p>
          <div className="mt-[8px] flex gap-[4px]">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="h-[40px] flex-1 rounded-[4px] border [border-color:var(--token-background)]/30 [background-color:var(--token-surface-dark)]"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
