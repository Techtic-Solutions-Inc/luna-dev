import apiClient from '../lib/api/client';
import type { ApiSuccessResponse } from '../types/api';
import type { LoginRequest, LoginResponseData } from '../types/auth';

const TOKEN_KEY = 'token';
const REFRESH_KEY = 'refreshToken';

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY) ?? sessionStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string, persist: boolean): void {
  const storage = persist ? localStorage : sessionStorage;
  const other = persist ? sessionStorage : localStorage;
  storage.setItem(TOKEN_KEY, token);
  other.removeItem(TOKEN_KEY);
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  sessionStorage.removeItem(REFRESH_KEY);
}

export function isAuthenticated(): boolean {
  return Boolean(getToken());
}

export async function login(
  payload: LoginRequest,
  rememberMe: boolean,
): Promise<ApiSuccessResponse<LoginResponseData>> {
  const response = await apiClient.post<ApiSuccessResponse<LoginResponseData>>(
    '/auth/login',
    payload,
  );
  const data = response.data.data;
  const token = data.accessToken || data.token;
  if (token) {
    setToken(token, rememberMe);
  }
  if (data.refreshToken) {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem(REFRESH_KEY, data.refreshToken);
  }
  return response.data;
}

export function useAuth() {
  return {
    getToken,
    isAuthenticated,
    setToken,
    clearToken,
    login,
  };
}
