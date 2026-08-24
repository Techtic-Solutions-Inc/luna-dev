import axios, { isAxiosError } from 'axios';
import { setToken } from '../../hooks/useAuth';
import type { LoginRequest, LoginResponse } from '../../types/api';

const API_URL = import.meta.env.VITE_API_URL ?? import.meta.env.VITE_API_BASE_URL;

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

export const fetchData = async <T>(endpoint: string): Promise<T> => {
  const response = await apiClient.get<T>(endpoint);
  return response.data;
};

export const login = async (payload: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>('/auth/login', payload);
  const token = response.data.token ?? response.data.accessToken;
  if (token) {
    setToken(token);
  }
  return response.data;
};

function isErrorEnvelope(value: unknown): value is { detail: string } {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  if (!('detail' in value)) {
    return false;
  }
  return typeof value.detail === 'string';
}

export function getErrorDetail(error: unknown, fallback = 'Something went wrong.'): string {
  if (isAxiosError(error)) {
    if (isErrorEnvelope(error.response?.data)) {
      return error.response.data.detail;
    }
    if (error.message) {
      return error.message;
    }
  }
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return fallback;
}

export default apiClient;
