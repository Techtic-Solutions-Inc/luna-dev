export type ApiErrorDetails = Record<string, string[]> | null;

export interface ApiErrorBody {
  code: string;
  details: ApiErrorDetails;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  error: ApiErrorBody;
  path: string;
  timestamp: string;
}

export interface ApiSuccessResponse {
  success: true;
  message: string;
  data: unknown;
}

export type HomePayload = Record<string, unknown>;

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function readString(source: unknown, key: string): string | undefined {
  if (!isRecord(source)) {
    return undefined;
  }
  const value = source[key];
  if (typeof value === 'string' && value.trim().length > 0) {
    return value.trim();
  }
  return undefined;
}

export function unwrapHomePayload(body: unknown): unknown {
  if (!isRecord(body)) {
    return body;
  }
  if (body.success === true && 'data' in body) {
    return body.data;
  }
  return body;
}

export function parseApiError(body: unknown, fallbackPath = '/api/visitor/home'): ApiErrorResponse {
  if (isRecord(body) && body.success === false && typeof body.message === 'string') {
    const error = isRecord(body.error)
      ? {
          code: typeof body.error.code === 'string' ? body.error.code : 'UNKNOWN',
          details: parseErrorDetails(body.error.details),
        }
      : { code: 'UNKNOWN', details: null };
    return {
      success: false,
      message: body.message,
      error,
      path: typeof body.path === 'string' ? body.path : fallbackPath,
      timestamp: typeof body.timestamp === 'string' ? body.timestamp : new Date().toISOString(),
    };
  }
  return {
    success: false,
    message: 'Unable to reach the server. Please try again.',
    error: { code: 'NETWORK_ERROR', details: null },
    path: fallbackPath,
    timestamp: new Date().toISOString(),
  };
}

function parseErrorDetails(value: unknown): ApiErrorDetails {
  if (!isRecord(value)) {
    return null;
  }
  const details: Record<string, string[]> = {};
  for (const [key, messages] of Object.entries(value)) {
    if (Array.isArray(messages) && messages.every((item) => typeof item === 'string')) {
      details[key] = messages;
    }
  }
  return Object.keys(details).length > 0 ? details : null;
}

export function payloadHasLinkFields(payload: unknown): boolean {
  const keys = ['privacy_policy_link', 'terms_of_service_link', 'contact_email', 'phone'] as const;
  return keys.some((key) => Boolean(readString(payload, key)));
}
