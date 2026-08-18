import { isAxiosError } from 'axios';
import type { ErrorEnvelope } from '../../types/api';

export const getApiErrorMessage = (
  error: unknown,
  fallback: string,
): string => {
  if (isAxiosError<ErrorEnvelope>(error)) {
    const apiMessage = error.response?.data?.message;
    if (typeof apiMessage === 'string' && apiMessage.length > 0) {
      return apiMessage;
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
};

export const getErrorMessage = getApiErrorMessage;

function firstErrorMessage(value: string[] | string | undefined): string {
  if (typeof value === 'string' && value.trim()) {
    return value;
  }

  if (Array.isArray(value)) {
    const message = value.find((item) => typeof item === 'string' && item.trim());
    return message ?? '';
  }

  return '';
}

export function getApiFieldErrors(error: unknown): Record<string, string> {
  if (!isAxiosError<ErrorEnvelope>(error)) {
    return {};
  }

  const raw = error.response?.data?.errors;

  if (!raw || typeof raw !== 'object') {
    return {};
  }

  const mapped: Record<string, string> = {};

  for (const [key, value] of Object.entries(raw)) {
    const message = firstErrorMessage(value);

    if (message) {
      mapped[key] = message;
    }
  }

  return mapped;
}
