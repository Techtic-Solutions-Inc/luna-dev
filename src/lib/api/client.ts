import axios, { AxiosError } from 'axios';
import { ApiClientError, isRecord } from '@/types/api';
import { readToken } from '@/lib/auth/token';

function parseFieldErrors(value: unknown): Record<string, string[]> {
  if (!isRecord(value)) {
    return {};
  }
  const details = isRecord(value.errors) ? value.errors : isRecord(value.error) ? value.error : value;
  const fields: Record<string, string[]> = {};
  for (const [key, messages] of Object.entries(details)) {
    if (Array.isArray(messages) && messages.every((item) => typeof item === 'string')) {
      fields[key] = messages;
    }
  }
  return fields;
}

function parseMessage(value: unknown, fallback: string): string {
  if (isRecord(value) && typeof value.message === 'string' && value.message.trim().length > 0) {
    return value.message;
  }
  return fallback;
}

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { Accept: 'application/json' },
  timeout: 15000,
});

apiClient.interceptors.request.use((config) => {
  const token = readToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const status = axiosError.response?.status ?? 0;
      const payload = axiosError.response?.data;
      const message =
        status === 0
          ? 'Unable to reach the server. Please try again.'
          : parseMessage(payload, axiosError.message || 'Request failed');
      return Promise.reject(new ApiClientError(message, status, parseFieldErrors(payload)));
    }
    return Promise.reject(
      new ApiClientError('Unable to reach the server. Please try again.', 0),
    );
  },
);
