import type { ProfileContentItem } from '../types/api';

const TIME_FORMAT = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
});

export function parseContentDate(value: string): Date | null {
  if (!value) {
    return null;
  }

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return parsed;
}

export function formatContentTimestamp(value: string): string {
  const parsed = parseContentDate(value);

  if (!parsed) {
    return value;
  }

  const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(
    parsed,
  );
  const day = String(parsed.getDate()).padStart(2, '0');
  const year = parsed.getFullYear();
  const time = TIME_FORMAT.format(parsed);

  return `${month} ${day}, ${year} • ${time}`;
}

export function getContentPreview(item: ProfileContentItem): string {
  const description = item.description.trim();

  if (description) {
    return description;
  }

  return item.content.trim();
}

export function getContentDateValue(item: ProfileContentItem): string {
  return item.date || item.created_at || item.updated_at;
}
