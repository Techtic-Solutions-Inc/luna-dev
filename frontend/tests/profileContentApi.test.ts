import {
  createProfileContent,
  deleteProfileContent,
  getProfileContent,
  updateProfileContent,
} from '../src/lib/api/profileContent';
import { apiClient } from '../src/lib/api/client';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../src/lib/api/client', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

const item = {
  id: '12',
  title: 'Open House Invite — Sunday',
  description: 'Join us this weekend.',
  date: '2026-06-01T12:00:00.000Z',
  content: 'Join us this weekend.',
  created_at: '2026-06-01T12:00:00.000Z',
  updated_at: '2026-06-01T12:00:00.000Z',
};

describe('profile content API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('gets generated content from /api/profile/content', async () => {
    vi.mocked(apiClient.get).mockResolvedValueOnce({
      data: { success: true, message: 'ok', data: { items: [item], total: 1 } },
    });

    const result = await getProfileContent();

    expect(apiClient.get).toHaveBeenCalledWith('/api/profile/content');
    expect(result.items).toHaveLength(1);
    expect(result.total).toBe(1);
  });

  it('creates generated content', async () => {
    vi.mocked(apiClient.post).mockResolvedValueOnce({ data: item });

    const created = await createProfileContent({
      title: item.title,
      description: item.description,
      date: item.date,
      content: item.content,
    });

    expect(apiClient.post).toHaveBeenCalledWith('/api/profile/content', {
      title: item.title,
      description: item.description,
      date: item.date,
      content: item.content,
    });
    expect(created?.id).toBe('12');
  });

  it('updates generated content by id', async () => {
    vi.mocked(apiClient.put).mockResolvedValueOnce({ data: item });

    await updateProfileContent('12', {
      title: item.title,
      description: item.description,
      date: item.date,
      content: item.content,
    });

    expect(apiClient.put).toHaveBeenCalledWith(
      '/api/profile/content/12',
      expect.objectContaining({ title: item.title }),
    );
  });

  it('deletes generated content by id', async () => {
    vi.mocked(apiClient.delete).mockResolvedValueOnce({ data: undefined });

    await deleteProfileContent('12');

    expect(apiClient.delete).toHaveBeenCalledWith('/api/profile/content/12');
  });
});
