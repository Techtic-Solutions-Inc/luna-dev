import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { extractAccessToken } from '../src/lib/api/client';
import { formatBearerToken, getToken, persistSession, clearSession } from '../src/lib/session';
import type { LoginResponse } from '../src/types/auth';

class MemoryStorage implements Storage {
  private store = new Map<string, string>();

  get length() {
    return this.store.size;
  }

  clear(): void {
    this.store.clear();
  }

  getItem(key: string): string | null {
    return this.store.get(key) ?? null;
  }

  key(index: number): string | null {
    return [...this.store.keys()][index] ?? null;
  }

  removeItem(key: string): void {
    this.store.delete(key);
  }

  setItem(key: string, value: string): void {
    this.store.set(key, value);
  }
}

describe('auth session helpers', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', new MemoryStorage());
    vi.stubGlobal('sessionStorage', new MemoryStorage());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });
  it('formats bearer tokens without double prefixing', () => {
    expect(formatBearerToken('abc123')).toBe('Bearer abc123');
    expect(formatBearerToken('Bearer abc123')).toBe('Bearer abc123');
    expect(formatBearerToken('  Bearer abc123  ')).toBe('Bearer abc123');
    expect(formatBearerToken(null)).toBeNull();
  });

  it('persists and reads tokens from both storage keys', () => {
    clearSession();
    persistSession('session-token', { email: 'ava@agentwise.com' }, false);
    expect(getToken()).toBe('session-token');
    expect(localStorage.getItem('accessToken')).toBeNull();
    expect(sessionStorage.getItem('token')).toBe('session-token');
    expect(sessionStorage.getItem('accessToken')).toBe('session-token');
    clearSession();
  });

  it('extracts access tokens from login envelopes', () => {
    const response: LoginResponse = {
      success: true,
      message: 'ok',
      data: {
        id: '1',
        name: 'Ava Sterling',
        first_name: 'Ava',
        last_name: 'Sterling',
        email: 'ava@agentwise.com',
        token: 'primary-token',
        accessToken: 'secondary-token',
        refreshToken: 'refresh-token',
        tokenType: 'Bearer',
      },
    };
    expect(extractAccessToken(response)).toBe('primary-token');
  });
});
