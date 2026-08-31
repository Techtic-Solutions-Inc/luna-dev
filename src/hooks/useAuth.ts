import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { AUTH_TOKEN_KEY, AUTH_USER_KEY, type AuthUser } from '@/types/api';

function readUser(): AuthUser | null {
  if (typeof window === 'undefined') {
    return null;
  }
  const raw = window.localStorage.getItem(AUTH_USER_KEY);
  if (!raw) {
    return null;
  }
  try {
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) {
      return null;
    }
    const record = parsed as Record<string, unknown>;
    if (typeof record.email !== 'string') {
      return null;
    }
    return {
      id: typeof record.id === 'string' ? record.id : '',
      name: typeof record.name === 'string' ? record.name : '',
      first_name: typeof record.first_name === 'string' ? record.first_name : '',
      last_name: typeof record.last_name === 'string' ? record.last_name : '',
      email: record.email,
    };
  } catch {
    return null;
  }
}

export function getToken(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }
  return window.localStorage.getItem(AUTH_TOKEN_KEY);
}

export function persistSession(token: string, user: AuthUser): void {
  window.localStorage.setItem(AUTH_TOKEN_KEY, token);
  window.localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
}

export function clearSession(): void {
  window.localStorage.removeItem(AUTH_TOKEN_KEY);
  window.localStorage.removeItem(AUTH_USER_KEY);
}

interface AuthContextValue {
  token: string | null;
  user: AuthUser | null;
  getToken: () => string | null;
  isAuthenticated: () => boolean;
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
  setUser: (user: AuthUser | null) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => getToken());
  const [user, setUser] = useState<AuthUser | null>(() => readUser());

  const isAuthenticated = useCallback(() => Boolean(token ?? getToken()), [token]);

  const login = useCallback((nextToken: string, nextUser: AuthUser) => {
    persistSession(nextToken, nextUser);
    setToken(nextToken);
    setUser(nextUser);
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      token,
      user,
      getToken,
      isAuthenticated,
      login,
      logout,
      setUser,
    }),
    [token, user, isAuthenticated, login, logout],
  );

  return createElement(AuthContext.Provider, { value }, children);
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
