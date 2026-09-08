import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useNavigate } from 'react-router-dom';
import {
  clearAuth,
  getStoredToken,
  getStoredUser,
  login as loginRequest,
  storeAuthToken,
  storeAuthUser,
} from '@/services/auth';
import type { LoginRequestBody, LoginResponse } from '@/types/auth';

interface AuthContextValue {
  isAuthenticated: boolean;
  isLoading: boolean;
  getToken: () => string | null;
  getUser: () => LoginResponse['data'] | null;
  login: (credentials: LoginRequestBody) => Promise<LoginResponse>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function readAuthState(): boolean {
  return !!getStoredToken();
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(readAuthState);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const syncAuth = () => {
      setIsAuthenticated(readAuthState());
    };

    window.addEventListener('storage', syncAuth);
    return () => {
      window.removeEventListener('storage', syncAuth);
    };
  }, []);

  const getToken = useCallback(() => getStoredToken(), []);

  const getUser = useCallback(() => getStoredUser(), []);

  const login = useCallback(async (credentials: LoginRequestBody): Promise<LoginResponse> => {
    setIsLoading(true);
    try {
      const response = await loginRequest(credentials);
      if (response.success) {
        const token = response.data.token || response.data.accessToken;
        if (token) {
          storeAuthToken(token);
          storeAuthUser(response.data);
          setIsAuthenticated(true);
        }
      }
      return response;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    clearAuth();
    setIsAuthenticated(false);
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated,
      isLoading,
      getToken,
      getUser,
      login,
      logout,
    }),
    [isAuthenticated, isLoading, getToken, getUser, login, logout],
  );

  return createElement(AuthContext.Provider, { value }, children);
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function useAuthLogout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return useCallback(() => {
    logout();
    navigate('/', { replace: true });
  }, [logout, navigate]);
}
