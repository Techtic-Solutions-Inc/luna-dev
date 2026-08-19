import axios from 'axios';

import type { ParsedApiError } from '@/types/api';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function normalizeFieldErrors(value: Record<string, unknown>): Record<string, string[]> {
  const errors: Record<string, string[]> = {};

  for (const [field, raw] of Object.entries(value)) {
    if (Array.isArray(raw) && raw.every((item) => typeof item === 'string')) {
      errors[field] = raw;
    } else if (typeof raw === 'string') {
      errors[field] = [raw];
    }
  }

  return errors;
}

export function parseApiError(error: unknown): ParsedApiError {
  if (axios.isAxiosError(error)) {
    const data: unknown = error.response?.data;

    if (isRecord(data) && typeof data.message === 'string') {
      const fieldErrors = isRecord(data.errors) ? normalizeFieldErrors(data.errors) : {};
      return { message: data.message, errors: fieldErrors };
    }

    if (error.message) {
      return { message: error.message, errors: {} };
    }
  }

  return { message: 'Something went wrong. Please try again.', errors: {} };
}
