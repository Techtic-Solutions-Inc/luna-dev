const TOKEN_KEY = 'token';
const AUTH_CHANGE_EVENT = 'auth-changed';
const TOKEN_KEYS = ['token', 'accessToken', 'access_token', 'authToken'] as const;

function notifyAuthChanged(): void {
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}

export function getToken(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }

  for (const key of TOKEN_KEYS) {
    const value = window.localStorage.getItem(key);
    if (value) {
      return value;
    }
  }

  return null;
}

export function setToken(token: string): void {
  window.localStorage.setItem(TOKEN_KEY, token);
  notifyAuthChanged();
}

export function clearToken(): void {
  window.localStorage.removeItem(TOKEN_KEY);
  notifyAuthChanged();
}

export function isAuthenticated(): boolean {
  return Boolean(getToken());
}

export function subscribeAuth(listener: () => void): () => void {
  window.addEventListener('storage', listener);
  window.addEventListener(AUTH_CHANGE_EVENT, listener);
  return () => {
    window.removeEventListener('storage', listener);
    window.removeEventListener(AUTH_CHANGE_EVENT, listener);
  };
}
