import type { Announcement, DashboardAnalyticsRecord, DashboardContentRecord } from '@/types/api';
import type {
  AiCreditUsage,
  ContentCalendarItem,
  DashboardHero,
  DashboardStat,
  DashboardUser,
  DashboardViewModel,
  PromptLibraryItem,
  RecentActivity,
} from '@/types/dashboard';

const readNumber = (value: unknown): number | null => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === 'string' && value.trim().length > 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
};

const readString = (value: unknown): string => {
  if (typeof value === 'string') {
    return value.trim();
  }

  return '';
};

const normalizeAiCredits = (record: DashboardAnalyticsRecord): AiCreditUsage | null => {
  const nested = record.ai_credit_usage;
  const current =
    readNumber(record.ai_credit_current) ??
    readNumber(record.ai_credits_used) ??
    readNumber(nested?.current) ??
    readNumber(nested?.used);
  const total =
    readNumber(record.ai_credit_total) ??
    readNumber(record.ai_credits_limit) ??
    readNumber(nested?.total) ??
    readNumber(nested?.limit);

  if (current === null || total === null) {
    return null;
  }

  return { current, total };
};

const normalizeUser = (record: DashboardAnalyticsRecord): DashboardUser | null => {
  const firstName = readString(record.first_name);
  const lastName = readString(record.last_name);
  const fullName =
    readString(record.full_name) ||
    readString(record.name) ||
    [firstName, lastName].filter(Boolean).join(' ');

  if (fullName.length === 0 && firstName.length === 0) {
    return null;
  }

  return {
    firstName: firstName || fullName.split(' ')[0] || fullName,
    lastName,
    fullName: fullName || firstName,
    avatarUrl: record.avatar_url ?? null,
  };
};

const normalizeHero = (record: DashboardAnalyticsRecord): DashboardHero | null => {
  const headline = readString(record.hero_headline) || readString(record.headline);
  const description = readString(record.hero_description) || readString(record.description);

  if (headline.length === 0 && description.length === 0) {
    return null;
  }

  return { headline, description };
};

const normalizeStats = (record: DashboardAnalyticsRecord): DashboardStat | null => {
  const downloads = readNumber(record.downloads);
  const contentGenerated = readNumber(record.content_generated);

  if (downloads === null && contentGenerated === null) {
    return null;
  }

  return {
    downloads: downloads ?? 0,
    contentGenerated: contentGenerated ?? 0,
  };
};

const normalizeContentItem = (
  item: DashboardContentRecord,
  index: number,
): ContentCalendarItem | null => {
  const dayLabel =
    readString(item.day_label) || readString(item.day) || readString(item.label).toUpperCase();
  const typeLabel =
    readString(item.content_type) || readString(item.type) || readString(item.label);
  const title = readString(item.title);
  const subtitle = readString(item.subtitle) || readString(item.description);
  const imageUrl = item.image_url ?? item.image ?? null;

  if (dayLabel.length === 0 && typeLabel.length === 0 && title.length === 0) {
    return null;
  }

  return {
    id: readString(item.id) || `content-${index}`,
    dayLabel,
    typeLabel,
    title,
    subtitle,
    imageUrl,
  };
};

const normalizeContentList = (
  items: DashboardContentRecord[] | undefined,
): ContentCalendarItem[] => {
  if (items === undefined) {
    return [];
  }

  return items
    .map((item, index) => normalizeContentItem(item, index))
    .filter((item): item is ContentCalendarItem => item !== null);
};

const normalizeRecentActivities = (record: DashboardAnalyticsRecord): RecentActivity[] => {
  const items = record.recent_activities ?? [];

  return items
    .map((item, index) => {
      const title = readString(item.title) || readString(item.message);
      const description = readString(item.description) || readString(item.message);
      const timestamp =
        readString(item.timestamp) || readString(item.created_at) || readString(item.date);

      if (title.length === 0 && description.length === 0) {
        return null;
      }

      return {
        id: readString(item.id) || `activity-${index}`,
        title,
        description,
        timestamp,
      };
    })
    .filter((item): item is RecentActivity => item !== null);
};

const normalizePromptLibrary = (record: DashboardAnalyticsRecord): PromptLibraryItem[] => {
  const items = record.prompt_library ?? [];

  return items
    .map((item, index) => {
      const prompt = readString(item.prompt) || readString(item.text);
      const label = readString(item.label) || readString(item.type) || 'Post';

      if (prompt.length === 0) {
        return null;
      }

      return {
        id: readString(item.id) || `prompt-${index}`,
        label,
        prompt,
      };
    })
    .filter((item): item is PromptLibraryItem => item !== null);
};

export const normalizeDashboardAnalytics = (
  record: DashboardAnalyticsRecord,
): Omit<
  DashboardViewModel,
  'recentActivities' | 'weeklyContent' | 'contentCalendar' | 'promptLibrary'
> => ({
  user: normalizeUser(record),
  aiCredits: normalizeAiCredits(record),
  hero: normalizeHero(record),
  stats: normalizeStats(record),
});

export const buildDashboardViewModel = (
  analytics: DashboardAnalyticsRecord,
): DashboardViewModel => ({
  ...normalizeDashboardAnalytics(analytics),
  weeklyContent: normalizeContentList(analytics.weekly_content),
  contentCalendar: normalizeContentList(analytics.content_calendar ?? analytics.calendar_items),
  recentActivities: normalizeRecentActivities(analytics),
  promptLibrary: normalizePromptLibrary(analytics),
});

export const announcementToActivity = (
  announcement: Announcement,
  index: number,
): RecentActivity => ({
  id: announcement.id || `announcement-${index}`,
  title:
    readString(announcement.announcement_title) ||
    readString(announcement.title) ||
    readString(announcement.message),
  description:
    readString(announcement.announcement_content) ||
    readString(announcement.description) ||
    readString(announcement.message),
  timestamp: readString(announcement.status),
});

export const getAnnouncementTitle = (announcement: Announcement): string =>
  readString(announcement.announcement_title) ||
  readString(announcement.title) ||
  readString(announcement.message);

export const getAnnouncementBody = (announcement: Announcement): string =>
  readString(announcement.announcement_content) ||
  readString(announcement.description) ||
  readString(announcement.message);

export const getGreeting = (firstName: string | undefined): string => {
  const hour = new Date().getHours();
  const salutation = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';

  if (firstName !== undefined && firstName.length > 0) {
    return `${salutation}, ${firstName}.`;
  }

  return `${salutation}.`;
};
