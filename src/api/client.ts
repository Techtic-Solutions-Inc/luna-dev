import type { ApiErrorEnvelope } from '../types/api';

export class ApiError extends Error {
  readonly status: number;
  readonly details: Record<string, unknown> | null;

  constructor(message: string, status: number, details: Record<string, unknown> | null = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

const resolveBaseUrl = (): string => {
  const configured = import.meta.env.VITE_API_BASE_URL?.trim();
  return configured && configured.length > 0 ? configured.replace(/\/$/, '') : '';
};

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const baseUrl = resolveBaseUrl();
  const headers = new Headers(options.headers);

  if (!headers.has('Content-Type') && options.body) {
    headers.set('Content-Type', 'application/json');
  }

  const token = localStorage.getItem('access_token');
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers,
  });

  const payload: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    const errorPayload = isApiErrorEnvelope(payload)
      ? payload
      : null;
    throw new ApiError(
      errorPayload?.message ?? 'Something went wrong. Please try again.',
      response.status,
      errorPayload?.error?.details ?? null,
    );
  }

  return payload as T;
}

function isApiErrorEnvelope(value: unknown): value is ApiErrorEnvelope {
  return (
    typeof value === 'object' &&
    value !== null &&
    'message' in value &&
    typeof (value as ApiErrorEnvelope).message === 'string'
  );
}

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof ApiError) {
    return error.message;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
}

export function mapFieldErrors(
  details: Record<string, unknown> | null,
): Record<string, string> {
  if (!details) {
    return {};
  }

  const fieldErrors: Record<string, string> = {};

  for (const [key, value] of Object.entries(details)) {
    if (typeof value === 'string') {
      fieldErrors[key] = value;
      continue;
    }

    if (Array.isArray(value) && typeof value[0] === 'string') {
      fieldErrors[key] = value[0];
    }
  }

  return fieldErrors;
}
