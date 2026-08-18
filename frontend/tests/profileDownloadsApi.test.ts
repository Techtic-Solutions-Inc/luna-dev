import {
  extractDownloadUrl,
  getProfileDownloads,
  normalizeProfileDownloadItem,
  reDownloadProfileFile,
  triggerBrowserDownload,
} from '../src/lib/api/profileDownloads';
import { apiClient } from '../src/lib/api/client';
import {
  formatDownloadDate,
  formatDownloadMeta,
  formatFileSize,
} from '../src/lib/profileDownloadsDisplay';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { ProfileDownloadItem } from '../src/types/api';

vi.mock('../src/lib/api/client', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

const item = {
  id: '12',
  title: 'Open House Story Pack',
  file_type: 'Social Templates',
  size: '12.8 MB',
  date: '2026-06-02T12:00:00.000Z',
  created_at: '2026-06-02T12:00:00.000Z',
  updated_at: '2026-06-02T12:00:00.000Z',
  url: 'https://cdn.example.com/open-house.zip',
};

describe('profile downloads API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('gets download history from /api/profile/downloads', async () => {
    vi.mocked(apiClient.get).mockResolvedValueOnce({
      data: { success: true, message: 'ok', data: { items: [item], total: 312 } },
    });

    const result = await getProfileDownloads();

    expect(apiClient.get).toHaveBeenCalledWith('/api/profile/downloads');
    expect(result.items).toHaveLength(1);
    expect(result.total).toBe(312);
  });

  it('normalizes alternate download field names', () => {
    const normalized = normalizeProfileDownloadItem({
      id: '9',
      title: 'Buyer Consultation Checklist',
      type: 'Checklists',
      file_size: 839680,
      downloaded_at: '2026-05-24T12:00:00.000Z',
    });

    expect(normalized).toMatchObject({
      id: '9',
      title: 'Buyer Consultation Checklist',
      file_type: 'Checklists',
      size: '839680',
      date: '2026-05-24T12:00:00.000Z',
    });
  });

  it('posts a re-download request and starts the file download', async () => {
    const click = vi.fn();
    const originalCreate = document.createElement.bind(document);

    vi.spyOn(document, 'createElement').mockImplementation((tagName: string) => {
      const element = originalCreate(tagName);

      if (tagName === 'a') {
        element.click = click;
      }

      return element;
    });

    vi.mocked(apiClient.post).mockResolvedValueOnce({
      data: {
        success: true,
        message: 'ok',
        data: { url: 'https://cdn.example.com/file.zip' },
      },
    });

    await reDownloadProfileFile({ id: '12' });

    expect(apiClient.post).toHaveBeenCalledWith(
      '/api/profile/downloads/re-download',
      { id: '12' },
    );
    expect(click).toHaveBeenCalled();

    vi.restoreAllMocks();
  });

  it('extracts a download url from nested payloads', () => {
    expect(
      extractDownloadUrl({ data: { download_url: 'https://cdn.example.com/a' } }),
    ).toBe('https://cdn.example.com/a');
  });
});

describe('download display helpers', () => {
  it('formats byte sizes and dates for list metadata', () => {
    expect(formatFileSize('4404019')).toBe('4.2 MB');
    expect(formatFileSize('4.2 MB')).toBe('4.2 MB');
    expect(formatDownloadDate('2026-06-04T12:00:00.000Z')).toBe('Jun 04, 2026');

    const download: ProfileDownloadItem = {
      id: '1',
      title: 'Luxury Listing Guide — 2026',
      file_type: 'Guides',
      size: '4.2 MB',
      date: '2026-06-04T12:00:00.000Z',
      created_at: '2026-06-04T12:00:00.000Z',
      updated_at: '2026-06-04T12:00:00.000Z',
      url: '',
    };

    expect(formatDownloadMeta(download)).toBe('Guides · 4.2 MB · Jun 04, 2026');
  });
});

describe('triggerBrowserDownload', () => {
  it('creates a temporary download link', () => {
    const click = vi.fn();
    const originalCreate = document.createElement.bind(document);

    vi.spyOn(document, 'createElement').mockImplementation((tagName: string) => {
      const element = originalCreate(tagName);

      if (tagName === 'a') {
        element.click = click;
      }

      return element;
    });

    triggerBrowserDownload('https://cdn.example.com/pack.zip', 'pack.zip');

    expect(click).toHaveBeenCalled();
    vi.restoreAllMocks();
  });
});
