import axios from 'axios';
import { parseApiError } from '@/types/api';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { Accept: 'application/json' },
  timeout: 15000,
});

client.interceptors.request.use((config) => {
  config.headers.delete('Authorization');
  return config;
});

client.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      return Promise.reject(parseApiError(error.response?.data, error.config?.url ?? '/api/visitor/home'));
    }
    return Promise.reject(parseApiError(undefined));
  },
);

export default client;
