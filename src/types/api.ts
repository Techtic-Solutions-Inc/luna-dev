export type ProfileData = {
  full_name?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  mobile_number?: string;
  bio?: string;
  [key: string]: unknown;
};

export type UpdateProfileRequest = Partial<
  Pick<ProfileData, "first_name" | "last_name" | "email" | "mobile_number" | "bio"> &
    Record<string, unknown>
>;

export type LoginResponseData = {
  accessToken?: string;
  token?: string;
  access_token?: string;
  [key: string]: unknown;
};

export type LoginResponse = {
  data?: LoginResponseData;
  accessToken?: string;
  token?: string;
  [key: string]: unknown;
};

export type ApiErrorResponse = {
  error?: { message?: string; details?: Record<string, unknown> };
  message?: string;
  details?: Record<string, unknown>;
};
