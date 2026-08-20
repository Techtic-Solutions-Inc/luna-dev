/**
 * Single place that knows where the bearer token lives. The API client reads it
 * to sign requests and `ProtectedRoute` reads it to gate navigation.
 */
export const TOKEN_STORAGE_KEY = 'token';

/** `localStorage` throws in some privacy modes, so every access is guarded. */
const safeStorage = (): Storage | null => {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
};

export const getStoredToken = (): string | null => {
  const token = safeStorage()?.getItem(TOKEN_STORAGE_KEY) ?? null;
  return token !== null && token.length > 0 ? token : null;
};

export const setStoredToken = (token: string): void => {
  safeStorage()?.setItem(TOKEN_STORAGE_KEY, token);
};

export const clearStoredToken = (): void => {
  safeStorage()?.removeItem(TOKEN_STORAGE_KEY);
};

export const isAuthenticated = (): boolean => getStoredToken() !== null;
