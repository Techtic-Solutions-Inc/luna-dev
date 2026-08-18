import type {
  ProfileContentItem,
  ProfileContentListResponse,
  ProfileContentMutationResponse,
  ProfileContentPayload,
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
  }

  return '';
}

function readNumber(
  record: Record<string, unknown>,
  keys: readonly string[],
): number | undefined {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === 'number' && Number.isFinite(value)) {
      return value;
    }
  }

  return undefined;
}

export function normalizeProfileContentItem(
  value: unknown,
): ProfileContentItem | null {
  if (!isRecord(value)) {
    return null;
  }

  const id = readString(value, ['id']);
  const title = readString(value, ['title']);

  if (!id || !title) {
    return null;
  }

  const date = readString(value, ['date', 'created_at', 'updated_at']);

  return {
    id,
    title,
    description: readString(value, ['description']),
    date,
    content: readString(value, ['content']),
    created_at: readString(value, ['created_at']),
    updated_at: readString(value, ['updated_at']),
  };
}

export interface ProfileContentList {
  items: ProfileContentItem[];
  total: number;
}

export function unwrapProfileContentList(
  payload: ProfileContentListResponse | ProfileContentItem[],
): ProfileContentList {
  if (Array.isArray(payload)) {
    const items = payload
      .map((item) => normalizeProfileContentItem(item))
      .filter((item): item is ProfileContentItem => item !== null);

    return { items, total: items.length };
  }

  const rawItems = payload.data?.items ?? [];
  const items = rawItems
    .map((item) => normalizeProfileContentItem(item))
    .filter((item): item is ProfileContentItem => item !== null);

  const totalFromPayload = isRecord(payload.data)
    ? readNumber(payload.data, ['total', 'count'])
    : undefined;

  return {
    items,
    total: totalFromPayload ?? items.length,
  };
}

export function getProfileContentErrorMessage(
  error: unknown,
  fallback = 'Something went wrong while loading your generated content.',
): string {
  return getApiErrorMessage(error, fallback);
}

export async function getProfileContent(): Promise<ProfileContentList> {
  const response = await apiClient.get<
    ProfileContentListResponse | ProfileContentItem[]
  >('/api/profile/content');

  return unwrapProfileContentList(response.data);
}

function unwrapEntry(
  payload: ProfileContentMutationResponse | ProfileContentItem,
): unknown {
  if (isRecord(payload) && isRecord(payload.data)) {
    return payload.data;
  }

  return payload;
}

export async function createProfileContent(
  body: ProfileContentPayload,
): Promise<ProfileContentItem | null> {
  const response = await apiClient.post<
    ProfileContentMutationResponse | ProfileContentItem
  >('/api/profile/content', body);

  return normalizeProfileContentItem(unwrapEntry(response.data));
}

export async function updateProfileContent(
  id: string,
  body: ProfileContentPayload,
): Promise<ProfileContentItem | null> {
  const response = await apiClient.put<
    ProfileContentMutationResponse | ProfileContentItem
  >(`/api/profile/content/${id}`, body);

  return normalizeProfileContentItem(unwrapEntry(response.data));
}

export async function deleteProfileContent(id: string): Promise<void> {
  await apiClient.delete(`/api/profile/content/${id}`);
}
