import { client, toApiError } from "@/lib/api/client";
import type {
  LoginRequest,
  LoginResponse,
  LoginUserData,
  RegisteredUserData,
  SignupRequest,
  SignupResponse,
} from "@/lib/api/types";

function unwrapLogin(payload: unknown): LoginUserData {
  if (typeof payload !== "object" || payload === null) {
    throw toApiError(new Error("Invalid login response"));
  }
  const body = payload as LoginResponse | LoginUserData;
  if ("data" in body && body.data) {
    return body.data;
  }
  return body as LoginUserData;
}

export async function login(body: LoginRequest): Promise<LoginUserData> {
  try {
    const { data } = await client.post<LoginResponse>("/api/auth/login", body);
    return unwrapLogin(data);
  } catch (error) {
    throw toApiError(error);
  }
}

function unwrapSignup(payload: unknown): RegisteredUserData {
  if (typeof payload !== "object" || payload === null) {
    throw toApiError(new Error("Invalid signup response"));
  }
  const body = payload as SignupResponse | RegisteredUserData;
  if ("data" in body && body.data) {
    return body.data;
  }
  return body as RegisteredUserData;
}

export async function signup(body: SignupRequest): Promise<RegisteredUserData> {
  try {
    const { data } = await client.post<SignupResponse>("/api/signup", body);
    return unwrapSignup(data);
  } catch (error) {
    throw toApiError(error);
  }
}

export async function logout(): Promise<void> {
  try {
    await client.get("/api/auth/logout");
  } catch (error) {
    const parsed = toApiError(error);
    if (parsed.status === 404 || parsed.status === 0) {
      return;
    }
    throw parsed;
  }
}
