import { apiClient } from '@/lib/api/client';
import {
  getApiErrorMessage,
  pickNumber,
  pickString,
  unwrapData,
} from '@/lib/api/errors';
import type {
  DashboardAnalyticsData,
  DashboardAnnouncement,
  DashboardQuestionRequest,
  DashboardQuestionResponse,
} from '@/types/api';

function normalizeAnalytics(raw: unknown): DashboardAnalyticsData {
  const defaults: DashboardAnalyticsData = {
    downloads: 0,
    content_generated: 0,
    credits_used: 1420,
    credits_limit: 5000,
  };

  if (typeof raw !== 'object' || raw === null) return defaults;

  const source = raw as Record<string, unknown>;

  return {
    downloads: pickNumber(source, ['downloads', 'total_downloads']),
    content_generated: pickNumber(source, [
      'content_generated',
      'contentGenerated',
      'generated_content',
    ]),
    credits_used:
      pickNumber(source, [
        'credits_used',
        'creditsUsed',
        'ai_credits_used',
        'used',
      ]) || defaults.credits_used,
    credits_limit:
      pickNumber(source, [
        'credits_limit',
        'creditsLimit',
        'ai_credits_total',
        'limit',
      ]) || defaults.credits_limit,
  };
}

function normalizeAnnouncement(raw: unknown): DashboardAnnouncement | null {
  if (typeof raw !== 'object' || raw === null) return null;

  const source = raw as Record<string, unknown>;
  const id = pickString(source, ['id', '_id']);
  const title = pickString(source, [
    'announcement_title',
    'title',
    'message',
  ]);
  const content = pickString(source, [
    'announcement_content',
    'content',
    'description',
    'message',
  ]);
  const created_at = pickString(source, ['created_at', 'createdAt']);

  if (!id || !title) return null;

  const linkValue = source.link;
  const link =
    typeof linkValue === 'string' && linkValue.trim() ? linkValue : null;

  return {
    id,
    title,
    content,
    link,
    created_at: created_at || new Date().toISOString(),
  };
}

function normalizeAnnouncements(raw: unknown): DashboardAnnouncement[] {
  if (Array.isArray(raw)) {
    return raw
      .map(normalizeAnnouncement)
      .filter((item): item is DashboardAnnouncement => item !== null);
  }

  if (typeof raw !== 'object' || raw === null) return [];

  const source = raw as Record<string, unknown>;
  const items = source.items;

  if (Array.isArray(items)) {
    return items
      .map(normalizeAnnouncement)
      .filter((item): item is DashboardAnnouncement => item !== null);
  }

  return [];
}

export async function fetchDashboardAnalytics(): Promise<DashboardAnalyticsData> {
  const response = await apiClient.get('/api/dashboard/analytics');
  const data = unwrapData<unknown>(response.data);
  return normalizeAnalytics(data ?? response.data);
}

export async function fetchDashboardAnnouncements(): Promise<DashboardAnnouncement[]> {
  const response = await apiClient.get('/api/dashboard/announcements');
  const data = unwrapData<unknown>(response.data);
  return normalizeAnnouncements(data ?? response.data);
}

export async function askDashboardQuestion(
  body: DashboardQuestionRequest,
): Promise<DashboardQuestionResponse> {
  const response = await apiClient.post('/api/dashboard/questions', body);
  const data = unwrapData<DashboardQuestionResponse>(response.data);

  if (data && typeof data.answer === 'string') {
    return {
      answer: data.answer,
      credits_used:
        typeof data.credits_used === 'number' ? data.credits_used : null,
    };
  }

  return { answer: '', credits_used: null };
}

export function getDashboardErrorMessage(error: unknown): string {
  return getApiErrorMessage(
    error,
    'Something went wrong while loading dashboard data.',
  );
}

export function getAnnouncementsErrorMessage(error: unknown): string {
  return getApiErrorMessage(
    error,
    'Something went wrong while loading announcements.',
  );
}

export function getDashboardQuestionErrorMessage(error: unknown): string {
  return getApiErrorMessage(
    error,
    'Something went wrong while submitting your question.',
  );
}
