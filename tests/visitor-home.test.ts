import { describe, expect, it } from 'vitest';
import { parseVisitorHome } from '@/services/visitor';

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
