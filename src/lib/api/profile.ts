import { apiRequest } from "../apiRequest";
import type { ProfileData, UpdateProfileRequest } from "../../types/api";

export type ChangePasswordRequest = {
  current_password: string;
  new_password: string;
  confirm_password: string;
};

function unwrapData(body: unknown): unknown {
  if (body !== null && typeof body === "object" && "data" in body) {
    return (body as { data: unknown }).data;
  }
  return body;
}

export async function get(): Promise<ProfileData> {
  const response = await apiRequest({ method: "GET", path: "/api/profile" });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw Object.assign(new Error("Profile fetch failed"), { status: response.status, body });
  }
  return unwrapData(body) as ProfileData;
}

export async function update(payload: UpdateProfileRequest): Promise<ProfileData> {
  const response = await apiRequest({
    method: "PUT",
    path: "/api/profile",
    body: payload,
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw Object.assign(new Error("Profile update failed"), { status: response.status, body });
  }
  return unwrapData(body) as ProfileData;
}

export async function changePassword(body: ChangePasswordRequest): Promise<Response> {
  return apiRequest({
    method: "POST",
    path: "/api/profile/change-password",
    body,
  });
}
