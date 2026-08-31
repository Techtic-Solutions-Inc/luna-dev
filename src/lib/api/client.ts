import axios, { AxiosError, type AxiosInstance } from 'axios';
import { AUTH_TOKEN_KEY, type ErrorResponse } from '@/types/api';

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

export function isErrorResponse(value: unknown): value is ErrorResponse {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  return 'message' in value && typeof (value as { message: unknown }).message === 'string';
}

export function getApiError(error: unknown): ErrorResponse {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<unknown>;
    const data = axiosError.response?.data;
    if (isErrorResponse(data)) {
      return {
        message: data.message,
        errors: data.errors ?? {},
      };
    }
    if (axiosError.response?.status === 401) {
      return { message: 'Invalid credentials. Please try again.', errors: {} };
    }
    if (axiosError.response?.status === 403) {
      return { message: 'You do not have permission to perform this action.', errors: {} };
    }
    if (axiosError.code === 'ERR_NETWORK') {
      return {
        message: 'Unable to reach the API. Confirm the backend is running.',
        errors: {},
      };
    }
    return {
      message: axiosError.message || 'Request failed. Please try again.',
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
