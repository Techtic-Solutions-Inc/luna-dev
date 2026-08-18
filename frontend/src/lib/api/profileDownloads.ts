import axios from 'axios';
import type {
  ErrorEnvelope,
  ProfileDownloadItem,
  ProfileDownloadListResponse,
  ReDownloadPayload,
  ReDownloadResponse,
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
): number | undefined {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === 'number' && Number.isFinite(value)) {
      return value;
    }
  }

  return undefined;
}

function readSize(record: Record<string, unknown>): string {
  const asString = readString(record, ['size', 'file_size', 'fileSize']);

  if (asString) {
    return asString;
  }

  const asNumber = readNumber(record, ['size', 'file_size', 'fileSize', 'bytes']);

  if (asNumber === undefined) {
    return '';
  }

  return String(asNumber);
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

  const date = readString(value, [
    'date',
    'downloaded_at',
    'download_date',
    'last_downloaded_at',
    'created_at',
    'updated_at',
  ]);

  return {
    id,
    title,
    file_type: readString(value, [
      'file_type',
      'fileType',
      'type',
      'category',
      'file_category',
    ]),
    size: readSize(value),
    date,
    created_at: readString(value, ['created_at']),
    updated_at: readString(value, ['updated_at']),
    url: readString(value, ['url', 'link', 'download_url', 'href']),
  };
}

export interface ProfileDownloadList {
  items: ProfileDownloadItem[];
  total: number;
}

export function unwrapProfileDownloadList(
  payload: ProfileDownloadListResponse | ProfileDownloadItem[],
): ProfileDownloadList {
  if (Array.isArray(payload)) {
    const items = payload
      .map((item) => normalizeProfileDownloadItem(item))
      .filter((item): item is ProfileDownloadItem => item !== null);

    return { items, total: items.length };
  }

  const rawItems = payload.data?.items ?? [];
  const items = rawItems
    .map((item) => normalizeProfileDownloadItem(item))
    .filter((item): item is ProfileDownloadItem => item !== null);

  const totalFromPayload = isRecord(payload.data)
    ? readNumber(payload.data, ['total', 'count'])
    : undefined;

  return {
    items,
    total: totalFromPayload ?? items.length,
  };
}

export function getProfileDownloadsErrorMessage(
  error: unknown,
  fallback = 'Something went wrong while loading your download history.',
): string {
  if (axios.isAxiosError<ErrorEnvelope>(error)) {
    const message = error.response?.data.message;
    if (message) {
      return message;
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
}

export async function getProfileDownloads(): Promise<ProfileDownloadList> {
  const response = await apiClient.get<
    ProfileDownloadListResponse | ProfileDownloadItem[]
  >('/api/profile/downloads');

  return unwrapProfileDownloadList(response.data);
}

function unwrapReDownloadPayload(
  payload: ReDownloadResponse | Record<string, unknown>,
): Record<string, unknown> {
  if (isRecord(payload) && isRecord(payload.data)) {
    return payload.data;
  }

  if (isRecord(payload)) {
    return payload;
  }

  return {};
}

export function extractDownloadUrl(payload: unknown): string {
  if (!isRecord(payload)) {
    return '';
  }

  const nested = unwrapReDownloadPayload(
    payload as ReDownloadResponse | Record<string, unknown>,
  );

  return readString(nested, ['url', 'link', 'download_url', 'href']);
}

export function triggerBrowserDownload(url: string, filename?: string): void {
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.rel = 'noopener noreferrer';

  if (filename) {
    anchor.download = filename;
  } else {
    anchor.target = '_blank';
  }

  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}

export async function reDownloadProfileFile(
  payload: ReDownloadPayload,
): Promise<void> {
  const response = await apiClient.post<
    ReDownloadResponse | Record<string, unknown>
  >('/api/profile/downloads/re-download', { id: payload.id });

  const url = extractDownloadUrl(response.data) || payload.url || '';

  if (url) {
    triggerBrowserDownload(url, payload.title);
  }
}
