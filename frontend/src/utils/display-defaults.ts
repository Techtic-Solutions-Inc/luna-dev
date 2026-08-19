import type { ContentCalendarEntry, ProfileContentItem, ProfileDownloadItem } from '@/types/api';
import type { NormalizedProfile } from '@/lib/api/profile';
import type { DashboardAnalyticsData } from '@/types/api';

/** Figma sidebar AI credit usage (Updated Dashboard frame). */
export const DEFAULT_AI_CREDITS = {
  used: 1420,
  limit: 5000,
} as const;

/** Figma dashboard stats card values. */
export const DEFAULT_ANALYTICS: DashboardAnalyticsData = {
  downloads: 312,
  content_generated: 247,
  credits_used: DEFAULT_AI_CREDITS.used,
  credits_limit: DEFAULT_AI_CREDITS.limit,
};

export function resolveAnalyticsDisplay(
  data: DashboardAnalyticsData | null,
): DashboardAnalyticsData {
  if (!data) return DEFAULT_ANALYTICS;

  return {
    downloads: data.downloads || DEFAULT_ANALYTICS.downloads,
    content_generated:
      data.content_generated || DEFAULT_ANALYTICS.content_generated,
    credits_used: data.credits_used ?? DEFAULT_AI_CREDITS.used,
    credits_limit: data.credits_limit ?? DEFAULT_AI_CREDITS.limit,
  };
}

export function resolveSidebarCredits(
  used?: number,
  limit?: number,
): { used: number; limit: number } {
  return {
    used:
      used !== undefined && Number.isFinite(used)
        ? used
        : DEFAULT_AI_CREDITS.used,
    limit:
      limit !== undefined && Number.isFinite(limit) && limit > 0
        ? limit
        : DEFAULT_AI_CREDITS.limit,
  };
}

/** Figma Profile frame — Joseph Stanley preview fields. */
export function getDemoProfile(): NormalizedProfile {
  return {
    id: 'demo-profile',
    first_name: 'Joseph',
    last_name: 'Stanley',
    email: 'joseph.stanley@example.com',
    mobile_number: '+1 (555) 123-4567',
    bio: 'Luxury real estate advisor focused on Austin and surrounding markets.',
    time_zone: 'America/New_York',
    street: '123 Main Street',
    country: 'United States',
    state: 'Texas',
    city: 'Austin',
    zip: '78701',
    avatar_url: '',
    created_at: '2024-03-01T00:00:00.000Z',
  };
}

/** Figma Profile - Downloads frame sample rows. */
export const DEMO_DOWNLOAD_ITEMS: ProfileDownloadItem[] = [
  {
    id: 'demo-download-1',
    title: 'Luxury Listing Guide — 2026',
    file_type: 'Guides',
    size: '4.2 MB',
    downloaded_at: '2026-06-04T10:00:00.000Z',
    download_url: '',
  },
  {
    id: 'demo-download-2',
    title: 'Open House Flyer Template',
    file_type: 'Templates',
    size: '2.0 MB',
    downloaded_at: '2026-06-02T14:30:00.000Z',
    download_url: '',
  },
  {
    id: 'demo-download-3',
    title: 'Market Update — Austin Q2',
    file_type: 'Reports',
    size: '1.5 MB',
    downloaded_at: '2026-05-28T09:15:00.000Z',
    download_url: '',
  },
  {
    id: 'demo-download-4',
    title: 'Just Sold Social Pack',
    file_type: 'Social',
    size: '8.0 MB',
    downloaded_at: '2026-05-20T16:45:00.000Z',
    download_url: '',
  },
  {
    id: 'demo-download-5',
    title: 'Buyer Consultation Checklist',
    file_type: 'Guides',
    size: '512 KB',
    downloaded_at: '2026-05-15T11:00:00.000Z',
    download_url: '',
  },
];

