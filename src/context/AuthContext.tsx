import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { extractAccessToken, login as loginRequest } from '../lib/api/client';
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
    const token = extractAccessToken(response);
    const profile = response.data;
    const nextUser: StoredUser = {
      id: profile.id,
      name: profile.name,
      first_name: profile.first_name,
      last_name: profile.last_name,
      email: profile.email,
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
