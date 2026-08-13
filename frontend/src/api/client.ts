import type { ApiResult, ErrorEnvelope } from '../types/api';
import { getErrorMessage } from '../types/api';
import { getAccessToken, getTokenType } from '../utils/authStorage';

function resolveApiBaseUrl(): string {
  const fromReactApp = import.meta.env.REACT_APP_API_BASE_URL;
  const fromVite = import.meta.env.VITE_API_BASE_URL;
  const fromLegacy = import.meta.env.VITE_API_URL;
  const value =
    typeof fromReactApp === 'string' && fromReactApp.length > 0
      ? fromReactApp
      : typeof fromVite === 'string' && fromVite.length > 0
        ? fromVite
        : typeof fromLegacy === 'string'
          ? fromLegacy
          : '';
  return value.replace(/\/$/, '');
}

function isStructuredErrorEnvelope(value: unknown): value is ErrorEnvelope {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  const record = value as Record<string, unknown>;
  return (
    record.success === false &&
    typeof record.message === 'string' &&
    typeof record.error === 'object' &&
    record.error !== null
  );
}

function parseErrorPayload(payload: unknown): ErrorEnvelope {
  if (typeof payload === 'object' && payload !== null) {
    const record = payload as Record<string, unknown>;

    if (typeof record.detail === 'string' && record.detail.length > 0) {
      return { detail: record.detail };
    }

    if (isStructuredErrorEnvelope(payload)) {
      return payload;
    }

    if (typeof record.message === 'string' && record.message.length > 0) {
      return { message: record.message };
    }
  }

  return { detail: 'Something went wrong. Please try again.' };
}

function buildAuthHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: 'application/json',
  };
  const token = getAccessToken();
  if (token) {
    headers.Authorization = `${getTokenType()} ${token}`;
  }
  return headers;
}

async function parseJsonResponse<TResponse>(
  response: Response,
): Promise<ApiResult<TResponse>> {
  let payload: unknown = null;
  const contentType = response.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    try {
      payload = await response.json();
    } catch {
      payload = null;
    }
  }

  if (!response.ok) {
    const error = parseErrorPayload(payload);
    if (!error.detail && !error.message) {
      error.detail = getErrorMessage(error);
    }
    return { ok: false, status: response.status, error };
  }

  return { ok: true, data: payload as TResponse };
}

async function apiRequest<TResponse>(
  path: string,
  init: RequestInit,
): Promise<ApiResult<TResponse>> {
  const url = `${resolveApiBaseUrl()}${path}`;

  let response: Response;
  try {
    response = await fetch(url, init);
  } catch {
    return {
      ok: false,
      status: 0,
      error: {
        detail:
          'Unable to reach the server. Please check your connection and try again.',
      },
    };
  }

  return parseJsonResponse<TResponse>(response);
}

export async function apiGet<TResponse>(
  path: string,
): Promise<ApiResult<TResponse>> {
  return apiRequest<TResponse>(path, {
    method: 'GET',
    headers: buildAuthHeaders(),
  });
}

export async function apiPut<TResponse, TBody extends object>(
  path: string,
  body: TBody,
): Promise<ApiResult<TResponse>> {
  return apiRequest<TResponse>(path, {
    method: 'PUT',
    headers: {
      ...buildAuthHeaders(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}

export async function apiPost<TResponse, TBody extends object>(
  path: string,
  body: TBody,
): Promise<ApiResult<TResponse>> {
  return apiRequest<TResponse>(path, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}
