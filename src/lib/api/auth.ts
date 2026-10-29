import { apiRequest } from "../apiRequest";
import type { ApiErrorResponse, LoginResponse } from "../../types/api";

export type LoginRequest = {
  email: string;
  password: string;
};

export class LoginApiError extends Error {
  readonly status: number;
  readonly details: Record<string, string[]>;

  constructor(status: number, body: ApiErrorResponse) {
    super(body.message);
    this.name = "LoginApiError";
    this.status = status;
    this.details = body.error.details ?? {};
  }
}

function isApiErrorResponse(body: unknown): body is ApiErrorResponse {
  const record = body !== null && typeof body === "object" ? (body as Record<string, unknown>) : null;
  if (!record || record.success !== false) {
    return false;
  }
  const err = record.error;
  return err !== null && typeof err === "object" && typeof (err as { code?: unknown }).code === "string";
}

export async function login(body: LoginRequest): Promise<LoginResponse> {
  const response = await apiRequest({ method: "POST", path: "/api/auth/login", body });
  const data = (await response.json().catch(() => ({}))) as LoginResponse | ApiErrorResponse;
  if (!response.ok) {
    if (isApiErrorResponse(data)) {
      throw new LoginApiError(response.status, data);
    }
    throw Object.assign(new Error("Login failed"), { status: response.status, body: data });
  }
  return data as LoginResponse;
}
