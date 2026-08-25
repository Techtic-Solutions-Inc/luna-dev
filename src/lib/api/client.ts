import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import type { ApiErrorEnvelope } from '../../types/api';

const API_URL = import.meta.env.VITE_API_URL ?? import.meta.env.VITE_API_BASE_URL ?? '';

const TOKEN_KEY = 'token';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorEnvelope>) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
    }
    return Promise.reject(error);
  },
);

export const fetchData = async <T>(endpoint: string): Promise<T> => {
  const response = await apiClient.get<T>(endpoint);
  return response.data;
};

export const postData = async <T, B = unknown>(endpoint: string, body: B): Promise<T> => {
  const response = await apiClient.post<T>(endpoint, body);
  return response.data;
};

export { TOKEN_KEY };
