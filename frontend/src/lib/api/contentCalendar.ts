import axios from 'axios';
import type {
  ContentCalendarItem,
  ContentCalendarListResponse,
  ContentCalendarMutationResponse,
  ContentCalendarPayload,
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

function readBoolean(
  record: Record<string, unknown>,
  keys: readonly string[],
): boolean {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === 'boolean') {
      return value;
    }
  }

  return true;
}

export function normalizeContentCalendarItem(
  value: unknown,
): ContentCalendarItem | null {
  if (!isRecord(value)) {
    return null;
  }

  const id = readString(value, ['id']);
  const title = readString(value, ['title']);
  const date = readString(value, ['date']);

  if (!id || !title || !date) {
    return null;
  }

  const errorValue = value.error;

  return {
    id,
    title,
    date,
    content: readString(value, ['content']),
    description: readString(value, ['description']),
    full_name: readString(value, ['full_name']),
    phone: readString(value, ['phone']),
    link: readString(value, ['link']),
    error: typeof errorValue === 'string' ? errorValue : null,
    is_active: readBoolean(value, ['is_active']),
    created_at: readString(value, ['created_at']),
    updated_at: readString(value, ['updated_at']),
  };
}

export function unwrapContentCalendarItems(
  payload: ContentCalendarListResponse | ContentCalendarItem[],
): ContentCalendarItem[] {
  if (Array.isArray(payload)) {
    return payload
      .map((item) => normalizeContentCalendarItem(item))
      .filter((item): item is ContentCalendarItem => item !== null);
  }

  const items = payload.data?.items ?? [];

  return items
    .map((item) => normalizeContentCalendarItem(item))
    .filter((item): item is ContentCalendarItem => item !== null);
}

export function getContentCalendarErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ErrorEnvelope>(error)) {
    const message = error.response?.data.message;
    if (message) {
      return message;
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return 'Something went wrong while loading your content calendar.';
}

export async function getContentCalendar(): Promise<ContentCalendarItem[]> {
  const response = await apiClient.get<
    ContentCalendarListResponse | ContentCalendarItem[]
  >('/api/content-calendar');

  return unwrapContentCalendarItems(response.data);
}

export async function getContentCalendarEntries(): Promise<ContentCalendarItem[]> {
  const response = await apiClient.get<
    ContentCalendarListResponse | ContentCalendarItem[]
  >('/api/content-calendar/entries');

  return unwrapContentCalendarItems(response.data);
}

function unwrapEntry(
  payload: ContentCalendarMutationResponse | ContentCalendarItem,
): unknown {
  if (isRecord(payload) && isRecord(payload.data)) {
    return payload.data;
  }

  return payload;
}

export async function createContentEntry(
  body: ContentCalendarPayload,
): Promise<ContentCalendarItem | null> {
  const response = await apiClient.post<
    ContentCalendarMutationResponse | ContentCalendarItem
  >('/api/content-calendar/entries', body);

  return normalizeContentCalendarItem(unwrapEntry(response.data));
}

export async function updateContentEntry(
  id: string,
  body: ContentCalendarPayload,
): Promise<ContentCalendarItem | null> {
  const response = await apiClient.put<
    ContentCalendarMutationResponse | ContentCalendarItem
  >(`/api/content-calendar/entries/${id}`, body);

  return normalizeContentCalendarItem(unwrapEntry(response.data));
}

export async function deleteContentEntry(id: string): Promise<void> {
  await apiClient.delete(`/api/content-calendar/entries/${id}`);
}
