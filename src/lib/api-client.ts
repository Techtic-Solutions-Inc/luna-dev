import type { ApiErrorResponse, ApiSuccessEnvelope } from "@/types/api";

export class ApiRequestError extends Error {
  readonly status: number;
  readonly body: ApiErrorResponse | null;

  constructor(message: string, status: number, body: ApiErrorResponse | null) {
    super(message);
    this.name = "ApiRequestError";
    this.status = status;
    this.body = body;
  }
}

function getBaseUrl(): string {
  const base = import.meta.env.VITE_API_BASE_URL;
  if (!base) {
    throw new Error("VITE_API_BASE_URL is not configured.");
  }
  return base.replace(/\/$/, "");
}

/**
 * Join a locked contract path (e.g. `/api/visitor/home`) to VITE_API_BASE_URL
 * when the base URL already includes the `/api` prefix.
 */
export function resolveApiUrl(lockedPath: string): string {
  const base = getBaseUrl();
  const normalized = lockedPath.startsWith("/") ? lockedPath : `/${lockedPath}`;

  if (base.endsWith("/api") && normalized.startsWith("/api/")) {
    return `${base}${normalized.slice("/api".length)}`;
  }
  if (base.endsWith("/api") && normalized === "/api") {
    return base;
  }

  return `${base}${normalized}`;
}

export function getApiErrorMessage(err: unknown): string {
  if (err instanceof ApiRequestError) {
    if (err.body?.message) {
      return err.body.message;
    }
    if (err.status === 401) {
      return "Your session may have expired. Please sign in again.";
    }
    if (err.status >= 500) {
      return "Something went wrong. Please try again.";
    }
    return err.message;
  }
  if (err instanceof TypeError) {
    return "Unable to connect. Please check your connection.";
  }
  if (err instanceof Error) {
    return err.message;
  }
  return "Something went wrong. Please try again.";
}

async function parseJsonResponse(response: Response): Promise<unknown | null> {
  const text = await response.text();
  if (!text) {
    return null;
  }
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return null;
  }
}

function isApiErrorResponse(value: unknown): value is ApiErrorResponse {
  if (!value || typeof value !== "object") {
    return false;
  }
  const record = value as Record<string, unknown>;
  return record.success === false && typeof record.message === "string";
}

function isApiSuccessEnvelope(
  value: unknown,
): value is ApiSuccessEnvelope<Record<string, unknown>> {
  if (!value || typeof value !== "object") {
    return false;
  }
  const record = value as Record<string, unknown>;
  return record.success === true && "data" in record;
}

export async function apiRequest<TSuccess>(
  method: string,
  lockedPath: string,
  init?: Omit<RequestInit, "method">,
): Promise<TSuccess> {
  const url = resolveApiUrl(lockedPath);
  let response: Response;
  try {
    response = await fetch(url, {
      ...init,
      method,
      headers: {
        Accept: "application/json",
        ...init?.headers,
      },
    });
  } catch {
    throw new ApiRequestError(
      "Unable to connect. Please check your connection.",
      0,
      null,
    );
  }

  const parsed = await parseJsonResponse(response);

  if (isApiSuccessEnvelope(parsed)) {
    return parsed as TSuccess;
  }

  const errorBody: ApiErrorResponse | null = isApiErrorResponse(parsed)
    ? parsed
    : response.status === 404
      ? {
          success: false,
          message: "Unable to load home content.",
          error: { code: "NOT_FOUND", details: null },
          path: lockedPath,
          timestamp: new Date().toISOString(),
        }
      : null;

  const message =
    errorBody?.message ??
    (response.status >= 500
      ? "Something went wrong. Please try again."
      : "Unable to load home content.");

  throw new ApiRequestError(message, response.status, errorBody);
}
