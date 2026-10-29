import { clearReadPayloads } from "../components/luna-figma/figmaDisplay";
import { clearToken, getToken, setToken } from "../hooks/useAuth";
import { markSessionRejected } from "./session";

export type ApiRequestInit = {
  method: string;
  path: string;
  body?: unknown;
  headers?: Record<string, string>;
};

function apiBaseUrl(): string {
  const raw = import.meta.env.VITE_API_BASE_URL;
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

export function getAuthToken(): string | null {
  return getToken();
}

export function setAuthToken(token: string): void {
  setToken(token);
}

export function clearAuthToken(): void {
  clearToken();
}

export function rejectSession(): void {
  clearAuthToken();
  clearReadPayloads();
  markSessionRejected();
}

export async function apiRequest(init: ApiRequestInit): Promise<Response> {
  const headers: Record<string, string> = {
    Accept: "application/json",
    ...init.headers,
  };
  const isLogin = init.method.toUpperCase() === "POST" && init.path === "/api/auth/login";
  const token = isLogin ? null : getAuthToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  let body: BodyInit | undefined;
  if (init.body !== undefined) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(init.body);
  }
  const response = await fetch(apiUrl(init.path), {
    method: init.method,
    headers,
    body,
  });
  if (response.status === 401 && !isLogin) {
    rejectSession();
  }
  return response;
}
