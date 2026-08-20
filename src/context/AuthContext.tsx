import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { login as loginRequest } from '../lib/api/client';
import {
  clearSession,
  getToken,
  persistSession,
  readStoredUser,
  writeStoredUser,
  type StoredUser,
} from '../lib/session';
import type { CreditUsage } from '../types/api';
import type { LoginRequest } from '../types/auth';
import { AuthContext, type AuthContextValue } from './auth-context';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<StoredUser | null>(() => readStoredUser());
  const [credits, setCredits] = useState<CreditUsage | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(getToken()));

  const login = useCallback(async (payload: LoginRequest, remember: boolean) => {
    const response = await loginRequest(payload);
    const token = response.data.token || response.data.accessToken;
    if (!token) {
      throw new Error('No access token returned.');
    }
    const nextUser: StoredUser = {
      id: response.data.id,
      name: response.data.name,
      first_name: response.data.first_name,
      last_name: response.data.last_name,
      email: response.data.email,
    };
    persistSession(token, nextUser, remember);
    setUser(nextUser);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setUser(null);
    setCredits(null);
    setIsAuthenticated(false);
  }, []);

  const updateUser = useCallback((next: StoredUser) => {
    setUser(next);
    writeStoredUser(next);
  }, []);

  const updateCredits = useCallback((next: CreditUsage | null) => {
    setCredits(next);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated,
      user,
      credits,
      login,
      logout,
      updateUser,
      updateCredits,
    }),
    [isAuthenticated, user, credits, login, logout, updateUser, updateCredits],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
