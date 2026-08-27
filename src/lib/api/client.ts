import axios, { AxiosError, type AxiosInstance } from 'axios';
import type { ApiValidationError } from '../../types/api';
import type { LoginRequest, LoginSuccessResponse } from '../../types/auth';

const TOKEN_KEY = 'token';

export function getApiBaseUrl(): string {
  return (
    import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || 'http://localhost:4040'
  );
}

export const apiClient: AxiosInstance = axios.create({
  baseURL: getApiBaseUrl(),
});

apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = window.localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export function isApiValidationError(payload: unknown): payload is ApiValidationError {
  if (typeof payload !== 'object' || payload === null) {
    return false;
  }
  return 'message' in payload && typeof (payload as ApiValidationError).message === 'string';
}

export function getApiErrorMessage(error: unknown): string {
  if (error instanceof AxiosError && isApiValidationError(error.response?.data)) {
    return error.response.data.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'Request failed';
}

export const fetchData = async <T>(endpoint: string): Promise<T> => {
  const response = await apiClient.get<T>(endpoint);
  return response.data;
};

export const login = async (body: LoginRequest): Promise<LoginSuccessResponse> => {
  const response = await apiClient.post<LoginSuccessResponse>('/auth/login', body);
  return response.data;
};

export { TOKEN_KEY };
