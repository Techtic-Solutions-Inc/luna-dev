import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { ApiClientError, type ApiErrorResponse } from '@/types/api';
import { readSession } from '@/lib/auth/session';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const session = readSession();
  if (session?.token) {
    config.headers.Authorization = `Bearer ${session.token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    const data = response.data;
    if (data && typeof data === 'object' && 'success' in data && data.success === true) {
      return { ...response, data: data.data };
    }
    return response;
  },
  (error: AxiosError<ApiErrorResponse>) => {
    const status = error.response?.status ?? 0;
    const body = error.response?.data;
    if (body && body.success === false) {
      throw new ApiClientError(
        body.message,
        body.error.code,
        body.error.details,
        status,
      );
    }
    throw new ApiClientError(
      error.message || 'Network error',
      'NETWORK_ERROR',
      null,
      status,
    );
  },
);

export default apiClient;
