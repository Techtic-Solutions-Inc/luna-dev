import { apiClient } from '@/lib/api/client';
import { getApiErrorMessage, pickString, unwrapData } from '@/lib/api/errors';
import {
  isProfileContentApiReady,
  ProfileApiUnavailableError,
} from '@/lib/feature-flags';
import type {
  CreateProfileContentRequest,
  ProfileContentItem,
  UpdateProfileContentRequest,
} from '@/types/api';

function assertProfileContentApiReady(): void {
  if (!isProfileContentApiReady) {
    throw new ProfileApiUnavailableError(
      'Content history is not available yet.',
    );
  }
}

function normalizeContentItem(raw: unknown): ProfileContentItem | null {
  if (typeof raw !== 'object' || raw === null) return null;

  const source = raw as Record<string, unknown>;
  const id = pickString(source, ['id']);
  const title = pickString(source, ['title']);

  if (!id || !title) return null;

  return {
    id,
    title,
    description: pickString(source, ['description']),
    content: pickString(source, ['content']),
    link: pickString(source, ['link']),
    created_at: pickString(source, ['created_at', 'createdAt', 'date']),
    updated_at: pickString(source, ['updated_at', 'updatedAt']),
  };
}

function normalizeContentList(payload: unknown): ProfileContentItem[] {
  if (Array.isArray(payload)) {
    return payload
      .map((item) => normalizeContentItem(item))
      .filter((item): item is ProfileContentItem => item !== null);
  }

  const data = unwrapData<{ items?: unknown[] }>(payload);
  const items = data?.items ?? [];

  return items
    .map((item) => normalizeContentItem(item))
    .filter((item): item is ProfileContentItem => item !== null);
}

function unwrapMutationData(payload: unknown): ProfileContentItem | null {
  const data = unwrapData<unknown>(payload);
  if (data) return normalizeContentItem(data);
  return normalizeContentItem(payload);
}

export async function listProfileContent(): Promise<ProfileContentItem[]> {
  assertProfileContentApiReady();
  const response = await apiClient.get('/api/profile/content');
  return normalizeContentList(response.data);
}

export async function createProfileContent(
  body: CreateProfileContentRequest,
): Promise<ProfileContentItem | null> {
  assertProfileContentApiReady();
  const response = await apiClient.post('/api/profile/content', body);
  return unwrapMutationData(response.data);
}

export async function updateProfileContent(
  id: string,
  body: UpdateProfileContentRequest,
): Promise<ProfileContentItem | null> {
  assertProfileContentApiReady();
  const response = await apiClient.put(`/api/profile/content/${id}`, body);
  return unwrapMutationData(response.data);
}

export async function deleteProfileContent(id: string): Promise<void> {
  assertProfileContentApiReady();
  await apiClient.delete(`/api/profile/content/${id}`);
}

export function getProfileContentErrorMessage(error: unknown): string {
  if (error instanceof ProfileApiUnavailableError) {
    return error.message;
  }
  return getApiErrorMessage(
    error,
    'Something went wrong while loading your content history.',
  );
}
