import { describe, expect, it } from 'vitest';
import {
  announcementTitle,
  asNumber,
  creditPercent,
  firstNameFrom,
  formatCardDate,
  greetingForDate,
  normalizeCalendarEntries,
  normalizeDashboardData,
  relativeTime,
  weekdayLabel,
} from '../src/lib/dashboard';

describe('dashboard helpers', () => {
  it('returns time-of-day greetings', () => {
    expect(greetingForDate(new Date('2026-05-01T08:00:00'))).toBe('Good Morning');
    expect(greetingForDate(new Date('2026-05-01T13:00:00'))).toBe('Good Afternoon');
    expect(greetingForDate(new Date('2026-05-01T19:00:00'))).toBe('Good Evening');
  });

  it('extracts a first name', () => {
    expect(firstNameFrom('Ava Sterling')).toBe('Ava');
    expect(firstNameFrom(undefined)).toBe('there');
  });

  it('formats calendar dates in UTC', () => {
    expect(formatCardDate('2026-05-01T12:00:00.000Z')).toBe('May 01');
    expect(weekdayLabel('2026-05-04T12:00:00.000Z')).toBe('MON');
  });

  it('formats relative timestamps', () => {
    const now = Date.parse('2026-05-01T12:00:00.000Z');
    expect(relativeTime('2026-05-01T10:00:00.000Z', now)).toBe('2h ago');
    expect(relativeTime('2026-04-30T12:00:00.000Z', now)).toBe('Yesterday');
  });

  it('parses numeric strings', () => {
    expect(asNumber('1,420')).toBe(1420);
    expect(asNumber(5000)).toBe(5000);
  });

  it('normalizes dashboard payload objects', () => {
    const data = normalizeDashboardData({
      profile: { first_name: 'Ava', name: 'Ava Sterling' },
      announcements: [
        { id: 'a1', announcement_title: 'Spring pack is live', created_at: '2026-05-01T10:00:00.000Z' },
      ],
      analytics: {
        downloads: 312,
        content_generated: 247,
        ai_credit_usage: { current: 1420, total: 5000 },
      },
    });

    expect(data.profile?.first_name).toBe('Ava');
    expect(data.announcements).toHaveLength(1);
    expect(announcementTitle(data.announcements[0])).toBe('Spring pack is live');
    expect(data.downloads).toBe(312);
    expect(data.contentGenerated).toBe(247);
    expect(data.credits).toEqual({ current: 1420, total: 5000 });
    expect(creditPercent(data.credits ?? { current: 0, total: 1 })).toBeCloseTo(28.4);
  });

  it('normalizes calendar list envelopes', () => {
    const entries = normalizeCalendarEntries({
      message: 'ok',
      data: {
        items: [
          {
            id: 'c1',
            title: 'Reels for the weekend',
            date: '2026-05-01T00:00:00.000Z',
          },
        ],
      },
    });
    expect(entries).toHaveLength(1);
    expect(entries[0]?.title).toBe('Reels for the weekend');
  });

  it('returns empty collections for unknown dashboard shapes', () => {
    const data = normalizeDashboardData({});
    expect(data.announcements).toEqual([]);
    expect(data.calendarEntries).toEqual([]);
    expect(data.downloads).toBeNull();
    expect(data.credits).toBeNull();
  });
});
