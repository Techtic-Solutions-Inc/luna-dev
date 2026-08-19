import axios from 'axios';
import type { ApiErrorResponse } from '@/types/api';

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    const message = error.response?.data?.message;
    if (message) return message;
  }
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return fallback;
}

export function getFieldErrors(
  error: unknown,
): Record<string, string[]> {
  if (!axios.isAxiosError<ApiErrorResponse>(error)) {
    return {};
  }

  const errors = error.response?.data?.errors;
  if (!errors) return {};

  const normalized: Record<string, string[]> = {};
  for (const [key, value] of Object.entries(errors)) {
    if (Array.isArray(value)) {
      normalized[key] = value;
    } else if (typeof value === 'string') {
      normalized[key] = [value];
    }
  }
  return normalized;
}

export function mapPasswordFieldErrors(
  errors: Record<string, string[]>,
): Record<string, string> {
  const mapped: Record<string, string> = {};
  for (const [key, messages] of Object.entries(errors)) {
    const message = messages[0];
    if (!message) continue;

    switch (key) {
      case 'current_password':
        mapped.current_password = message;
        break;
      case 'new_password':
        mapped.new_password = message;
        break;
      case 'new_password_confirmation':
      case 'confirm_password':
      case 'password_confirmation':
        mapped.confirm_password = message;
        break;
      default:
        mapped.form = message;
        break;
    }
  }
  return mapped;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function pickString(
  source: Record<string, unknown>,
  keys: string[],
): string {
  for (const key of keys) {
    const value = source[key];
    if (typeof value === 'string') return value;
  }
  return '';
}

export function pickBoolean(
  source: Record<string, unknown>,
  keys: string[],
  fallback = true,
): boolean {
  for (const key of keys) {
    const value = source[key];
    if (typeof value === 'boolean') return value;
  }
  return fallback;
}

export function pickNumber(
  source: Record<string, unknown>,
  keys: string[],
  fallback = 0,
): number {
  for (const key of keys) {
    const value = source[key];
    if (typeof value === 'number' && Number.isFinite(value)) return value;
  }
  return fallback;
}

export function unwrapData<T>(payload: unknown): T | null {
  if (isRecord(payload) && 'data' in payload && isRecord(payload.data)) {
    return payload.data as T;
  }
  if (isRecord(payload)) {
    return payload as T;
  }
  return null;
}
