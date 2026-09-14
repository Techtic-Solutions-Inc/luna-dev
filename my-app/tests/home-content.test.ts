import { describe, expect, it } from 'vitest';
import { buildHomeContentProps } from '@/components/features/home/homeContentMappers';
import type { HomeItem } from '@/types/home';

const sampleItem = (overrides: Partial<HomeItem> = {}): HomeItem => ({
  id: '1',
  name: 'headline',
  title: 'Stunning Real Estate Marketing',
  description: 'Personalized to your market in minutes.',
  link: '',
  image: '',
  image_url: '',
  category: 'hero',
  tags: [],
  full_name: null,
  first_name: null,
  last_name: null,
  email: null,
  phone: null,
  phone_number: null,
  error: null,
  is_active: true,
  created_at: '',
  updated_at: '',
  ...overrides,
});

describe('buildHomeContentProps', () => {
  it('maps hero and section availability from API items', () => {
    const props = buildHomeContentProps([
      sampleItem(),
      sampleItem({
        id: '2',
        name: 'gallery-1',
        category: 'gallery',
        image_url: '/assets/figma/attlgjgqkngefohwz-large-img6232-1-I2295-3482-323-1646.png',
      }),
    ]);

    expect(props.headline).toBe('Stunning Real Estate Marketing');
    expect(props.sections.hero).toBe(true);
    expect(props.sections.gallery).toBe(true);
    expect(props.galleryImages).toHaveLength(1);
  });

  it('returns empty sections when no items are provided', () => {
    const props = buildHomeContentProps([]);
    expect(props.sections.hero).toBe(false);
    expect(props.galleryImages).toEqual([]);
  });
});
