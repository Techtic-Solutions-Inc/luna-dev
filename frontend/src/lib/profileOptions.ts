export interface SelectOption {
  value: string;
  label: string;
}

export const TIME_ZONE_OPTIONS: SelectOption[] = [
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
    value: 'America/Anchorage',
    label: 'Time zone in Anchorage, AK, USA (GMT-8)',
  },
  {
    value: 'Pacific/Honolulu',
    label: 'Time zone in Honolulu, HI, USA (GMT-10)',
  },
];

export const COUNTRY_OPTIONS: SelectOption[] = [
  { value: 'United States', label: 'United States' },
  { value: 'Canada', label: 'Canada' },
  { value: 'United Kingdom', label: 'United Kingdom' },
  { value: 'Australia', label: 'Australia' },
  { value: 'Mexico', label: 'Mexico' },
];

export const STATE_OPTIONS: SelectOption[] = [
  { value: 'Alabama', label: 'Alabama' },
  { value: 'Alaska', label: 'Alaska' },
  { value: 'Arizona', label: 'Arizona' },
  { value: 'Arkansas', label: 'Arkansas' },
  { value: 'California', label: 'California' },
  { value: 'Colorado', label: 'Colorado' },
  { value: 'Connecticut', label: 'Connecticut' },
  { value: 'Delaware', label: 'Delaware' },
  { value: 'District of Columbia', label: 'District of Columbia' },
  { value: 'Florida', label: 'Florida' },
  { value: 'Georgia', label: 'Georgia' },
  { value: 'Hawaii', label: 'Hawaii' },
  { value: 'Idaho', label: 'Idaho' },
  { value: 'Illinois', label: 'Illinois' },
  { value: 'Indiana', label: 'Indiana' },
  { value: 'Iowa', label: 'Iowa' },
  { value: 'Kansas', label: 'Kansas' },
  { value: 'Kentucky', label: 'Kentucky' },
  { value: 'Louisiana', label: 'Louisiana' },
  { value: 'Maine', label: 'Maine' },
  { value: 'Maryland', label: 'Maryland' },
  { value: 'Massachusetts', label: 'Massachusetts' },
  { value: 'Michigan', label: 'Michigan' },
  { value: 'Minnesota', label: 'Minnesota' },
  { value: 'Mississippi', label: 'Mississippi' },
  { value: 'Missouri', label: 'Missouri' },
  { value: 'Montana', label: 'Montana' },
  { value: 'Nebraska', label: 'Nebraska' },
  { value: 'Nevada', label: 'Nevada' },
  { value: 'New Hampshire', label: 'New Hampshire' },
  { value: 'New Jersey', label: 'New Jersey' },
  { value: 'New Mexico', label: 'New Mexico' },
  { value: 'New York', label: 'New York' },
  { value: 'North Carolina', label: 'North Carolina' },
  { value: 'North Dakota', label: 'North Dakota' },
  { value: 'Ohio', label: 'Ohio' },
  { value: 'Oklahoma', label: 'Oklahoma' },
  { value: 'Oregon', label: 'Oregon' },
  { value: 'Pennsylvania', label: 'Pennsylvania' },
  { value: 'Rhode Island', label: 'Rhode Island' },
  { value: 'South Carolina', label: 'South Carolina' },
  { value: 'South Dakota', label: 'South Dakota' },
  { value: 'Tennessee', label: 'Tennessee' },
  { value: 'Texas', label: 'Texas' },
  { value: 'Utah', label: 'Utah' },
  { value: 'Vermont', label: 'Vermont' },
  { value: 'Virginia', label: 'Virginia' },
  { value: 'Washington', label: 'Washington' },
  { value: 'West Virginia', label: 'West Virginia' },
  { value: 'Wisconsin', label: 'Wisconsin' },
  { value: 'Wyoming', label: 'Wyoming' },
];

export function withCurrentOption(
  options: SelectOption[],
  current: string,
): SelectOption[] {
  if (!current.trim()) {
    return options;
  }

  const exists = options.some(
    (option) => option.value === current || option.label === current,
  );

  if (exists) {
    return options;
  }

  return [{ value: current, label: current }, ...options];
}

export function resolveSelectValue(
  options: SelectOption[],
  current: string,
): string {
  if (!current) {
    return '';
  }

  const byValue = options.find((option) => option.value === current);
  if (byValue) {
    return byValue.value;
  }

  const byLabel = options.find((option) => option.label === current);
  if (byLabel) {
    return byLabel.value;
  }

  return current;
}
