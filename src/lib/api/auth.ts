import { isAxiosError } from 'axios';
import apiClient from './client';
import type { ErrorResponse, LoginRequest, LoginResponse } from '../../types/auth';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

export const isErrorResponse = (value: unknown): value is ErrorResponse =>
  isRecord(value) && typeof value.message === 'string';

export const isLoginResponse = (value: unknown): value is LoginResponse => {
  if (
    !isRecord(value) ||
    typeof value.success !== 'boolean' ||
    typeof value.message !== 'string' ||
    !isRecord(value.data)
  ) {
    return false;
  }
  const data = value.data;
  return typeof data.token === 'string' || typeof data.accessToken === 'string';
};

export const login = async (body: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post<unknown>('/auth/login', body);
  if (!isLoginResponse(response.data)) {
    throw new Error('Sign in response was not recognized.');
  }
  return response.data;
};

export const readApiErrorMessage = (error: unknown): string => {
  if (isAxiosError(error) && isErrorResponse(error.response?.data)) {
    return error.response.data.message;
  }
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return 'Unable to sign in.';
};
