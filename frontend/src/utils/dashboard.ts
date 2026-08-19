import type { ContentCalendarEntry, PromptLibraryItem } from '@/types/api';
import {
  buildWeekDays,
  getDisplayFirstName,
  getImageUrl,
  inferPostType,
  startOfWeek,
} from '@/utils/calendar';

export function getTimeBasedGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
}

export function getGreetingHeadline(): string {
  return `${getTimeBasedGreeting()}, ${getDisplayFirstName()}.`;
}

export function formatAnnouncementTimestamp(dateString: string): string {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffHours < 1) return 'Just now';
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(date);
}

export function getWeekdayLabel(date: Date): string {
  return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date).toUpperCase();
}

export function getMonthDayLabel(date: Date): string {
  const month = new Intl.DateTimeFormat('en-US', { month: 'short' })
    .format(date)
    .toUpperCase();
  const day = String(date.getDate()).padStart(2, '0');
  return `${month} ${day}`;
}

export interface WeekPreviewEntry {
  entry: ContentCalendarEntry;
  day: Date;
  postType: string;
  imageUrl: string | null;
  overlayText: string;
}

export function getWeekPreviewEntries(
  entries: ContentCalendarEntry[],
  maxCount = 5,
): WeekPreviewEntry[] {
  const weekStart = startOfWeek(new Date());
  const weekDays = buildWeekDays(weekStart).slice(0, 5);
  const activeEntries = entries.filter((entry) => entry.is_active);

  const previews: WeekPreviewEntry[] = [];

  for (const day of weekDays) {
    const dayEntries = activeEntries
      .filter((entry) => {
        const entryDate = new Date(entry.date);
        return (
          entryDate.getFullYear() === day.getFullYear() &&
          entryDate.getMonth() === day.getMonth() &&
          entryDate.getDate() === day.getDate()
        );
      })
      .sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      );

    const entry = dayEntries[0];
    if (!entry) continue;

    previews.push({
      entry,
      day,
      postType: inferPostType(entry),
      imageUrl: getImageUrl(entry.link),
      overlayText: entry.title || entry.content.slice(0, 60),
    });
  }

  if (previews.length >= maxCount) {
    return previews.slice(0, maxCount);
  }

  const usedIds = new Set(previews.map((preview) => preview.entry.id));
  const upcoming = activeEntries
    .filter((entry) => !usedIds.has(entry.id))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  for (const entry of upcoming) {
    if (previews.length >= maxCount) break;
    const entryDate = new Date(entry.date);
    previews.push({
      entry,
      day: entryDate,
      postType: inferPostType(entry),
      imageUrl: getImageUrl(entry.link),
      overlayText: entry.title || entry.content.slice(0, 60),
    });
  }

  return previews;
}

export const PROMPT_LIBRARY_ITEMS: PromptLibraryItem[] = [
  {
    id: 'prompt-1',
    category: 'Post',
    prompt: 'What should I post this week to stand out in Austin?',
  },
  {
    id: 'prompt-2',
    category: 'Post',
    prompt: 'Write a Reels script for a new listing walkthrough.',
  },
  {
    id: 'prompt-3',
    category: 'Post',
    prompt: 'Draft an email blast for my spring open house.',
  },
  {
    id: 'prompt-4',
    category: 'Post',
    prompt: 'Create a caption for a just-sold celebration post.',
  },
];

export function getDashboardSubtext(contentIdeasCount: number): string {
  if (contentIdeasCount === 0) {
    return "Let's keep your Austin brand moving. Plan your week and start creating in the Mind.";
  }

  const ideasLabel =
    contentIdeasCount === 1
      ? '1 fresh content idea'
      : `${contentIdeasCount} fresh content ideas`;

  return `Let's keep your Austin brand moving. Today you have ${ideasLabel}, a planned reel, and a draft waiting in the Mind.`;
}
