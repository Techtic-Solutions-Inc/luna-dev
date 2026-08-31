import axios, { type AxiosInstance } from 'axios';
import { AUTH_TOKEN_KEY, endpoints, type ErrorResponse } from '@/types/api';
import { isRecord, isStringArrayRecord } from '@/lib/guards';
import { queryClient } from '@/lib/queryClient';
import { currentUserQueryKey } from '@/lib/queryKeys';
import { clearSession } from '@/hooks/useAuth';

function resolveBaseUrl(): string {
  const fromEnv = import.meta.env.VITE_API_BASE_URL ?? import.meta.env.VITE_API_URL;
  if (typeof fromEnv === 'string' && fromEnv.trim().length > 0) {
    return fromEnv.replace(/\/$/, '');
  }
  return 'http://localhost:4040';
}

export const API_BASE_URL = resolveBaseUrl();

export function getStoredToken(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }
  return window.localStorage.getItem(AUTH_TOKEN_KEY);
}

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 20000,
});

apiClient.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const PUBLIC_AUTH_PATHS = [endpoints.login, endpoints.forgotPassword, endpoints.signup] as const;

function isPublicAuthRequest(url: string | undefined): boolean {
  if (!url) {
    return false;
  }
  return PUBLIC_AUTH_PATHS.some((path) => url.includes(path));
}

function clearAuthenticatedSession(): void {
  clearSession();
  void queryClient.removeQueries({ queryKey: currentUserQueryKey });
  if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
    window.location.assign('/login');
  }
}

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      if (
        (status === 401 || status === 403) &&
        !isPublicAuthRequest(error.config?.url) &&
        getStoredToken()
      ) {
        clearAuthenticatedSession();
      }
    }
    return Promise.reject(error);
  },
);

export function isErrorResponse(value: unknown): value is ErrorResponse {
  if (!isRecord(value)) {
    return false;
  }
  return typeof value.message === 'string';
}

export function getApiError(error: unknown): ErrorResponse {
  if (axios.isAxiosError(error)) {
    const data: unknown = error.response?.data;
    if (isErrorResponse(data)) {
      return {
        message: data.message,
        errors: isStringArrayRecord(data.errors) ? data.errors : {},
      };
    }
    if (error.response?.status === 401) {
      if (error.config?.url?.includes(endpoints.login)) {
        return { message: 'Invalid credentials. Please try again.', errors: {} };
      }
      if (isPublicAuthRequest(error.config?.url)) {
        return { message: error.message || 'Request failed. Please try again.', errors: {} };
      }
      return { message: 'Your session has expired. Please sign in again.', errors: {} };
    }
    if (error.response?.status === 403) {
      return { message: 'You do not have permission to perform this action.', errors: {} };
    }
    if (error.code === 'ERR_NETWORK') {
      return {
        message: 'Unable to reach the API. Confirm the backend is running.',
        errors: {},
      };
    }
    return {
      message: error.message || 'Request failed. Please try again.',
      errors: {},
    };
  }
  if (error instanceof Error) {
    return { message: error.message, errors: {} };
  }
  return { message: 'Something went wrong. Please try again.', errors: {} };
}

export async function fetchData<T>(endpoint: string): Promise<T> {
  const response = await apiClient.get<T>(endpoint);
  return response.data;
}
