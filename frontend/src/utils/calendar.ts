import type {
  ContentCalendarEntry,
  Platform,
  PositionedPost,
  PostType,
  ScheduledPostView,
} from '@/types/api';

const timeFormatter = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
});

export const ROW_HEIGHT = 220;
export const CARD_HEIGHT = 90;
export const CARD_GAP = 8;
export const DEFAULT_START_HOUR = 17;
export const DEFAULT_END_HOUR = 19;

export function formatScheduledTime(date: Date): string {
  return timeFormatter.format(date);
}

function entrySearchText(entry: ContentCalendarEntry): string {
  return `${entry.title} ${entry.content} ${entry.description} ${entry.link ?? ''}`.toLowerCase();
}

export function inferPlatform(entry: ContentCalendarEntry): Platform {
  return entrySearchText(entry).includes('instagram') ? 'instagram' : 'facebook';
}

export function inferPostType(entry: ContentCalendarEntry): PostType {
  const text = entrySearchText(entry);
  if (text.includes('reel')) return 'Reel';
  if (text.includes('story')) return 'Story';
  return 'Post';
}

export function getImageUrl(link: string | null): string | null {
  const trimmed = (link ?? '').trim();
  if (!trimmed) return null;
  if (/\.(png|jpe?g|gif|webp|avif)(\?.*)?$/i.test(trimmed)) return trimmed;
  return null;
}

export function toScheduledPosts(
  entries: ContentCalendarEntry[],
): ScheduledPostView[] {
  return entries
    .filter((entry) => entry.is_active)
    .map((entry) => {
      const scheduledAt = new Date(entry.date);
      if (Number.isNaN(scheduledAt.getTime())) return null;

      return {
        item: entry,
        platform: inferPlatform(entry),
        postType: inferPostType(entry),
        scheduledAt,
        timeLabel: formatScheduledTime(scheduledAt),
      };
    })
    .filter((post): post is ScheduledPostView => post !== null)
    .sort((a, b) => a.scheduledAt.getTime() - b.scheduledAt.getTime());
}

export function startOfWeek(date: Date): Date {
  const result = new Date(date);
  const day = result.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  result.setDate(result.getDate() + diff);
  result.setHours(0, 0, 0, 0);
  return result;
}

export function buildWeekDays(monday: Date): Date[] {
  return Array.from({ length: 7 }, (_, index) => {
    const day = new Date(monday);
    day.setDate(day.getDate() + index);
    return day;
  });
}

export function isSameDay(left: Date, right: Date): boolean {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}

export function toDatetimeLocalValue(date: Date): string {
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60_000).toISOString().slice(0, 16);
}

export function positionPostsInColumn(
  posts: ScheduledPostView[],
  startHour: number,
): PositionedPost[] {
  const sorted = [...posts].sort(
    (a, b) => a.scheduledAt.getTime() - b.scheduledAt.getTime(),
  );

  const positioned: PositionedPost[] = [];
  let lastBottom = Number.NEGATIVE_INFINITY;
  const startMinutes = startHour * 60;

  for (const post of sorted) {
    const minutesFromStart =
      post.scheduledAt.getHours() * 60 +
      post.scheduledAt.getMinutes() -
      startMinutes;
    const rawTop = (minutesFromStart / 60) * ROW_HEIGHT;
    const top = Math.max(rawTop, lastBottom + CARD_GAP);
    positioned.push({ post, top });
    lastBottom = top + CARD_HEIGHT;
  }

  return positioned;
}

export function groupEntriesByWeek(
  entries: ContentCalendarEntry[],
  anchorDate: Date,
): Map<string, ScheduledPostView[]> {
  const weekStart = startOfWeek(anchorDate);
  const weekDays = buildWeekDays(weekStart);
  const scheduled = toScheduledPosts(entries);
  const grouped = new Map<string, ScheduledPostView[]>();

  for (const day of weekDays) {
    const key = day.toISOString().slice(0, 10);
    grouped.set(key, []);
  }

  for (const post of scheduled) {
    for (const day of weekDays) {
      if (isSameDay(post.scheduledAt, day)) {
        const key = day.toISOString().slice(0, 10);
        grouped.get(key)?.push(post);
        break;
      }
    }
  }

  return grouped;
}

export function getHourSlots(startHour: number, endHour: number): number[] {
  if (startHour > endHour) return [];

  const slots: number[] = [];

  if (!Number.isInteger(startHour)) {
    slots.push(startHour);
  }

  const firstWholeHour = Number.isInteger(startHour)
    ? startHour
    : Math.ceil(startHour);

  for (let hour = firstWholeHour; hour <= endHour; hour += 1) {
    slots.push(hour);
  }

  return slots;
}

export function getHourOffsetPx(hour: number, startHour: number): number {
  return (hour - startHour) * ROW_HEIGHT;
}

export function formatHourLabel(hour: number): string {
  const wholeHour = Math.floor(hour);
  const minutes = Math.round((hour - wholeHour) * 60);
  const date = new Date();
  date.setHours(wholeHour, minutes, 0, 0);
  return timeFormatter.format(date);
}

export const monthYearFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  year: 'numeric',
});

export function formatMonthYear(date: Date): string {
  return monthYearFormatter.format(date);
}

const weekDayFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
});

export function formatWeekRange(weekStart: Date, weekEnd: Date): string {
  const startLabel = weekDayFormatter.format(weekStart);
  const endLabel = weekDayFormatter.format(weekEnd);
  return `${startLabel} – ${endLabel}`;
}

export function formatMemberSince(dateString: string): string {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export function formatContentDate(dateString: string): string {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;

  const datePart = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(date);

  const timePart = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);

  return `${datePart} · ${timePart}`;
}

export function formatDownloadDate(dateString: string): string {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(date);
}

export function getDisplayFirstName(): string {
  const firstName = localStorage.getItem('first_name');
  if (firstName) return firstName;

  const name =
    localStorage.getItem('name') ??
    localStorage.getItem('userName');

  if (name) return name.split(' ')[0] ?? name;
  return 'Joseph';
}

export function getDisplayFullName(): string {
  const firstName = localStorage.getItem('first_name');
  const lastName = localStorage.getItem('last_name');
  if (firstName && lastName) return `${firstName} ${lastName}`;

  const name =
    localStorage.getItem('name') ??
    localStorage.getItem('userName') ??
    firstName;

  if (name) return name;
  return 'Joseph Stanley';
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}
