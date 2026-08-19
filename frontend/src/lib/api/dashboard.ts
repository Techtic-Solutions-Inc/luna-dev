import axios from 'axios';
import type {
  DashboardAnalytics,
  DashboardAnalyticsResponse,
  DashboardAnnouncement,
  DashboardAnnouncementMutationResponse,
  DashboardAnnouncementPayload,
  DashboardAnnouncementsListResponse,
  DashboardActivityItem,
  DashboardPromptItem,
  ErrorEnvelope,
} from '../../types/api';
import { apiClient } from './client';

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
  }

  return 0;
}

export function normalizeDashboardAnnouncement(
  value: unknown,
): DashboardAnnouncement | null {
  if (!isRecord(value)) {
    return null;
  }

  const id = readString(value, ['id']);
  const title = readString(value, ['title']);

  if (!id || !title) {
    return null;
  }

  return {
    id,
    title,
    body: readString(value, ['body', 'message', 'description', 'content']),
    created_at: readString(value, ['created_at', 'createdAt']),
    updated_at: readString(value, ['updated_at', 'updatedAt']),
  };
}

export function normalizeDashboardActivity(
  value: unknown,
): DashboardActivityItem | null {
  if (!isRecord(value)) {
    return null;
  }

  const id = readString(value, ['id']);
  const title = readString(value, ['title', 'name']);
  const description = readString(value, [
    'description',
    'body',
    'message',
    'content',
  ]);
  const created_at = readString(value, ['created_at', 'createdAt', 'timestamp']);

  if (!id || (!title && !description)) {
    return null;
  }

  return {
    id,
    title: title || description,
    description: description || title,
    created_at,
  };
}

export function normalizeDashboardPrompt(
  value: unknown,
): DashboardPromptItem | null {
  if (!isRecord(value)) {
    return null;
  }

  const id = readString(value, ['id']);
  const text = readString(value, ['text', 'prompt', 'body', 'title']);

  if (!id || !text) {
    return null;
  }

  return {
    id,
    label: readString(value, ['label', 'type', 'category']) || 'Post',
    text,
  };
}

export function normalizeDashboardAnalytics(
  value: unknown,
): DashboardAnalytics {
  const defaults: DashboardAnalytics = {
    downloads: 0,
    content_generated: 0,
    credits_used: 1420,
    credits_limit: 5000,
    recent_activities: [],
    prompts: [],
  };

  if (!isRecord(value)) {
    return defaults;
  }

  const activitiesSource =
    value.recent_activities ??
    value.recentActivities ??
    value.activities ??
    value.items;

  const promptsSource =
    value.prompts ?? value.prompt_library ?? value.promptLibrary;

  const activities = Array.isArray(activitiesSource)
    ? activitiesSource
        .map((item) => normalizeDashboardActivity(item))
        .filter((item): item is DashboardActivityItem => item !== null)
    : [];

  const prompts = Array.isArray(promptsSource)
    ? promptsSource
        .map((item) => normalizeDashboardPrompt(item))
        .filter((item): item is DashboardPromptItem => item !== null)
    : [];

  return {
    downloads: readNumber(value, ['downloads', 'total_downloads']),
    content_generated: readNumber(value, [
      'content_generated',
      'contentGenerated',
      'generated_content',
    ]),
    credits_used: readNumber(value, [
      'credits_used',
      'creditsUsed',
      'ai_credits_used',
      'used',
    ]) || defaults.credits_used,
    credits_limit: readNumber(value, [
      'credits_limit',
      'creditsLimit',
      'ai_credits_limit',
      'limit',
    ]) || defaults.credits_limit,
    recent_activities: activities,
    prompts,
  };
}

function unwrapAnnouncements(
  payload: DashboardAnnouncementsListResponse | DashboardAnnouncement[],
): DashboardAnnouncement[] {
  if (Array.isArray(payload)) {
    return payload
      .map((item) => normalizeDashboardAnnouncement(item))
      .filter((item): item is DashboardAnnouncement => item !== null);
  }

  const items = payload.data?.items ?? [];

  return items
    .map((item) => normalizeDashboardAnnouncement(item))
    .filter((item): item is DashboardAnnouncement => item !== null);
}

function unwrapAnalytics(
  payload: DashboardAnalyticsResponse | DashboardAnalytics,
): DashboardAnalytics {
  if (isRecord(payload) && 'data' in payload && isRecord(payload.data)) {
    return normalizeDashboardAnalytics(payload.data);
  }

  return normalizeDashboardAnalytics(payload);
}

function unwrapAnnouncement(
  payload: DashboardAnnouncementMutationResponse | DashboardAnnouncement,
): DashboardAnnouncement | null {
  if (isRecord(payload) && isRecord(payload.data)) {
    return normalizeDashboardAnnouncement(payload.data);
  }

  return normalizeDashboardAnnouncement(payload);
}

export function getDashboardErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ErrorEnvelope>(error)) {
    const message = error.response?.data.message;
    if (message) {
      return message;
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return 'Something went wrong while loading dashboard data.';
}

export async function getDashboardAnnouncements(): Promise<
  DashboardAnnouncement[]
> {
  const response = await apiClient.get<
    DashboardAnnouncementsListResponse | DashboardAnnouncement[]
  >('/api/dashboard/announcements');

  return unwrapAnnouncements(response.data);
}

export async function createDashboardAnnouncement(
  body: DashboardAnnouncementPayload,
): Promise<DashboardAnnouncement | null> {
  const response = await apiClient.post<
    DashboardAnnouncementMutationResponse | DashboardAnnouncement
  >('/api/dashboard/announcements', body);

  return unwrapAnnouncement(response.data);
}

export async function getDashboardAnalytics(): Promise<DashboardAnalytics> {
  const response = await apiClient.get<
    DashboardAnalyticsResponse | DashboardAnalytics
  >('/api/dashboard/analytics');

  return unwrapAnalytics(response.data);
}
