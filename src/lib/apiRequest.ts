import type { AxiosError } from "axios";
import {
  apiClient,
  fieldErrorsFromApiBody,
  parseApiErrorBody,
  request as axiosRequest,
} from "./api/client";

export class ApiRequestError extends Error {
  readonly status: number;
  readonly body: unknown;
  readonly fieldErrors: Record<string, string[]>;

  constructor(status: number, message: string, body: unknown) {
    super(message);
    this.status = status;
    this.body = body;
    this.fieldErrors = fieldErrorsFromApiBody(body);
  }
}

export function apiUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const base = apiClient.defaults.baseURL ?? "";
  return base ? `${base}${normalized}` : normalized;
}

export async function apiRequest(
  method: string,
  path: string,
  body?: unknown,
): Promise<unknown> {
  try {
    return await axiosRequest<unknown>(method, path, body);
  } catch (err: unknown) {
    const ax = err as AxiosError;
    const status = ax.response?.status ?? 0;
    const data = ax.response?.data;
    const message = parseApiErrorBody(data);
    throw new ApiRequestError(status, message, data);
  }
}
