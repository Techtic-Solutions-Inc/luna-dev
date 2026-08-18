import type {
  DashboardActivity,
  DashboardAnalytics,
  DashboardAnalyticsResponse,
  DashboardAnnouncement,
  DashboardAnnouncementListResponse,
  DashboardAnnouncementMutationResponse,
  DashboardAnnouncementPayload,
} from '../../types/api';
import { apiClient } from './client';
import { getApiErrorMessage } from './errors';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function readString(
  record: Record<string, unknown>,
  keys: readonly string[],
): string {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === 'string') {
      return value;
    }

    if (typeof value === 'number' && Number.isFinite(value)) {
      return String(value);
    }
  }

  return '';
}

function readNumber(
  record: Record<string, unknown>,
  keys: readonly string[],
): number {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === 'number' && Number.isFinite(value)) {
      return value;
    }

    if (typeof value === 'string' && value.trim()) {
      const parsed = Number(value.replace(/,/g, ''));
      if (Number.isFinite(parsed)) {
        return parsed;
      }
    }
  }

  return 0;
}

function unwrapData(payload: unknown): unknown {
  if (isRecord(payload) && 'data' in payload) {
    return payload.data;
  }

  return payload;
}

export function normalizeDashboardAnnouncement(
  value: unknown,
): DashboardAnnouncement | null {
  if (!isRecord(value)) {
    return null;
  }

  const nested = isRecord(value.data) ? value.data : value;
  const id = readString(nested, ['id', '_id']);
  const title = readString(nested, ['title', 'name', 'message', 'headline']);

  if (!id || !title) {
    return null;
  }

  const date = readString(nested, [
    'date',
    'published_at',
    'publishedAt',
    'created_at',
    'createdAt',
    'timestamp',
  ]);

  return {
    id,
    title,
    description: readString(nested, ['description', 'content', 'body', 'summary']),
    date,
    created_at: readString(nested, ['created_at', 'createdAt']) || date,
    updated_at: readString(nested, ['updated_at', 'updatedAt']) || date,
  };
}

export function unwrapDashboardAnnouncements(
  payload: DashboardAnnouncementListResponse | DashboardAnnouncement[] | unknown,
): DashboardAnnouncement[] {
  if (Array.isArray(payload)) {
    return payload
      .map((item) => normalizeDashboardAnnouncement(item))
      .filter((item): item is DashboardAnnouncement => item !== null);
  }

  const data = unwrapData(payload);

  if (Array.isArray(data)) {
    return data
      .map((item) => normalizeDashboardAnnouncement(item))
      .filter((item): item is DashboardAnnouncement => item !== null);
  }

  if (isRecord(data) && Array.isArray(data.items)) {
    return data.items
      .map((item) => normalizeDashboardAnnouncement(item))
      .filter((item): item is DashboardAnnouncement => item !== null);
  }

  return [];
}

function normalizeDashboardActivity(
  value: unknown,
  index: number,
): DashboardActivity | null {
  if (!isRecord(value)) {
    return null;
  }

  const title = readString(value, ['title', 'name', 'message', 'description']);

  if (!title) {
    return null;
  }

  return {
    id: readString(value, ['id', '_id']) || `activity-${index}`,
    title,
    description: readString(value, ['description', 'content', 'body', 'summary']),
    date: readString(value, [
      'date',
      'created_at',
      'createdAt',
      'timestamp',
      'occurred_at',
      'occurredAt',
    ]),
  };
}

export function normalizeDashboardAnalytics(
  value: unknown,
): DashboardAnalytics | null {
  if (!isRecord(value)) {
    return null;
  }

  const nested = isRecord(value.data) ? value.data : value;

  if (!isRecord(nested)) {
    return null;
  }

  const rawActivities =
    (Array.isArray(nested.activities) && nested.activities) ||
    (Array.isArray(nested.recent_activity) && nested.recent_activity) ||
    (Array.isArray(nested.recentActivity) && nested.recentActivity) ||
    (Array.isArray(nested.items) && nested.items) ||
    [];

  return {
    downloads: readNumber(nested, ['downloads', 'download_count', 'downloadCount']),
    content_generated: readNumber(nested, [
      'content_generated',
      'contentGenerated',
      'generated',
      'generated_count',
    ]),
    ai_credits_used: readNumber(nested, [
      'ai_credits_used',
      'aiCreditsUsed',
      'credits_used',
      'creditsUsed',
      'used',
    ]),
    ai_credits_limit: readNumber(nested, [
      'ai_credits_limit',
      'aiCreditsLimit',
      'credits_limit',
      'creditsLimit',
      'limit',
    ]),
    activities: rawActivities
      .map((item, index) => normalizeDashboardActivity(item, index))
      .filter((item): item is DashboardActivity => item !== null),
  };
}

export function getDashboardErrorMessage(
  error: unknown,
  fallback = 'Something went wrong while loading your dashboard.',
): string {
  return getApiErrorMessage(error, fallback);
}

export async function getDashboardAnnouncements(): Promise<
  DashboardAnnouncement[]
> {
  const response = await apiClient.get<
    DashboardAnnouncementListResponse | DashboardAnnouncement[]
  >('/api/dashboard/announcements');

  return unwrapDashboardAnnouncements(response.data);
}

export async function createDashboardAnnouncement(
  body: DashboardAnnouncementPayload,
): Promise<DashboardAnnouncement | null> {
  const response = await apiClient.post<
    DashboardAnnouncementMutationResponse | DashboardAnnouncement
  >('/api/dashboard/announcements', body);

  return normalizeDashboardAnnouncement(unwrapData(response.data));
}

export async function getDashboardAnalytics(): Promise<DashboardAnalytics | null> {
  const response = await apiClient.get<
    DashboardAnalyticsResponse | DashboardAnalytics
  >('/api/dashboard/analytics');

  return normalizeDashboardAnalytics(response.data);
}
