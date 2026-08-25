interface DashboardSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function DashboardSearch({ value, onChange }: DashboardSearchProps) {
  return (
    <label className="relative block w-full" htmlFor="dashboard-search">
      <span className="sr-only">Search dashboard</span>
      <span className="pointer-events-none absolute left-16 top-1/2 -translate-y-1/2 text-color-131" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
          <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </span>
      <input
        id="dashboard-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Generate captions, listing descriptions, email blasts, and Reels scripts in your brand voice."
        className="h-44 w-full rounded-1000 border border-color-111 bg-color-106 py-12 pl-44 pr-20 text-almarai-16-24 text-secondary placeholder:text-color-135 transition hover:border-accent focus-visible:border-accent"
      />
    </label>
  );
}
