import { isAxiosError } from './client';
import type { ApiErrorResponse } from '../../types/api';

export interface ParsedApiError {
  bannerMessage: string;
  fieldErrors: Record<string, string>;
  statusCode?: number;
}

function extractMessage(message: ApiErrorResponse['message']): string {
  if (typeof message === 'string') {
    return message;
  }
  return message.message;
}

function extractFieldErrors(
  message: ApiErrorResponse['message'],
): Record<string, string> {
  if (typeof message === 'object' && message.errors) {
    return Object.fromEntries(
      Object.entries(message.errors).map(([field, messages]) => [
        field,
        messages[0] ?? '',
      ]),
    );
  }
  return {};
}

export function parseApiError(error: unknown): ParsedApiError {
  if (isAxiosError(error)) {
    if (!error.response) {
      return {
        bannerMessage: 'Unable to reach server',
        fieldErrors: {},
      };
    }

    const data = error.response.data as ApiErrorResponse | undefined;
    if (data?.message) {
      return {
        bannerMessage: extractMessage(data.message),
        fieldErrors: extractFieldErrors(data.message),
        statusCode: data.statusCode ?? error.response.status,
      };
    }

    return {
      bannerMessage: error.message,
      fieldErrors: {},
      statusCode: error.response.status,
    };
  }

  if (error instanceof Error) {
    return { bannerMessage: error.message, fieldErrors: {} };
  }

  return { bannerMessage: 'Something went wrong', fieldErrors: {} };
}

export class ContractGapError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ContractGapError';
  }
}
