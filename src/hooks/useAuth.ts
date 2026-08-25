import { useCallback, useSyncExternalStore } from 'react';
import { TOKEN_KEY } from '../lib/api/client';
import type { AuthUser } from '../types/api';

const USER_KEY = 'auth_user';

type AuthState = {
  token: string | null;
  user: AuthUser | null;
};

let authState: AuthState = {
  token: localStorage.getItem(TOKEN_KEY),
  user: parseUser(localStorage.getItem(USER_KEY)),
};

const listeners = new Set<() => void>();

function parseUser(raw: string | null): AuthUser | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

function emitChange() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): AuthState {
  return authState;
}

function setAuthState(next: AuthState) {
  authState = next;
  emitChange();
}

export function useAuth() {
  const state = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  const getToken = useCallback(() => state.token, [state.token]);

  const isAuthenticated = useCallback(() => Boolean(state.token), [state.token]);

  const login = useCallback((token: string, user: AuthUser) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    setAuthState({ token, user });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setAuthState({ token: null, user: null });
  }, []);

  return {
    token: state.token,
    user: state.user,
    getToken,
    isAuthenticated,
    login,
    logout,
  };
}
