import { Input } from "@/components/ui/Input";

interface DashboardSearchProps {
  value: string;
  onChange: (value: string) => void;
}

const searchIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
    <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export function DashboardSearch({ value, onChange }: DashboardSearchProps) {
  return (
    <Input
      label="Search dashboard"
      id="dashboard-search"
      type="search"
      inputSize="dashboard"
      hideLabel
      leadingIcon={searchIcon}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Generate captions, listing descriptions, email blasts, and Reels scripts in your brand voice."
    />
  );
}
