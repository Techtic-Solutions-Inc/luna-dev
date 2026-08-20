import axios, { AxiosError } from 'axios';
import { getToken } from '../auth/storage';

function resolveBaseUrl(): string {
  return (
    import.meta.env.VITE_API_URL ??
    import.meta.env.VITE_API_BASE_URL ??
    'http://localhost:3000'
  ).replace(/\/$/, '');
}

const apiClient = axios.create({
  baseURL: resolveBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;

export function isAxiosError(error: unknown): error is AxiosError {
  return axios.isAxiosError(error);
}
