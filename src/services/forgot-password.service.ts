import { apiRequest } from "@/lib/api-client";
import { LOCKED_API_ROUTES } from "@/lib/api-routes";
import type {
  ForgotPasswordRequestBody,
  ForgotPasswordSuccessResponse,
} from "@/types/auth";

const route = LOCKED_API_ROUTES.forgotPassword;

export function postForgotPassword(
  body: ForgotPasswordRequestBody,
): Promise<ForgotPasswordSuccessResponse> {
  return apiRequest<ForgotPasswordSuccessResponse>(route.method, route.path, {
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
