import axios from 'axios';
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

function isNotFoundOrMethodNotAllowed(error: unknown): boolean {
  if (!axios.isAxiosError(error)) return false;
  const status = error.response?.status;
  return status === 404 || status === 405;
}

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

export async function listEntries(): Promise<ContentCalendarEntry[]> {
  try {
    const response = await apiClient.get('/api/content-calendar');
    return normalizeCalendarList(response.data);
  } catch (error) {
    if (!isNotFoundOrMethodNotAllowed(error)) throw error;
    const response = await apiClient.get('/api/content-calendar/entries');
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
    const response = await apiClient.post('/api/content-calendar', body);
    return unwrapMutationData(response.data);
  } catch (error) {
    if (!isNotFoundOrMethodNotAllowed(error)) throw error;
    const response = await apiClient.post('/api/content-calendar/entries', body);
    return unwrapMutationData(response.data);
  }
}

export async function updateEntry(
  id: string,
  body: UpdateContentCalendarEntryRequest,
): Promise<ContentCalendarEntry | null> {
  try {
    const response = await apiClient.put(`/api/content-calendar/${id}`, body);
    return unwrapMutationData(response.data);
  } catch (error) {
    if (!isNotFoundOrMethodNotAllowed(error)) throw error;
    const response = await apiClient.put(`/api/content-calendar/entries/${id}`, body);
    return unwrapMutationData(response.data);
  }
}

export async function deleteEntry(id: string): Promise<void> {
  try {
    await apiClient.delete(`/api/content-calendar/${id}`);
  } catch (error) {
    if (!isNotFoundOrMethodNotAllowed(error)) throw error;
    await apiClient.delete(`/api/content-calendar/entries/${id}`);
  }
}

export function getCalendarErrorMessage(error: unknown): string {
  return getApiErrorMessage(
    error,
    'Something went wrong while loading your content calendar.',
  );
}
