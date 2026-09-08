import { apiClient } from '@/lib/api/client';
import type { LoginRequestBody, LoginResponse } from '@/types/auth';

const AUTH_TOKEN_KEY = 'token';
const AUTH_USER_KEY = 'user';

export async function login(credentials: LoginRequestBody): Promise<LoginResponse> {
  const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
  return response.data;
}

export function storeAuthToken(token: string): void {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function storeAuthUser(user: LoginResponse['data']): void {
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
}

export function clearAuth(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
}

export function getStoredToken(): string | null {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function getStoredUser(): LoginResponse['data'] | null {
  const raw = localStorage.getItem(AUTH_USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as LoginResponse['data'];
  } catch {
    return null;
  }
}
