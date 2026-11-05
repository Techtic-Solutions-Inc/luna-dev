import { request } from "./api/client";
import type { SignupRequestBody, SignupSuccessResponse } from "../types/api";

export async function postSignup(body: SignupRequestBody): Promise<SignupSuccessResponse> {
  return request<SignupSuccessResponse>("POST", "/api/signup", body);
}
