import axios from 'axios';

const baseURL = (import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || '').replace(
  /\/$/,
  '',
);

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 12000,
});

export function getBearerAuthHeader(): Record<string, string> {
  const token = localStorage.getItem('token') ?? sessionStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

apiClient.interceptors.request.use((config) => {
  Object.assign(config.headers, getBearerAuthHeader());
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => Promise.reject(error),
);

export const fetchData = async <T,>(endpoint: string): Promise<T> => {
  const response = await apiClient.get<T>(endpoint);
  return response.data;
};

export default apiClient;
