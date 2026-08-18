import type { ProfileDownloadItem } from '../types/api';

const DATE_FORMAT = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: '2-digit',
  year: 'numeric',
});

const SIZE_UNITS = ['B', 'KB', 'MB', 'GB'] as const;

export function parseDownloadDate(value: string): Date | null {
  if (!value) {
    return null;
  }

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return parsed;
}

export function formatDownloadDate(value: string): string {
  const parsed = parseDownloadDate(value);

  if (!parsed) {
    return value;
  }

  return DATE_FORMAT.format(parsed);
}

export function formatFileSize(size: string): string {
  const trimmed = size.trim();

  if (!trimmed) {
    return '';
  }

  if (/[a-zA-Z]/.test(trimmed)) {
    return trimmed;
  }

  const bytes = Number(trimmed);

  if (!Number.isFinite(bytes) || bytes < 0) {
    return trimmed;
  }

  if (bytes < 1024) {
    return `${Math.round(bytes)} B`;
  }

  let value = bytes;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < SIZE_UNITS.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  const formatted =
    value >= 10 || unitIndex === 0
      ? String(Math.round(value))
      : value.toFixed(1).replace(/\.0$/, '');

  return `${formatted} ${SIZE_UNITS[unitIndex]}`;
}

export function getDownloadDateValue(item: ProfileDownloadItem): string {
  return item.date || item.created_at || item.updated_at;
}

export function formatDownloadMeta(item: ProfileDownloadItem): string {
  return [item.file_type, formatFileSize(item.size), formatDownloadDate(getDownloadDateValue(item))]
    .map((part) => part.trim())
    .filter((part) => part.length > 0)
    .join(' · ');
}
