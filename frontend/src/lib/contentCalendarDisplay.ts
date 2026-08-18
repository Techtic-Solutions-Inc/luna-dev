import type { ContentCalendarItem } from '../types/api';

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

export function inferPlatform(item: ContentCalendarItem, index: number): ContentPlatform {
  const link = item.link.toLowerCase();
  const content = item.content.toLowerCase();

  if (link.includes('instagram') || content.includes('instagram')) {
    return 'instagram';
  }

  if (link.includes('facebook') || content.includes('facebook')) {
    return 'facebook';
  }

  return index % 2 === 0 ? 'facebook' : 'instagram';
}

export function inferPostType(item: ContentCalendarItem, index: number): ContentPostType {
  const haystack = `${item.content} ${item.description} ${item.link}`.toLowerCase();

  if (haystack.includes('reel')) {
    return 'Reel';
  }

  if (haystack.includes('story')) {
    return 'Story';
  }

  return index % 3 === 1 ? 'Story' : 'Post';
}

export function formatContentBadge(
  item: ContentCalendarItem,
  index: number,
): string {
  const platform = inferPlatform(item, index);
  const platformLabel = platform === 'instagram' ? 'Instagram' : 'Facebook';
  const haystack = `${item.content} ${item.description} ${item.link}`.toLowerCase();

  if (haystack.includes('reel')) {
    return `${platformLabel} Reel`;
  }

  const postType = inferPostType(item, index);
  return `${platformLabel} ${postType}`;
}

export function mapItemsToScheduledPosts(
  items: ContentCalendarItem[],
): ScheduledPostDisplay[] {
  return items
    .map((item, index) => {
      const scheduledAt = new Date(item.date);

      if (Number.isNaN(scheduledAt.getTime())) {
        return null;
      }

      return {
        item,
        platform: inferPlatform(item, index),
        postType: inferPostType(item, index),
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

const DEFAULT_TIME_SLOTS: ReadonlyArray<readonly [number, number]> = [
  [16, 45],
  [17, 0],
  [17, 30],
  [18, 0],
  [18, 15],
  [18, 20],
  [18, 30],
  [19, 0],
];

function slotTimestamp(hour: number, minute: number): number {
  const slot = new Date();
  slot.setHours(hour, minute, 0, 0);
  return slot.getTime();
}

export function buildTimeSlots(posts: ScheduledPostDisplay[]): string[] {
  const slotLabels = new Map<string, number>();

  for (const [hour, minute] of DEFAULT_TIME_SLOTS) {
    const timestamp = slotTimestamp(hour, minute);
    slotLabels.set(formatTimeLabel(new Date(timestamp)), timestamp);
  }

  for (const post of posts) {
    if (!slotLabels.has(post.timeLabel)) {
      slotLabels.set(post.timeLabel, post.scheduledAt.getTime());
    }
  }

  return Array.from(slotLabels.entries())
    .sort(([, left], [, right]) => left - right)
    .map(([label]) => label);
}

export function timeLabelMatchesPost(
  timeLabel: string,
  post: ScheduledPostDisplay,
): boolean {
  return post.timeLabel === timeLabel;
}
