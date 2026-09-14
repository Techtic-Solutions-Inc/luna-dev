import { describe, expect, it } from 'vitest';
import { fetchHome } from '@/services/home';
import { HOME_API_PATH, VISITOR_HOME_QUERY_KEY } from '@/types/home';
import { homeScreen } from '@/theme/tokens';

describe('Home design tokens', () => {
  it('defines the Home screen background as #0e0d0d', () => {
    expect(homeScreen.name).toBe('Home');
    expect(homeScreen.background).toBe('#0e0d0d');
  });
});

describe('Home API client', () => {
  it('targets the visitor home endpoint', () => {
    expect(HOME_API_PATH).toBe('/api/visitor/home');
    expect(fetchHome.name).toBe('fetchHome');
    expect(VISITOR_HOME_QUERY_KEY).toEqual(['visitor', 'home']);
  });
});
