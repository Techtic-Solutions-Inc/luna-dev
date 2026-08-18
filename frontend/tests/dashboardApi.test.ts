import { beforeEach, describe, expect, it, vi } from 'vitest';
import { apiClient } from '../src/lib/api/client';
import {
  createDashboardAnnouncement,
  getDashboardAnalytics,
  getDashboardAnnouncements,
  normalizeDashboardAnalytics,
  normalizeDashboardAnnouncement,
} from '../src/lib/api/dashboard';

vi.mock('../src/lib/api/client', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

const announcement = {
  id: 'ann-1',
  title: 'Spring listing template pack is live',
  description: 'New templates',
  date: '2026-05-18T12:00:00.000Z',
  created_at: '2026-05-18T12:00:00.000Z',
  updated_at: '2026-05-18T12:00:00.000Z',
};

describe('dashboard API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('lists announcements from /api/dashboard/announcements', async () => {
    vi.mocked(apiClient.get).mockResolvedValueOnce({
      data: { success: true, message: 'ok', data: { items: [announcement] } },
    });

    const result = await getDashboardAnnouncements();

    expect(apiClient.get).toHaveBeenCalledWith('/api/dashboard/announcements');
    expect(result).toHaveLength(1);
    expect(result[0]?.title).toBe('Spring listing template pack is live');
  });

  it('creates an announcement with POST /api/dashboard/announcements', async () => {
    vi.mocked(apiClient.post).mockResolvedValueOnce({ data: announcement });

    const created = await createDashboardAnnouncement({
      title: announcement.title,
      description: announcement.description,
    });

    expect(apiClient.post).toHaveBeenCalledWith('/api/dashboard/announcements', {
      title: announcement.title,
      description: announcement.description,
    });
    expect(created?.id).toBe('ann-1');
  });

  it('loads analytics from /api/dashboard/analytics', async () => {
    vi.mocked(apiClient.get).mockResolvedValueOnce({
      data: {
        success: true,
        message: 'ok',
        data: {
          downloads: 312,
          content_generated: 247,
          ai_credits_used: 1420,
          ai_credits_limit: 5000,
        },
      },
    });

    const result = await getDashboardAnalytics();

    expect(apiClient.get).toHaveBeenCalledWith('/api/dashboard/analytics');
    expect(result?.downloads).toBe(312);
    expect(result?.content_generated).toBe(247);
  });

  it('normalizes announcement and analytics payloads', () => {
    expect(
      normalizeDashboardAnnouncement({
        id: '1',
        name: 'Update',
        createdAt: '2026-05-01T00:00:00.000Z',
      })?.title,
    ).toBe('Update');

    expect(
      normalizeDashboardAnalytics({
        downloads: '1,420',
        contentGenerated: 10,
        activities: [{ title: 'Posted a reel' }],
      })?.activities[0]?.title,
    ).toBe('Posted a reel');
  });
});
