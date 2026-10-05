import { apiRequest } from "@/lib/api-client";
import { LOCKED_API_ROUTES } from "@/lib/api-routes";
import type { ApiSuccessEnvelope } from "@/types/api";

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface LoginSuccessData {
  id: string;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  token: string;
  accessToken: string;
  refreshToken: string;
  tokenType: string;
}

export type LoginSuccessResponse = ApiSuccessEnvelope<LoginSuccessData>;

export interface ForgotPasswordRequestBody {
  email: string;
}

export type ForgotPasswordSuccessResponse = ApiSuccessEnvelope<
  Record<string, unknown>
>;

const loginRoute = LOCKED_API_ROUTES.authLogin;

/** POST /auth/login */
export function postAuthLogin(
  body: LoginRequestBody,
): Promise<LoginSuccessResponse> {
  return apiRequest<LoginSuccessResponse>(loginRoute.method, loginRoute.path, {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

/** POST /api/auth/forgot-password */
export function postAuthForgotPassword(
  body: ForgotPasswordRequestBody,
): Promise<ForgotPasswordSuccessResponse> {
  return apiRequest<ForgotPasswordSuccessResponse>(
    "POST",
    "/api/auth/forgot-password",
    {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
  );
}
