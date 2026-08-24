import { useSyncExternalStore } from 'react';

const TOKEN_KEY = 'token';
const AUTH_EVENT = 'agentwise-auth-change';

function emitAuthChange(): void {
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
  emitAuthChange();
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
  emitAuthChange();
}

export function isAuthenticated(): boolean {
  return Boolean(getToken());
}

function subscribe(onStoreChange: () => void): () => void {
  window.addEventListener(AUTH_EVENT, onStoreChange);
  window.addEventListener('storage', onStoreChange);
  return () => {
    window.removeEventListener(AUTH_EVENT, onStoreChange);
    window.removeEventListener('storage', onStoreChange);
  };
}

export const useAuth = () => {
  const token = useSyncExternalStore(subscribe, getToken, () => null);

  return {
    token,
    getToken,
    setToken,
    clearToken,
    isAuthenticated,
  };
};
