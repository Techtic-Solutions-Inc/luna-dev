import { apiRequest } from "../apiRequest";

export type ChangePasswordRequest = {
  current_password: string;
  new_password: string;
  confirm_password: string;
};

export async function changePassword(body: ChangePasswordRequest): Promise<Response> {
  return apiRequest({
    method: "POST",
    path: "/api/profile/change-password",
    body,
  });
}
