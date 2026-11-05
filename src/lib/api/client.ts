import axios, { type AxiosError, type AxiosRequestConfig } from "axios";
import { clearSession } from "../../hooks/useAuth";
import type { ApiErrorResponse, ValidationFailedBody } from "../../types/api";

export function resolveApiBase(): string {
  const raw = import.meta.env.VITE_API_BASE_URL;
  if (typeof raw !== "string" || raw.trim() === "") {
    if (import.meta.env.DEV) {
      throw new Error(
        "VITE_API_BASE_URL is required. Copy .env.example to .env and set the backend origin.",
      );
    }
    return "";
  }
  return raw.replace(/\/+$/, "");
}

export const apiClient = axios.create({
  headers: { Accept: "application/json" },
});

apiClient.interceptors.request.use((config) => {
  if (!config.baseURL) {
    config.baseURL = resolveApiBase();
  }
  const token =
    typeof localStorage !== "undefined" ? localStorage.getItem("accessToken") : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      clearSession();
    }
    return Promise.reject(error);
  },
);

export function parseApiErrorBody(body: unknown): string {
  if (body !== null && typeof body === "object") {
    const record = body as Record<string, unknown>;
    if (record.success === false && typeof record.message === "string") {
      return record.message;
    }
    if (typeof record.message === "string") {
      return record.message;
    }
  }
  return "Request failed";
}

export function fieldErrorsFromApiBody(body: unknown): Record<string, string[]> {
  if (body === null || typeof body !== "object") {
    return {};
  }
  const validation = body as unknown as ValidationFailedBody;
  if (validation.errors && typeof validation.errors === "object") {
    return validation.errors;
  }
  const apiErr = body as unknown as ApiErrorResponse;
  if (apiErr.error?.details && typeof apiErr.error.details === "object") {
    const out: Record<string, string[]> = {};
    for (const [key, val] of Object.entries(apiErr.error.details)) {
      if (Array.isArray(val)) {
        out[key] = val.map(String);
      } else if (val != null) {
        out[key] = [String(val)];
      }
    }
    return out;
  }
  return {};
}

export async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  config?: AxiosRequestConfig,
): Promise<T> {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const upper = method.toUpperCase();
  try {
    const res =
      upper === "GET" || upper === "DELETE"
        ? await apiClient.request<T>({ ...config, method: upper, url: normalized })
        : await apiClient.request<T>({
            ...config,
            method: upper,
            url: normalized,
            data: body,
            headers: { "Content-Type": "application/json", ...config?.headers },
          });
    return res.data;
  } catch (err) {
    const ax = err as AxiosError;
    throw ax;
  }
}
