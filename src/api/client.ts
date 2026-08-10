import type { ApiResult, ErrorEnvelope } from '../types/api';

function resolveApiBaseUrl(): string {
  const fromReactApp = import.meta.env.REACT_APP_API_BASE_URL;
  const fromVite = import.meta.env.VITE_API_BASE_URL;
  const value =
    typeof fromReactApp === 'string' && fromReactApp.length > 0
      ? fromReactApp
      : typeof fromVite === 'string'
        ? fromVite
        : '';
  return value.replace(/\/$/, '');
}

function isErrorEnvelope(value: unknown): value is ErrorEnvelope {
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

export async function apiPost<TResponse, TBody extends object>(
  path: string,
  body: TBody,
): Promise<ApiResult<TResponse>> {
  const url = `${resolveApiBaseUrl()}${path}`;

  let response: Response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    });
  } catch {
    return {
      ok: false,
      status: 0,
      error: {
        success: false,
        message: 'Unable to reach the server. Please check your connection and try again.',
        error: {
          code: 'NETWORK_ERROR',
          details: null,
        },
      },
    };
  }

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
    if (isErrorEnvelope(payload)) {
      return { ok: false, status: response.status, error: payload };
    }

    const message =
      typeof payload === 'object' &&
      payload !== null &&
      'message' in payload &&
      typeof (payload as { message: unknown }).message === 'string'
        ? (payload as { message: string }).message
        : 'Something went wrong. Please try again.';

    return {
      ok: false,
      status: response.status,
      error: {
        success: false,
        message,
        error: {
          code: 'REQUEST_FAILED',
          details:
            typeof payload === 'object' && payload !== null
              ? (payload as Record<string, unknown>)
              : null,
        },
      },
    };
  }

  return { ok: true, data: payload as TResponse };
}
