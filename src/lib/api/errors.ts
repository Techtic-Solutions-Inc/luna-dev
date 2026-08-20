import axios from 'axios';
import type { ApiErrorResponse } from '../../types/api';

export function isApiErrorResponse(value: unknown): value is ApiErrorResponse {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as ApiErrorResponse;
  return typeof candidate.statusCode === 'number' && candidate.message !== undefined;
}

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error) && isApiErrorResponse(error.response?.data)) {
    const message = error.response.data.message;
    return Array.isArray(message) ? message.join(' ') : message;
  }
  if (error instanceof Error) return error.message;
  return 'Something went wrong. Please try again.';
}

export function getFieldErrors(error: unknown): Record<string, string[]> {
  if (axios.isAxiosError(error) && isApiErrorResponse(error.response?.data)) {
    return error.response.data.errors ?? {};
  }
  return {};
}

export function getLoginErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    if (status === 401) return 'Invalid email or password.';
    if (status === 403) return 'Account inactive. Contact support.';
  }
  return getApiErrorMessage(error);
}
