import type { ContentCalendarItem, DashboardActivity } from '../types/api';
import { inferPostType } from './contentCalendarDisplay';

const WEEKDAY_FORMAT = new Intl.DateTimeFormat('en-US', { weekday: 'short' });
const MONTH_FORMAT = new Intl.DateTimeFormat('en-US', { month: 'short' });
const DAY_MONTH_FORMAT = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
});

export type DashboardContentKind = 'Reels' | 'Story' | 'Email' | 'Post';

export function parseDashboardDate(value: string): Date | null {
  if (!value) {
    return null;
  }

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return parsed;
}

export function formatWeekdayLabel(date: Date): string {
  return WEEKDAY_FORMAT.format(date).toUpperCase();
}

export function formatMonthDayLabel(date: Date): string {
  const month = MONTH_FORMAT.format(date).toUpperCase();
  const day = String(date.getDate()).padStart(2, '0');
  return `${month}, ${day}`;
}

export function inferDashboardContentKind(
  item: ContentCalendarItem,
  index: number,
): DashboardContentKind {
  const haystack = `${item.content} ${item.description} ${item.title} ${item.link}`.toLowerCase();

  if (haystack.includes('email') || haystack.includes('blast')) {
    return 'Email';
  }

  if (haystack.includes('reel')) {
    return 'Reels';
  }

  if (haystack.includes('story')) {
    return 'Story';
  }

  const postType = inferPostType(item, index);

  if (postType === 'Reel') {
    return 'Reels';
  }

  return postType;
}

export function formatRelativeTimestamp(value: string): string {
  const parsed = parseDashboardDate(value);

  if (!parsed) {
    return value;
  }

  const now = new Date();
  const diffMs = now.getTime() - parsed.getTime();
  const diffMinutes = Math.round(diffMs / 60_000);

  if (diffMinutes < 1) {
    return 'Just now';
  }

  if (diffMinutes < 60) {
    return `${diffMinutes}m ago`;
  }

  const diffHours = Math.round(diffMinutes / 60);

  if (diffHours < 24) {
    return diffHours <= 1 ? '1h ago' : `${diffHours}h ago`;
  }

  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);
  const startOfParsed = new Date(parsed);
  startOfParsed.setHours(0, 0, 0, 0);
  const diffDays = Math.round(
    (startOfToday.getTime() - startOfParsed.getTime()) / 86_400_000,
  );

  if (diffDays === 1) {
    return 'Yesterday';
  }

  if (diffDays < 7) {
    return `${diffDays}d ago`;
  }

  return DAY_MONTH_FORMAT.format(parsed);
}

export function resolveDashboardFirstName(items: ContentCalendarItem[]): string {
  const fromItem = items.find((item) => item.full_name.trim())?.full_name.trim();

  if (fromItem) {
    return fromItem.split(' ')[0] || fromItem;
  }

  const stored =
    localStorage.getItem('first_name') ??
    localStorage.getItem('name') ??
    localStorage.getItem('userName');

  if (stored) {
    return stored.split(' ')[0] ?? stored;
  }

  return 'Ava';
}

export function greetingForHour(hour: number): string {
  if (hour < 12) {
    return 'Good Morning';
  }

  if (hour < 18) {
    return 'Good Afternoon';
  }

  return 'Good Evening';
}

export function mediaImageUrl(value: string): string | null {
  const candidate = value.trim();

  if (!candidate) {
    return null;
  }

  if (/\.(png|jpe?g|gif|webp|avif)(\?.*)?$/i.test(candidate)) {
    return candidate;
  }

  return null;
}

export function activitiesFromCalendar(
  items: ContentCalendarItem[],
): DashboardActivity[] {
  return [...items]
    .sort((left, right) => {
      const leftDate = parseDashboardDate(left.updated_at || left.date);
      const rightDate = parseDashboardDate(right.updated_at || right.date);
      return (rightDate?.getTime() ?? 0) - (leftDate?.getTime() ?? 0);
    })
    .slice(0, 5)
    .map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description || item.content,
      date: item.updated_at || item.date,
    }));
}
