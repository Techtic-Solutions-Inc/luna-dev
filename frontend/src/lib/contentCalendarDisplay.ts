import type { ContentCalendarItem, ContentCalendarPayload } from '../types/api';

export type ContentPlatform = 'facebook' | 'instagram';
export type ContentPostType = 'Post' | 'Story' | 'Reel';

export interface ScheduledPostDisplay {
  item: ContentCalendarItem;
  platform: ContentPlatform;
  postType: ContentPostType;
  scheduledAt: Date;
  timeLabel: string;
}

const TIME_FORMAT = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
});

export function formatTimeLabel(date: Date): string {
  return TIME_FORMAT.format(date);
}

function haystackFor(item: ContentCalendarItem): string {
  return `${item.title} ${item.content} ${item.description} ${item.link}`.toLowerCase();
}

export function inferPlatform(item: ContentCalendarItem): ContentPlatform {
  const haystack = haystackFor(item);

  if (haystack.includes('instagram')) {
    return 'instagram';
  }

  return 'facebook';
}

export function inferPostType(item: ContentCalendarItem): ContentPostType {
  const haystack = haystackFor(item);

  if (haystack.includes('reel')) {
    return 'Reel';
  }

  if (haystack.includes('story')) {
    return 'Story';
  }

  return 'Post';
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

export function mapItemsToScheduledPosts(
  items: ContentCalendarItem[],
): ScheduledPostDisplay[] {
  return items
    .filter((item) => item.is_active)
    .map((item) => {
      const scheduledAt = new Date(item.date);

      if (Number.isNaN(scheduledAt.getTime())) {
        return null;
      }

      return {
        item,
        platform: inferPlatform(item),
        postType: inferPostType(item),
        scheduledAt,
        timeLabel: formatTimeLabel(scheduledAt),
      };
    })
    .filter((entry): entry is ScheduledPostDisplay => entry !== null)
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

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function toLocalInputValue(date: Date): string {
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60_000).toISOString().slice(0, 16);
}

export function toContentPayload(
  item: Pick<
    ContentCalendarItem,
    | 'title'
    | 'date'
    | 'content'
    | 'description'
    | 'full_name'
    | 'phone'
    | 'link'
    | 'is_active'
  >,
  overrides: Partial<ContentCalendarPayload> = {},
): ContentCalendarPayload {
  return {
    title: item.title,
    date: item.date,
    content: item.content,
    description: item.description,
    full_name: item.full_name,
    phone: item.phone,
    link: item.link,
    is_active: item.is_active,
    ...overrides,
  };
}

export interface CalendarEditorState {
  id?: string;
  title: string;
  date: string;
  content: string;
  description: string;
  full_name: string;
  phone: string;
  link: string;
  is_active: boolean;
}

export const emptyCalendarEditor: CalendarEditorState = {
  title: '',
  date: '',
  content: '',
  description: '',
  full_name: '',
  phone: '',
  link: '',
  is_active: true,
};
