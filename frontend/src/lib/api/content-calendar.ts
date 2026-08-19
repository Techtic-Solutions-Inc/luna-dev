import { apiClient } from '@/lib/api/client';
import {
  getApiErrorMessage,
  pickBoolean,
  pickString,
  unwrapData,
} from '@/lib/api/errors';
import type {
  ContentCalendarEntry,
  CreateContentCalendarEntryRequest,
  UpdateContentCalendarEntryRequest,
} from '@/types/api';

function normalizeCalendarEntry(raw: unknown): ContentCalendarEntry | null {
  if (typeof raw !== 'object' || raw === null) return null;

  const source = raw as Record<string, unknown>;
  const id = pickString(source, ['id']);
  const title = pickString(source, ['title']);
  const date = pickString(source, ['date']);

  if (!id || !title || !date) return null;

  const errorValue = source.error;

  return {
    id,
    title,
    date,
    content: pickString(source, ['content']),
    description: pickString(source, ['description']),
    full_name: pickString(source, ['full_name']),
    phone: pickString(source, ['phone']),
    link: pickString(source, ['link']) || null,
    error: typeof errorValue === 'string' ? errorValue : null,
    is_active: pickBoolean(source, ['is_active']),
    created_at: pickString(source, ['created_at']),
    updated_at: pickString(source, ['updated_at']),
  };
}

function normalizeCalendarList(payload: unknown): ContentCalendarEntry[] {
  if (Array.isArray(payload)) {
    return payload
      .map((item) => normalizeCalendarEntry(item))
      .filter((item): item is ContentCalendarEntry => item !== null);
  }

  const data = unwrapData<{ items?: unknown[] }>(payload);
  const items = data?.items ?? [];

  return items
    .map((item) => normalizeCalendarEntry(item))
    .filter((item): item is ContentCalendarEntry => item !== null);
}

async function listEntriesPrimary(): Promise<ContentCalendarEntry[]> {
  const response = await apiClient.get('/api/content-calendar/entries');
  return normalizeCalendarList(response.data);
}

export async function listEntries(): Promise<ContentCalendarEntry[]> {
  try {
    return await listEntriesPrimary();
  } catch {
    const response = await apiClient.get('/api/content-calendar');
    return normalizeCalendarList(response.data);
  }
}

function unwrapMutationData(payload: unknown): ContentCalendarEntry | null {
  const data = unwrapData<unknown>(payload);
  if (data) return normalizeCalendarEntry(data);
  return normalizeCalendarEntry(payload);
}

export async function createEntry(
  body: CreateContentCalendarEntryRequest,
): Promise<ContentCalendarEntry | null> {
  try {
    const response = await apiClient.post('/api/content-calendar/entries', body);
    return unwrapMutationData(response.data);
  } catch {
    const response = await apiClient.post('/api/content-calendar', body);
    return unwrapMutationData(response.data);
  }
}

export async function updateEntry(
  id: string,
  body: UpdateContentCalendarEntryRequest,
): Promise<ContentCalendarEntry | null> {
  try {
    const response = await apiClient.put(`/api/content-calendar/entries/${id}`, body);
    return unwrapMutationData(response.data);
  } catch {
    const response = await apiClient.put(`/api/content-calendar/${id}`, body);
    return unwrapMutationData(response.data);
  }
}

export async function deleteEntry(id: string): Promise<void> {
  try {
    await apiClient.delete(`/api/content-calendar/entries/${id}`);
  } catch {
    await apiClient.delete(`/api/content-calendar/${id}`);
  }
}

export function getCalendarErrorMessage(error: unknown): string {
  return getApiErrorMessage(
    error,
    'Something went wrong while loading your content calendar.',
  );
}
