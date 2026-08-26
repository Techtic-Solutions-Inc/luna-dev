import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import type { ApiErrorDto, ApiErrorResponse } from '../../types/api';

const FALLBACK_ERROR: ApiErrorResponse = {
  success: false,
  message: 'Unable to reach the server. Please try again.',
  error: { code: 'NETWORK_ERROR', details: null },
  path: '/api/visitor/home',
  timestamp: new Date().toISOString(),
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function readDetails(value: unknown): Record<string, string[]> | null {
  if (!isRecord(value)) {
    return null;
  }
  const details: Record<string, string[]> = {};
  for (const [key, entry] of Object.entries(value)) {
    if (Array.isArray(entry) && entry.every((item) => typeof item === 'string')) {
      details[key] = entry;
    }
  }
  return Object.keys(details).length > 0 ? details : null;
}

function readErrorDto(value: unknown): ApiErrorDto {
  if (!isRecord(value)) {
    return { code: 'UNKNOWN', details: null };
  }
  return {
    code: typeof value.code === 'string' ? value.code : 'UNKNOWN',
    details: readDetails(value.details),
  };
}

export function isApiErrorResponse(value: unknown): value is ApiErrorResponse {
  return (
    isRecord(value) &&
    value.success === false &&
    typeof value.message === 'string' &&
    isRecord(value.error)
  );
}

export function toApiError(error: unknown): ApiErrorResponse {
  if (isApiErrorResponse(error)) {
    return error;
  }
  const axiosError = error as AxiosError;
  const data: unknown = axiosError.response?.data;
  if (isApiErrorResponse(data)) {
    return {
      success: false,
      message: data.message,
      error: readErrorDto(data.error),
      path: typeof data.path === 'string' ? data.path : '/api/visitor/home',
      timestamp: typeof data.timestamp === 'string' ? data.timestamp : new Date().toISOString(),
    };
  }
  if (isRecord(data) && data.success === false && typeof data.message === 'string') {
    return {
      success: false,
      message: data.message,
      error: readErrorDto(data.error),
      path: typeof data.path === 'string' ? data.path : '/api/visitor/home',
      timestamp: typeof data.timestamp === 'string' ? data.timestamp : new Date().toISOString(),
    };
  }
  if (typeof axiosError.message === 'string' && axiosError.message.length > 0) {
    return { ...FALLBACK_ERROR, message: axiosError.message };
  }
  return FALLBACK_ERROR;
}

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { Accept: 'application/json' },
  timeout: 15000,
});

client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (config.headers) {
    config.headers.delete('Authorization');
  }
  return config;
});

client.interceptors.response.use(
  (response) => response,
  (error: unknown) => Promise.reject(toApiError(error)),
);
