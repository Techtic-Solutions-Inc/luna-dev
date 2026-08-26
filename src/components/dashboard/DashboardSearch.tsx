interface DashboardSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function DashboardSearch({ value, onChange }: DashboardSearchProps) {
  return (
    <div className="relative w-full">
      <svg
        className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-muted"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search dashboard"
        placeholder="Generate captions, listing descriptions, email blasts, and Reels scripts in your brand voice."
        className="h-[44px] w-full rounded-control border border-line bg-panel py-3 pl-12 pr-5 text-[16px] leading-6 text-ink placeholder:text-muted transition-colors hover:border-accent/60 focus-visible:border-accent focus-visible:outline-none"
      />
    </div>
  );
}
