import { useState } from 'react';
import { login } from '../lib/api/auth';
import { getErrorMessage, getFieldErrors, parseApiError } from '../lib/api/errors';
import { setAccessToken, setRefreshToken } from '../lib/auth/storage';
import type { ApiErrorResponse } from '../types/api';
import type { LoginRequest, LoginResponseData } from '../types/auth';

type LoginResult = {
  data: LoginResponseData;
};

type UseLoginReturn = {
  mutate: (body: LoginRequest, rememberMe: boolean) => Promise<LoginResult | null>;
  isLoading: boolean;
  error: ApiErrorResponse | null;
  fieldErrors: Record<string, string>;
  clearError: () => void;
};

export function useLogin(): UseLoginReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiErrorResponse | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const clearError = () => {
    setError(null);
    setFieldErrors({});
  };

  const mutate = async (body: LoginRequest, rememberMe: boolean): Promise<LoginResult | null> => {
    setIsLoading(true);
    clearError();
    try {
      const response = await login(body);
      const accessToken = response.data.accessToken || response.data.token;
      setAccessToken(accessToken, rememberMe);
      if (response.data.refreshToken) {
        setRefreshToken(response.data.refreshToken, rememberMe);
      }
      return { data: response.data };
    } catch (err) {
      const parsed = parseApiError(err);
      setError(parsed);
      setFieldErrors(getFieldErrors(parsed));
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    mutate,
    isLoading,
    error,
    fieldErrors,
    clearError,
  };
}

export { getErrorMessage };
