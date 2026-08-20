import type {
  ContentCalendarEntry,
  CreditUsage,
  DashboardActivity,
  DashboardAnnouncement,
  DashboardData,
  DashboardProfile,
} from '../types/api';

export const CARD_IMAGES = [
  '/assets/figma/content-library.png',
  '/assets/figma/content-library-2.png',
  '/assets/figma/content-list.png',
  '/assets/figma/blog.png',
  '/assets/figma/content-details.png',
] as const;

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function asString(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() !== '' ? value : undefined;
}

export function asNumber(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value.replace(/,/g, ''));
    if (Number.isFinite(parsed)) return parsed;
  }
  return undefined;
}

export function asBoolean(value: unknown): boolean | undefined {
  return typeof value === 'boolean' ? value : undefined;
}

export function greetingForDate(date: Date): string {
  const hour = date.getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
}

export function firstNameFrom(name: string | undefined): string {
  if (!name) return 'there';
  return name.trim().split(/\s+/)[0] ?? 'there';
}

export function formatCardDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    timeZone: 'UTC',
  });
}

export function weekdayLabel(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value.slice(0, 3).toUpperCase();
  return date.toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' }).toUpperCase();
}

export function relativeTime(value: string | undefined, now = Date.now()): string {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  const deltaMinutes = Math.floor((now - date.getTime()) / 60000);
  const hours = Math.floor(deltaMinutes / 60);
  const days = Math.floor(hours / 24);
  if (deltaMinutes < 1) return 'Just now';
  if (deltaMinutes < 60) return `${deltaMinutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
}

export function contentType(title: string, description: string, content = ''): string {
  const haystack = `${title} ${description} ${content}`.toLowerCase();
  if (haystack.includes('reel')) return 'Reels';
  if (haystack.includes('story')) return 'Story';
  if (haystack.includes('email')) return 'Email';
  if (haystack.includes('post')) return 'Post';
  return 'Content';
}

export function announcementTitle(item: DashboardAnnouncement): string {
  return item.announcement_title || item.title || item.message || 'Announcement';
}

export function announcementBody(item: DashboardAnnouncement): string {
  return item.announcement_content || item.description || item.message || '';
}

export function cardImage(entry: ContentCalendarEntry, index: number): string {
  const link = entry.link;
  if (link && /\.(png|jpe?g|webp|gif)(\?|$)/i.test(link)) return link;
  return CARD_IMAGES[index % CARD_IMAGES.length];
}

function readProfile(value: unknown): DashboardProfile | null {
  if (!isRecord(value)) return null;
  const profile: DashboardProfile = {
    id: asString(value.id),
    name: asString(value.name) ?? asString(value.full_name),
    first_name: asString(value.first_name),
    last_name: asString(value.last_name),
    email: asString(value.email),
  };
  if (!profile.id && !profile.name && !profile.first_name && !profile.email) return null;
  return profile;
}

function readCalendarEntry(value: unknown): ContentCalendarEntry | null {
  if (!isRecord(value)) return null;
  const id = asString(value.id);
  if (!id) return null;
  return {
    id,
    title: asString(value.title) ?? '',
    date: asString(value.date) ?? asString(value.created_at) ?? '',
    content: asString(value.content) ?? '',
    description: asString(value.description) ?? '',
    full_name: asString(value.full_name) ?? '',
    phone: asString(value.phone) ?? '',
    link: asString(value.link) ?? null,
    error: asString(value.error) ?? null,
    is_active: asBoolean(value.is_active) ?? true,
    created_at: asString(value.created_at) ?? '',
    updated_at: asString(value.updated_at) ?? '',
  };
}

function readAnnouncement(value: unknown): DashboardAnnouncement | null {
  if (!isRecord(value)) return null;
  const id = asString(value.id);
  if (!id) return null;
  return {
    id,
    announcement_title: asString(value.announcement_title),
    announcement_content: asString(value.announcement_content),
    title: asString(value.title),
    message: asString(value.message),
    description: asString(value.description),
    full_name: asString(value.full_name),
    email: asString(value.email),
    phone: asString(value.phone),
    link: asString(value.link) ?? null,
    status: asString(value.status),
    error: asString(value.error) ?? null,
    is_active: asBoolean(value.is_active),
    created_at: asString(value.created_at),
    updated_at: asString(value.updated_at),
  };
}

function readActivity(value: unknown): DashboardActivity | null {
  if (!isRecord(value)) return null;
  const id = asString(value.id);
  if (!id) return null;
  return {
    id,
    title: asString(value.title) ?? asString(value.message) ?? 'Activity',
    description: asString(value.description) ?? asString(value.message) ?? '',
    created_at: asString(value.created_at) ?? asString(value.timestamp) ?? '',
  };
}

function readList<T>(value: unknown, mapper: (item: unknown) => T | null): T[] {
  const source = Array.isArray(value)
    ? value
    : isRecord(value) && Array.isArray(value.items)
      ? value.items
      : [];
  return source.map(mapper).filter((item): item is T => item !== null);
}

function pickNumber(...values: unknown[]): number | null {
  for (const value of values) {
    const parsed = asNumber(value);
    if (parsed !== undefined) return parsed;
  }
  return null;
}

function readCredits(...candidates: unknown[]): CreditUsage | null {
  for (const candidate of candidates) {
    if (!isRecord(candidate)) continue;
    const current = pickNumber(
      candidate.current,
      candidate.used,
      candidate.ai_credits_current,
      candidate.ai_credits_used,
    );
    const total = pickNumber(
      candidate.total,
      candidate.limit,
      candidate.max,
      candidate.ai_credits_total,
    );
    if (current !== null && total !== null && total > 0) {
      return { current, total };
    }
  }
  return null;
}

export function normalizeCalendarEntries(payload: object): ContentCalendarEntry[] {
  if (!isRecord(payload)) return [];
  const data = isRecord(payload.data) ? payload.data : payload;
  return readList(data.items ?? data, readCalendarEntry);
}

export function normalizeDashboardData(data: object): DashboardData {
  const record = isRecord(data) ? data : {};
  const nested = isRecord(record.data) ? record.data : record;
  const analytics = isRecord(nested.analytics)
    ? nested.analytics
    : isRecord(nested.stats)
      ? nested.stats
      : isRecord(nested.metrics)
        ? nested.metrics
        : {};

  const announcements = readList(
    nested.announcements ?? nested.dashboard_announcements,
    readAnnouncement,
  );
  const calendarEntries = readList(
    nested.content_calendar_entries ?? nested.calendar ?? nested.calendar_entries,
    readCalendarEntry,
  );
  const activities = readList(nested.recent_activity ?? nested.activities, readActivity);

  return {
    profile: readProfile(nested.profile) ?? readProfile(nested.user) ?? null,
    announcements,
    calendarEntries,
    activities:
      activities.length > 0
        ? activities
        : announcements.map((item) => ({
            id: item.id,
            title: announcementTitle(item),
            description: announcementBody(item),
            created_at: item.created_at ?? '',
          })),
    downloads: pickNumber(analytics.downloads, nested.downloads),
    contentGenerated: pickNumber(
      analytics.content_generated,
      analytics.contentGenerated,
      nested.content_generated,
    ),
    credits: readCredits(
      nested.credits,
      nested.ai_credit_usage,
      nested.ai_credits,
      analytics.ai_credit_usage,
      analytics,
    ),
  };
}

export function creditPercent(credits: CreditUsage): number {
  if (credits.total <= 0) return 0;
  return Math.min(100, Math.max(0, (credits.current / credits.total) * 100));
}

export const EMPTY_DASHBOARD_DATA: DashboardData = {
  profile: null,
  announcements: [],
  calendarEntries: [],
  activities: [],
  downloads: null,
  contentGenerated: null,
  credits: null,
};
