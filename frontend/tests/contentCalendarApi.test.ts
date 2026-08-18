import {
  createContentEntry,
  deleteContentEntry,
  getContentCalendar,
  getContentCalendarEntries,
  normalizeContentCalendarItem,
  updateContentEntry,
} from '../src/lib/api/contentCalendar';
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
  id: '1',
  title: 'Market update — Austin Q2',
  date: '2026-06-01T17:30:00.000Z',
  content: 'facebook post',
  description: 'Quarterly snapshot',
  full_name: 'Joseph Stanley',
  phone: '512-555-0100',
  link: 'https://example.com/house.jpg',
  error: null,
  is_active: true,
  created_at: '2026-06-01T12:00:00.000Z',
  updated_at: '2026-06-01T12:00:00.000Z',
};

const payload = {
  title: item.title,
  date: item.date,
  content: item.content,
  description: item.description,
  full_name: item.full_name,
  phone: item.phone,
  link: item.link,
  is_active: true,
};

describe('content calendar API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('lists calendar entries from /api/content-calendar', async () => {
    vi.mocked(apiClient.get).mockResolvedValueOnce({
      data: { success: true, message: 'ok', data: { items: [item] } },
    });

    const result = await getContentCalendar();

    expect(apiClient.get).toHaveBeenCalledWith('/api/content-calendar');
    expect(result).toHaveLength(1);
    expect(result[0]?.title).toBe('Market update — Austin Q2');
  });

  it('retrieves personal calendar entries from /api/content-calendar/entries', async () => {
    vi.mocked(apiClient.get).mockResolvedValueOnce({
      data: { success: true, message: 'ok', data: { items: [item] } },
    });

    const result = await getContentCalendarEntries();

    expect(apiClient.get).toHaveBeenCalledWith('/api/content-calendar/entries');
    expect(result[0]?.id).toBe('1');
  });

  it('creates a calendar entry', async () => {
    vi.mocked(apiClient.post).mockResolvedValueOnce({ data: item });

    const created = await createContentEntry(payload);

    expect(apiClient.post).toHaveBeenCalledWith(
      '/api/content-calendar/entries',
      payload,
    );
    expect(created?.id).toBe('1');
  });

  it('updates a calendar entry by id', async () => {
    vi.mocked(apiClient.put).mockResolvedValueOnce({ data: item });

    await updateContentEntry('1', payload);

    expect(apiClient.put).toHaveBeenCalledWith(
      '/api/content-calendar/entries/1',
      payload,
    );
  });

  it('deletes a calendar entry by id', async () => {
    vi.mocked(apiClient.delete).mockResolvedValueOnce({ data: {} });

    await deleteContentEntry('1');

    expect(apiClient.delete).toHaveBeenCalledWith(
      '/api/content-calendar/entries/1',
    );
  });

  it('normalizes calendar items from alternate payloads', () => {
    const normalized = normalizeContentCalendarItem({
      id: '9',
      title: 'Open House Sunday',
      date: '2026-06-08T18:00:00.000Z',
      content: 'instagram story',
    });

    expect(normalized).toMatchObject({
      id: '9',
      title: 'Open House Sunday',
      content: 'instagram story',
      is_active: true,
    });
  });
});
