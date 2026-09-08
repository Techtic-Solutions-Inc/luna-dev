import axios, { type AxiosError } from 'axios';

const API_URL =
  import.meta.env.VITE_API_BASE_URL ??
  import.meta.env.VITE_API_URL ??
  'http://localhost:4040';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

interface ApiErrorBody {
  message?: string;
  detail?: string;
  errors?: Record<string, string[]>;
}

function firstFieldError(errors: Record<string, string[]>): string | undefined {
  for (const messages of Object.values(errors)) {
    if (messages.length > 0 && messages[0]) {
      return messages[0];
    }
  }
  return undefined;
}

export function getApiErrorMessage(
  err: unknown,
  fallback = 'Something went wrong. Please try again.',
): string {
  if (!axios.isAxiosError(err)) {
    if (err instanceof Error && err.message && !err.message.includes('AxiosError')) {
      return err.message;
    }
    return fallback;
  }

  const axiosError = err as AxiosError<ApiErrorBody>;

  if (!axiosError.response) {
    if (axiosError.code === 'ECONNABORTED') {
      return 'The request is taking longer than expected. Please check the current status before trying again.';
    }
    return 'Unable to connect. Please check your connection.';
  }

  const { status, data } = axiosError.response;

  if (status === 401) {
    return 'Your session may have expired. Please sign in again.';
  }

  if (data?.message && typeof data.message === 'string') {
    return data.message;
  }

  if (data?.errors && typeof data.errors === 'object') {
    const fieldError = firstFieldError(data.errors);
    if (fieldError) {
      return fieldError;
    }
  }

  if (data?.detail && typeof data.detail === 'string') {
    return data.detail;
  }

  if (status >= 500) {
    return fallback;
  }

  return fallback;
}

export const fetchData = async <T>(endpoint: string): Promise<T> => {
  const response = await apiClient.get<T>(endpoint);
  return response.data;
};
