import { apiClient } from "./client";

export type LoginRequest = {
  email: string;
  password: string;
};

export async function login(body: LoginRequest) {
  const response = await apiClient.post("/api/auth/login", body);
  return response.data;
}
