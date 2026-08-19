import { apiClient } from '@/lib/api/client';
import { getApiErrorMessage, pickString, unwrapData } from '@/lib/api/errors';
import type { ProfileDownloadItem } from '@/types/api';

function normalizeDownloadItem(raw: unknown): ProfileDownloadItem | null {
  if (typeof raw !== 'object' || raw === null) return null;

  const source = raw as Record<string, unknown>;
  const id = pickString(source, ['id']);
  const title = pickString(source, ['title']);

  if (!id || !title) return null;

  return {
    id,
    title,
    file_type: pickString(source, ['file_type', 'fileType', 'type', 'category']),
    size: pickString(source, ['size', 'file_size', 'fileSize']),
    downloaded_at: pickString(source, [
      'downloaded_at',
      'downloadedAt',
      'last_download_date',
      'lastDownloadDate',
      'date',
      'created_at',
      'createdAt',
    ]),
    download_url: pickString(source, ['download_url', 'downloadUrl', 'url', 'link']),
  };
}

function normalizeDownloadList(payload: unknown): ProfileDownloadItem[] {
  if (Array.isArray(payload)) {
    return payload
      .map((item) => normalizeDownloadItem(item))
      .filter((item): item is ProfileDownloadItem => item !== null);
  }

  const data = unwrapData<{ items?: unknown[] }>(payload);
  const items = data?.items ?? [];

  return items
    .map((item) => normalizeDownloadItem(item))
    .filter((item): item is ProfileDownloadItem => item !== null);
}

export async function listProfileDownloads(): Promise<ProfileDownloadItem[]> {
  const response = await apiClient.get('/api/profile/downloads');
  return normalizeDownloadList(response.data);
}

export async function reDownload(id: string): Promise<string> {
  const response = await apiClient.post('/api/profile/downloads/re-download', {
    id,
  });
  const data = unwrapData<{ download_url?: string; url?: string }>(response.data);
  return data?.download_url ?? data?.url ?? '';
}

export function getDownloadsErrorMessage(error: unknown): string {
  return getApiErrorMessage(
    error,
    'Something went wrong while loading your download history.',
  );
}

export function getReDownloadErrorMessage(error: unknown): string {
  return getApiErrorMessage(
    error,
    'Something went wrong while re-downloading this file.',
  );
}

export function formatFileSize(size: string): string {
  if (/[KMG]B/i.test(size)) return size;

  const numeric = Number.parseFloat(size);
  if (Number.isNaN(numeric)) return size;
  if (numeric >= 1_000_000) return `${(numeric / 1_000_000).toFixed(1)} MB`;
  if (numeric >= 1_000) return `${(numeric / 1_000).toFixed(1)} KB`;
  return `${numeric} B`;
}
