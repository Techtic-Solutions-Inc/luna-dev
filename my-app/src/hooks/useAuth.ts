import { useCallback, useState } from 'react';
import {
  clearAuth,
  getStoredToken,
  getStoredUser,
  login as loginRequest,
  storeAuthToken,
  storeAuthUser,
} from '@/services/auth';
import type { LoginRequestBody, LoginResponse } from '@/types/auth';

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);

  const getToken = useCallback(() => getStoredToken(), []);

  const isAuthenticated = useCallback(() => !!getStoredToken(), []);

  const getUser = useCallback(() => getStoredUser(), []);

  const login = useCallback(async (credentials: LoginRequestBody): Promise<LoginResponse> => {
    setIsLoading(true);
    try {
      const response = await loginRequest(credentials);
      const token = response.data.token || response.data.accessToken;
      if (token) {
        storeAuthToken(token);
        storeAuthUser(response.data);
      }
      return response;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    clearAuth();
  }, []);

  return {
    getToken,
    isAuthenticated,
    getUser,
    login,
    logout,
    isLoading,
  };
}
