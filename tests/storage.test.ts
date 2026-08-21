import { getToken, removeToken, setToken } from '../src/lib/auth/storage';

describe('auth storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('stores and reads the auth token', () => {
    setToken('abc123');
    expect(getToken()).toBe('abc123');
  });

  it('removes the auth token', () => {
    setToken('abc123');
    removeToken();
    expect(getToken()).toBeNull();
  });
});
