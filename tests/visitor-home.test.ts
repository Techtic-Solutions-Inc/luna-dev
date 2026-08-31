import { describe, expect, it } from 'vitest';
import { parseVisitorHome } from '@/services/visitor';
import { visitorHomeErrorMessage, isVisitorHomeNotFound } from '@/hooks/useVisitorHome';

describe('parseVisitorHome', () => {
  it('unwraps data.items from the search envelope', () => {
    const parsed = parseVisitorHome({
      success: true,
      message: 'ok',
      data: {
        items: [
          {
            id: '1',
            title: 'Hero',
            description: 'Marketing copy',
            image_url: '/assets/figma/attlgjgqkngefohwz-large-img6232-1-I2295-3482-65-2289.png',
          },
        ],
        pagination: { page: 1, limit: 10 },
      },
    });
    expect(parsed.items).toHaveLength(1);
    expect(parsed.items[0]?.title).toBe('Hero');
    expect(parsed.pagination.page).toBe(1);
  });

  it('treats a missing payload as an empty collection', () => {
    expect(parseVisitorHome(null).items).toEqual([]);
  });
});

describe('visitorHomeErrorMessage', () => {
  it('maps unauthenticated visitor failures to a session-free message', () => {
    const error = Object.assign(new Error('Unauthorized'), {
      isAxiosError: true,
      response: { status: 401 },
    });
    expect(visitorHomeErrorMessage(error)).toBe(
      'Home content could not be loaded. Please try again.',
    );
  });

  it('maps a missing visitor endpoint to a visitor-safe 404 message', () => {
    const error = Object.assign(new Error('Not Found'), {
      isAxiosError: true,
      response: { status: 404 },
    });
    expect(visitorHomeErrorMessage(error)).toBe(
      'Home content is not available yet. Please try again later.',
    );
    expect(isVisitorHomeNotFound(error)).toBe(true);
  });
});
