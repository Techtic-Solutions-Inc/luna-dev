import { clearReadPayloads } from "../components/luna-figma/figmaDisplay";
import { clearSession, getStoredToken, notifyUnauthorized } from "./auth/session";

export type ApiRequestInit = {
  method: string;
  path: string;
  body?: unknown;
  headers?: Record<string, string>;
};

function apiBaseUrl(): string {
  const raw = import.meta.env.VITE_API_URL ?? import.meta.env.VITE_API_BASE_URL;
  if (typeof raw !== "string") {
    return "";
  }
  return raw.replace(/\/+$/, "");
}

/** Join origin + contract path (path already includes /api/... when applicable). */
export function apiUrl(path: string): string {
  const base = apiBaseUrl();
  if (!path.startsWith("/")) {
    return base ? `${base}/${path}` : `/${path}`;
  }
  return base ? `${base}${path}` : path;
}

export async function apiRequest<T = unknown>(init: ApiRequestInit): Promise<T> {
  const headers: Record<string, string> = {
    Accept: "application/json",
    ...init.headers,
  };
  let body: BodyInit | undefined;
  if (init.body !== undefined) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(init.body);
  }
  const token = getStoredToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const response = await fetch(apiUrl(init.path), {
    method: init.method.toUpperCase(),
    headers,
    body,
  });
  if (response.status === 401) {
    clearSession();
    clearReadPayloads();
    notifyUnauthorized();
  }
  if (response.status === 204) {
    return undefined as T;
  }
  const text = await response.text();
  let parsed: unknown = undefined;
  if (text) {
    try {
      parsed = JSON.parse(text) as unknown;
    } catch {
      parsed = text;
    }
  }
  if (!response.ok) {
    const message =
      typeof parsed === "object" &&
      parsed !== null &&
      "message" in parsed &&
      typeof (parsed as { message: unknown }).message === "string"
        ? (parsed as { message: string }).message
        : `Request failed (${response.status})`;
    throw Object.assign(new Error(message), { status: response.status, body: parsed });
  }
  return parsed as T;
}
