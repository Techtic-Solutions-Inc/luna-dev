import { apiRequest } from "../apiRequest";
import type { ApiErrorResponse, LoginResponse } from "../../types/api";

export type LoginRequest = {
  email: string;
  password: string;
};

export async function login(body: LoginRequest): Promise<LoginResponse> {
  const response = await apiRequest({ method: "POST", path: "/api/auth/login", body });
  const data = (await response.json().catch(() => ({}))) as LoginResponse & ApiErrorResponse;
  if (!response.ok) {
    throw Object.assign(new Error("Login failed"), { status: response.status, body: data });
  }
  return data;
}
