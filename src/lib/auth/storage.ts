const TOKEN_KEY = 'token';
const AUTH_CHANGE_EVENT = 'auth-changed';

function notifyAuthChanged(): void {
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}

export function getToken(): string | null {
  return window.localStorage.getItem(TOKEN_KEY);
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
