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
import { isRecord } from '@/lib/guards';
import { queryClient } from '@/lib/queryClient';
import { currentUserQueryKey } from '@/lib/queryKeys';

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
    if (!isRecord(parsed)) {
      return null;
    }
    const email = parsed.email;
    if (typeof email !== 'string') {
      return null;
    }
    return {
      id: typeof parsed.id === 'string' ? parsed.id : '',
      name: typeof parsed.name === 'string' ? parsed.name : '',
      first_name: typeof parsed.first_name === 'string' ? parsed.first_name : '',
      last_name: typeof parsed.last_name === 'string' ? parsed.last_name : '',
      email,
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
    queryClient.removeQueries({ queryKey: currentUserQueryKey });
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
