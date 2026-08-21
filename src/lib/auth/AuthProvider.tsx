import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { loginRequest } from '../api/auth';
import {
  AUTH_CHANGED_EVENT,
  getToken,
  removeToken,
  setRefreshToken,
  setToken,
} from './storage';
import type { LoginResponse } from '../../types/api';

interface AuthContextValue {
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<LoginResponse>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const persistSession = (data: LoginResponse['data']): void => {
  const token = data.accessToken || data.token;
  setToken(token);
  if (data.refreshToken) {
    setRefreshToken(data.refreshToken);
  }
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setTokenState] = useState<string | null>(() => getToken());

  useEffect(() => {
    const sync = () => {
      setTokenState(getToken());
    };
    window.addEventListener(AUTH_CHANGED_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(AUTH_CHANGED_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const response = await loginRequest(email, password);
    if (!response.success) {
      throw new Error(response.message);
    }
    persistSession(response.data);
    return response;
  }, []);

  const logout = useCallback(() => {
    removeToken();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      token,
      isAuthenticated: Boolean(token),
      login,
      logout,
    }),
    [token, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