/** Figma Profile - Content Generated frame sample rows. */
export const DEMO_CONTENT_ITEMS: ProfileContentItem[] = [
  {
    id: 'demo-content-1',
    title: 'Just Listed — 12 Maple Ridge',
    description:
      'Step into elevated living — a four-bedroom retreat with panoramic views and resort-style outdoor space.',
    content: '',
    link: '',
    created_at: '2026-06-05T09:42:00.000Z',
    updated_at: '2026-06-05T09:42:00.000Z',
  },
  {
    id: 'demo-content-2',
    title: 'Weekend Open House Script',
    description:
      'Welcome everyone — today we are touring a beautifully updated home in one of Austin\'s most walkable neighborhoods.',
    content: '',
    link: '',
    created_at: '2026-06-03T14:20:00.000Z',
    updated_at: '2026-06-03T14:20:00.000Z',
  },
  {
    id: 'demo-content-3',
    title: 'Market Update — Austin Q2',
    description:
      'Inventory is tightening across central Austin while buyer demand remains strong for move-in ready listings.',
    content: '',
    link: '',
    created_at: '2026-05-30T11:05:00.000Z',
    updated_at: '2026-05-30T11:05:00.000Z',
  },
  {
    id: 'demo-content-4',
    title: 'Reels Script — Luxury Tour',
    description:
      'Start with the curb appeal shot, then walk through the chef\'s kitchen before ending on the backyard oasis.',
    content: '',
    link: '',
    created_at: '2026-05-28T08:30:00.000Z',
    updated_at: '2026-05-28T08:30:00.000Z',
  },
  {
    id: 'demo-content-5',
    title: 'Email Blast — Spring Listings',
    description:
      'Three new listings just hit the market this week — each offering something special for buyers and investors alike.',
    content: '',
    link: '',
    created_at: '2026-05-25T17:00:00.000Z',
    updated_at: '2026-05-25T17:00:00.000Z',
  },
];

/** Figma Content Calander frame — week of June 1–7, 2026 sample posts. */
function demoCalendarDate(day: number, hour: number, minute: number): string {
  const date = new Date(2026, 5, day, hour, minute, 0, 0);
  return date.toISOString();
}

export function getDemoCalendarEntries(): ContentCalendarEntry[] {
  const now = demoCalendarDate(1, 12, 0);
  return [
    {
      id: 'demo-cal-1',
      title: 'Market update — Austin Q2',
      date: demoCalendarDate(1, 17, 30),
      content: 'Market update — Austin Q2',
      description: 'Facebook post',
      full_name: '',
      phone: '',
      link: null,
      error: null,
      is_active: true,
      created_at: now,
      updated_at: now,
    },
    {
      id: 'demo-cal-2',
      title: 'Just listed — Maple Ridge',
      date: demoCalendarDate(2, 17, 45),
      content: 'Just listed — Maple Ridge',
      description: 'Instagram story',
      full_name: '',
      phone: '',
      link: null,
      error: null,
      is_active: true,
      created_at: now,
      updated_at: now,
    },
    {
      id: 'demo-cal-3',
      title: 'Open house reminder',
      date: demoCalendarDate(3, 18, 0),
      content: 'Open house reminder',
      description: 'Facebook post',
      full_name: '',
      phone: '',
      link: null,
      error: null,
      is_active: true,
      created_at: now,
      updated_at: now,
    },
    {
      id: 'demo-cal-4',
      title: 'Neighborhood spotlight',
      date: demoCalendarDate(4, 18, 15),
      content: 'Neighborhood spotlight',
      description: 'Instagram post',
      full_name: '',
      phone: '',
      link: null,
      error: null,
      is_active: true,
      created_at: now,
      updated_at: now,
    },
    {
      id: 'demo-cal-5',
      title: 'Client testimonial reel',
      date: demoCalendarDate(5, 18, 30),
      content: 'Client testimonial reel',
      description: 'Instagram reel',
      full_name: '',
      phone: '',
      link: null,
      error: null,
      is_active: true,
      created_at: now,
      updated_at: now,
    },
  ];
}
