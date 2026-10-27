import type { LoginRequest, LoginResponse } from "@/types/api";
import { postData } from "./client";

export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  return postData<LoginResponse>("/api/auth/login", credentials);
}
