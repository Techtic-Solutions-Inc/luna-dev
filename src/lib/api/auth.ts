import { client, toApiError } from "@/lib/api/client";
import type { LoginRequest, LoginUserData, SignupRequest, SignupUserData } from "@/lib/api/types";
import { parseLoginUserData } from "@/lib/auth/session";
import { asRecord } from "@/lib/bind";

function unwrapLogin(payload: unknown): LoginUserData {
  const record = asRecord(payload);
  if (!record) {
    throw toApiError(new Error("Invalid login response"));
  }
  const nested = asRecord(record.data);
  const parsed = parseLoginUserData(nested ?? record);
  if (!parsed) {
    throw toApiError(new Error("Invalid login response"));
  }
  return parsed;
}

export async function login(body: LoginRequest): Promise<LoginUserData> {
  try {
    const { data } = await client.post<unknown>("/api/auth/login", body);
    return unwrapLogin(data);
  } catch (error) {
    throw toApiError(error);
  }
}

function unwrapSignup(payload: unknown): SignupUserData {
  const record = asRecord(payload);
  if (!record) {
    return {};
  }
  const nested = asRecord(record.data);
  return nested ?? record;
}

export async function signup(body: SignupRequest): Promise<SignupUserData> {
  try {
    const { data } = await client.post<unknown>("/api/signup", body);
    return unwrapSignup(data);
  } catch (error) {
    throw toApiError(error);
  }
}

export async function logout(): Promise<void> {
  try {
    await client.get("/api/auth/logout");
  } catch {
    return;
  }
}
