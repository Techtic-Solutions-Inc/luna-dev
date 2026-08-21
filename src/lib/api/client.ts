import axios, { AxiosError } from 'axios';
import type { ApiErrorResponse } from '../../types/api';

const baseURL =
  import.meta.env.VITE_API_URL ?? import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000';

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') ?? sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    const data = axiosError.response?.data;
    if (data?.message) {
      return data.message;
    }
    const fieldErrors = data?.errors;
    if (fieldErrors) {
      const first = Object.values(fieldErrors)[0];
      if (typeof first === 'string' && first.length > 0) {
        return first;
      }
      if (Array.isArray(first) && first[0]) {
        return first[0];
      }
    }
    if (axiosError.message) {
      return axiosError.message;
    }
  }
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return fallback;
}

export default apiClient;
