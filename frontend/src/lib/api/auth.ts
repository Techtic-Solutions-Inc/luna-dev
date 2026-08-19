import { apiClient } from '@/lib/api/client';
import { getApiErrorMessage } from '@/lib/api/errors';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token?: string;
  accessToken?: string;
  access_token?: string;
}

export async function login(body: LoginRequest): Promise<void> {
  const response = await apiClient.post<{ data?: LoginResponse } | LoginResponse>(
    '/auth/login',
    body,
  );

  const payload = response.data as Record<string, unknown>;
  const nested = payload?.data as Record<string, unknown> | undefined;

  const token =
    (nested?.token as string | undefined) ??
    (nested?.accessToken as string | undefined) ??
    (nested?.access_token as string | undefined) ??
    (payload?.token as string | undefined) ??
    (payload?.accessToken as string | undefined) ??
    (payload?.access_token as string | undefined);

  if (token) {
    localStorage.setItem('token', token);
  }
}

export function logout(): void {
  localStorage.removeItem('token');
}

export function getAuthToken(): string | null {
  return localStorage.getItem('token');
}

export function getLoginErrorMessage(error: unknown): string {
  return getApiErrorMessage(error, 'Invalid email or password. Please try again.');
}
