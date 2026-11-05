import { request } from "./api/client";
import type { LoginRequestBody, LoginSuccessResponse } from "../types/api";

export async function postLogin(body: LoginRequestBody): Promise<LoginSuccessResponse> {
  return request<LoginSuccessResponse>("POST", "/api/auth/login", body);
}
