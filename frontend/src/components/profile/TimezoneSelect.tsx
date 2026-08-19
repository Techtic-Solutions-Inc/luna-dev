export const TIMEZONE_OPTIONS = [
  {
    value: 'America/New_York',
    label: 'Time zone in Washington, DC, USA (GMT-4)',
  },
  {
    value: 'America/Chicago',
    label: 'Time zone in Chicago, IL, USA (GMT-5)',
  },
  {
    value: 'America/Denver',
    label: 'Time zone in Denver, CO, USA (GMT-6)',
  },
  {
    value: 'America/Los_Angeles',
    label: 'Time zone in Los Angeles, CA, USA (GMT-7)',
  },
  {
    value: 'America/Phoenix',
    label: 'Time zone in Phoenix, AZ, USA (GMT-7)',
  },
  {
    value: 'Pacific/Honolulu',
    label: 'Time zone in Honolulu, HI, USA (GMT-10)',
  },
] as const;

export const COUNTRY_OPTIONS = [
  'United States',
  'Canada',
  'United Kingdom',
  'Australia',
] as const;

export const STATE_OPTIONS = [
  'Alabama',
  'Alaska',
  'Arizona',
  'California',
  'Colorado',
  'District of Columbia',
  'Florida',
  'Georgia',
  'Illinois',
  'Massachusetts',
  'Nevada',
  'New York',
  'Texas',
  'Virginia',
  'Washington',
] as const;

interface TimezoneSelectProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function TimezoneSelect({
  id,
  value,
  onChange,
  error,
}: TimezoneSelectProps) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        className="focus-ring box-border h-11 w-full appearance-none rounded-[8px] border border-white/10 bg-[#26231f] px-4 pr-12 text-[14px] text-white focus-visible:border-primary"
      >
        <option value="">Select time zone</option>
        {TIMEZONE_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#A6A4A2]">
        ▾
      </span>
    </div>
  );
}
