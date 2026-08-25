import axios, { AxiosError } from "axios";
import type { ApiErrorEnvelope } from "@/lib/api/types";
import { getAccessToken } from "@/lib/auth/session";

export class ApiClientError extends Error {
  readonly status: number;
  readonly envelope: ApiErrorEnvelope;

  constructor(status: number, envelope: ApiErrorEnvelope) {
    super(envelope.message);
    this.name = "ApiClientError";
    this.status = status;
    this.envelope = envelope;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asFieldErrors(value: unknown): Record<string, string[]> | undefined {
  if (!isRecord(value)) {
    return undefined;
  }
  const result: Record<string, string[]> = {};
  for (const [key, item] of Object.entries(value)) {
    if (Array.isArray(item) && item.every((entry) => typeof entry === "string")) {
      result[key] = item;
    }
  }
  return Object.keys(result).length > 0 ? result : undefined;
}

export function toApiError(error: unknown): ApiClientError {
  if (error instanceof ApiClientError) {
    return error;
  }
  if (error instanceof AxiosError) {
    const status = error.response?.status ?? 0;
    const data: unknown = error.response?.data;
    if (isRecord(data) && typeof data.message === "string") {
      const errors = asFieldErrors(data.errors);
      return new ApiClientError(status, { message: data.message, errors, success: false });
    }
    return new ApiClientError(status, { message: error.message || "Request failed" });
  }
  if (error instanceof Error) {
    return new ApiClientError(0, { message: error.message });
  }
  return new ApiClientError(0, { message: "Request failed" });
}

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

client.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
