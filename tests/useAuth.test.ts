import { describe, expect, it } from 'vitest';
import { clearToken, getToken, isAuthenticated, setToken } from '../src/hooks/useAuth';

describe('useAuth helpers', () => {
  it('stores and clears the token', () => {
    clearToken();
    expect(isAuthenticated()).toBe(false);
    setToken('abc');
    expect(getToken()).toBe('abc');
    expect(isAuthenticated()).toBe(true);
    clearToken();
    expect(getToken()).toBeNull();
  });
});
