import axios from 'axios';
import type { ApiErrorEnvelope } from '@/types';

export function getApiErrorMessage(
  err: unknown,
  fallback = 'Something went wrong. Please try again.',
): string {
  if (axios.isAxiosError<ApiErrorEnvelope>(err)) {
    const status = err.response?.status;
    const data = err.response?.data;

    if (!err.response) {
      if (err.code === 'ECONNABORTED') {
        return 'The request is taking longer than expected. Please check the current status before trying again.';
      }
      return 'Unable to connect. Please check your connection.';
    }

    if (status === 401) {
      return 'Your session may have expired. Please sign in again.';
    }

    if (data?.message && typeof data.message === 'string') {
      return data.message;
    }

    if (data?.detail && typeof data.detail === 'string') {
      return data.detail;
    }

    if (data?.errors && typeof data.errors === 'object') {
      const firstField = Object.values(data.errors)[0];
      if (Array.isArray(firstField) && firstField[0]) {
        return firstField[0];
      }
    }

    if (status && status >= 500) {
      return fallback;
    }

    if (status === 409) {
      return 'An account with this email already exists.';
    }

    if (status === 400) {
      return 'Please check your input and try again.';
    }
  }

  if (err instanceof Error && err.message && !err.message.includes('AxiosError')) {
    return err.message;
  }

  return fallback;
}
