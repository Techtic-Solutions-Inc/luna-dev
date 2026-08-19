import axios from 'axios';
import type {
  ErrorEnvelope,
  ProfileContentItem,
  ProfileContentListResponse,
  ProfileContentMutationResponse,
  ProfileContentPayload,
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

  return {
    id,
    title,
    description: readString(value, ['description']),
    content: readString(value, ['content']),
    link: readString(value, ['link']),
    created_at: readString(value, ['created_at', 'createdAt', 'date']),
    updated_at: readString(value, ['updated_at', 'updatedAt']),
  };
}

export function unwrapProfileContentItems(
  payload: ProfileContentListResponse | ProfileContentItem[],
): ProfileContentItem[] {
  if (Array.isArray(payload)) {
    return payload
      .map((item) => normalizeProfileContentItem(item))
      .filter((item): item is ProfileContentItem => item !== null);
  }

  const items = payload.data?.items ?? [];

  return items
    .map((item) => normalizeProfileContentItem(item))
    .filter((item): item is ProfileContentItem => item !== null);
}

export function getProfileContentErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ErrorEnvelope>(error)) {
    const message = error.response?.data.message;
    if (message) {
      return message;
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return 'Something went wrong while loading your content history.';
}

export async function getProfileContent(): Promise<ProfileContentItem[]> {
  const response = await apiClient.get<
    ProfileContentListResponse | ProfileContentItem[]
  >('/api/profile/content');

  return unwrapProfileContentItems(response.data);
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
