import { useCallback, useSyncExternalStore } from 'react';
import { TOKEN_KEY } from '../lib/api/client';

const AUTH_EVENT = 'auth-token-change';

function getTokenSnapshot(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }
  return window.localStorage.getItem(TOKEN_KEY);
}

function subscribeToAuth(onStoreChange: () => void): () => void {
  window.addEventListener('storage', onStoreChange);
  window.addEventListener(AUTH_EVENT, onStoreChange);
  return () => {
    window.removeEventListener('storage', onStoreChange);
    window.removeEventListener(AUTH_EVENT, onStoreChange);
  };
}

function notifyAuthChange() {
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function useAuth() {
  const token = useSyncExternalStore(subscribeToAuth, getTokenSnapshot, () => null);

  const setToken = useCallback((value: string) => {
    window.localStorage.setItem(TOKEN_KEY, value);
    notifyAuthChange();
  }, []);

  const clearToken = useCallback(() => {
    window.localStorage.removeItem(TOKEN_KEY);
    notifyAuthChange();
  }, []);

  const getToken = useCallback(() => getTokenSnapshot(), []);
  const isAuthenticated = useCallback(() => !!token, [token]);

  return { getToken, setToken, clearToken, isAuthenticated };
}
