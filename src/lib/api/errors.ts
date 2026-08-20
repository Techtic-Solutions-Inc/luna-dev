import axios from 'axios';
import type { ApiErrorResponse } from '../../types/api';

export function parseApiError(error: unknown): ApiErrorResponse {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as ApiErrorResponse | undefined;
    if (data && typeof data === 'object') {
      return {
        statusCode: data.statusCode ?? error.response?.status ?? 0,
        message: data.message ?? error.message,
        errors: data.errors,
      };
    }
    if (!error.response) {
      return {
        statusCode: 0,
        message: 'Unable to connect. Check your connection and try again.',
      };
    }
    return {
      statusCode: error.response.status,
      message: error.message,
    };
  }

  if (error instanceof Error) {
    return { statusCode: 0, message: error.message };
  }

  return { statusCode: 0, message: 'Something went wrong.' };
}

export function getFieldErrors(error: ApiErrorResponse): Record<string, string> {
  const fieldErrors: Record<string, string> = {};
  if (!error.errors) {
    return fieldErrors;
  }
  for (const [field, messages] of Object.entries(error.errors)) {
    if (messages.length > 0) {
      fieldErrors[field] = messages[0];
    }
  }
  return fieldErrors;
}

export function getErrorMessage(error: ApiErrorResponse): string {
  if (Array.isArray(error.message)) {
    return error.message.join(' ');
  }
  return error.message;
}
