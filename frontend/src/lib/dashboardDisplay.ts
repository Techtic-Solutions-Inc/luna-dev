import type { ContentCalendarItem } from '../types/api';
import {
  inferPostType,
  mediaImageUrl,
  startOfWeek,
  addDays,
  isSameDay,
} from './contentCalendarDisplay';

export function getDashboardFirstName(): string {
  const firstName = localStorage.getItem('first_name');
  if (firstName) {
    return firstName;
  }

  const stored =
    localStorage.getItem('name') ?? localStorage.getItem('userName');

  if (stored) {
    return stored.split(' ')[0] ?? stored;
  }

  return 'Ava';
}

export function getTimeOfDayGreeting(): string {
  const hour = new Date().getHours();

  if (hour < 12) {
    return 'Good Morning';
  }

  if (hour < 17) {
    return 'Good Afternoon';
  }

  return 'Good Evening';
}

const RELATIVE_TIME = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

export function formatRelativeTimestamp(value: string): string {
  if (!value) {
    return '';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  const now = Date.now();
  const diffMs = date.getTime() - now;
  const diffMinutes = Math.round(diffMs / 60_000);
  const diffHours = Math.round(diffMs / 3_600_000);
  const diffDays = Math.round(diffMs / 86_400_000);

  if (Math.abs(diffMinutes) < 60) {
    return RELATIVE_TIME.format(diffMinutes, 'minute');
  }

  if (Math.abs(diffHours) < 24) {
    return RELATIVE_TIME.format(diffHours, 'hour');
  }

  if (Math.abs(diffDays) <= 7) {
    return RELATIVE_TIME.format(diffDays, 'day');
  }

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

const DAY_LABEL = new Intl.DateTimeFormat('en-US', { weekday: 'short' });
const MONTH_DAY_LABEL = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: '2-digit',
});

export interface DashboardWeekDay {
  date: Date;
  dayLabel: string;
  monthDayLabel: string;
  items: ContentCalendarItem[];
}

export function buildWeekDays(
  items: ContentCalendarItem[],
  referenceDate = new Date(),
): DashboardWeekDay[] {
  const weekStart = startOfWeek(referenceDate);
  const activeItems = items.filter((item) => item.is_active);

  return Array.from({ length: 5 }, (_, index) => {
    const date = addDays(weekStart, index);

    return {
      date,
      dayLabel: DAY_LABEL.format(date).toUpperCase(),
      monthDayLabel: MONTH_DAY_LABEL.format(date).toUpperCase(),
      items: activeItems.filter((item) => {
        const scheduledAt = new Date(item.date);
        return !Number.isNaN(scheduledAt.getTime()) && isSameDay(scheduledAt, date);
      }),
    };
  });
}

export function getPrimaryItemForDay(
  day: DashboardWeekDay,
): ContentCalendarItem | null {
  if (day.items.length === 0) {
    return null;
  }

  return day.items[0] ?? null;
}

export function getContentTypeLabel(item: ContentCalendarItem | null): string {
  if (!item) {
    return 'Post';
  }

  const postType = inferPostType(item);

  if (postType === 'Reel') {
    return 'Reels';
  }

  if (postType === 'Story') {
    return 'Story';
  }

  const haystack =
    `${item.title} ${item.content} ${item.description}`.toLowerCase();

  if (haystack.includes('email')) {
    return 'Email';
  }

  return 'Post';
}

export function getCardImageUrl(item: ContentCalendarItem | null): string | null {
  if (!item) {
    return null;
  }

  return (
    mediaImageUrl(item.link) ??
    mediaImageUrl(item.content) ??
    mediaImageUrl(item.description)
  );
}

export function getCardOverlayText(item: ContentCalendarItem | null): string {
  if (!item) {
    return '';
  }

  if (item.description) {
    return item.description;
  }

  if (item.title) {
    return item.title;
  }

  return item.content;
}

const CARD_GRADIENTS = [
  'linear-gradient(180deg, rgba(12,12,12,0.15) 0%, rgba(12,12,12,0.85) 100%), linear-gradient(135deg, #3d342c 0%, #1a1614 100%)',
  'linear-gradient(180deg, rgba(12,12,12,0.15) 0%, rgba(12,12,12,0.85) 100%), linear-gradient(135deg, #4a4036 0%, #231a17 100%)',
  'linear-gradient(180deg, rgba(12,12,12,0.15) 0%, rgba(12,12,12,0.85) 100%), linear-gradient(135deg, #2f271f 0%, #14100d 100%)',
  'linear-gradient(180deg, rgba(12,12,12,0.15) 0%, rgba(12,12,12,0.85) 100%), linear-gradient(135deg, #473e33 0%, #1c1916 100%)',
  'linear-gradient(180deg, rgba(12,12,12,0.15) 0%, rgba(12,12,12,0.85) 100%), linear-gradient(135deg, #332e28 0%, #0f0f0f 100%)',
];

export function getCardGradient(index: number): string {
  return CARD_GRADIENTS[index % CARD_GRADIENTS.length] ?? CARD_GRADIENTS[0];
}
