import axios from 'axios';
import type {
  ErrorEnvelope,
  ProfileDownloadItem,
  ProfileDownloadsListResponse,
  ProfileReDownloadPayload,
  ProfileReDownloadResponse,
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

export function normalizeProfileDownloadItem(
  value: unknown,
): ProfileDownloadItem | null {
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
    file_type: readString(value, [
      'file_type',
      'fileType',
      'type',
      'category',
    ]),
    size: readString(value, ['size', 'file_size', 'fileSize']),
    downloaded_at: readString(value, [
      'downloaded_at',
      'downloadedAt',
      'last_download_date',
      'lastDownloadDate',
      'date',
      'created_at',
      'createdAt',
    ]),
    download_url: readString(value, [
      'download_url',
      'downloadUrl',
      'url',
      'link',
    ]),
  };
}

export function unwrapProfileDownloadItems(
  payload: ProfileDownloadsListResponse | ProfileDownloadItem[],
): ProfileDownloadItem[] {
  if (Array.isArray(payload)) {
    return payload
      .map((item) => normalizeProfileDownloadItem(item))
      .filter((item): item is ProfileDownloadItem => item !== null);
  }

  const items = payload.data?.items ?? [];

  return items
    .map((item) => normalizeProfileDownloadItem(item))
    .filter((item): item is ProfileDownloadItem => item !== null);
}

export function getProfileDownloadsErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ErrorEnvelope>(error)) {
    const message = error.response?.data.message;
    if (message) {
      return message;
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return 'Something went wrong while loading your download history.';
}

export function getProfileReDownloadErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ErrorEnvelope>(error)) {
    const message = error.response?.data.message;
    if (message) {
      return message;
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return 'Something went wrong while re-downloading this file.';
}

export async function getProfileDownloads(): Promise<ProfileDownloadItem[]> {
  const response = await apiClient.get<
    ProfileDownloadsListResponse | ProfileDownloadItem[]
  >('/api/profile/downloads');

  return unwrapProfileDownloadItems(response.data);
}

function resolveDownloadUrl(payload: ProfileReDownloadResponse): string {
  return payload.data?.download_url ?? payload.data?.url ?? '';
}

export async function reDownloadProfileFile(
  body: ProfileReDownloadPayload,
): Promise<string> {
  const response = await apiClient.post<ProfileReDownloadResponse>(
    '/api/profile/downloads/re-download',
    body,
  );

  return resolveDownloadUrl(response.data);
}
