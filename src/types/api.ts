/** OpenAPI-aligned types (Auth / Profile). */

export type ApiErrorDetails = Record<string, string[]>;

export type ApiErrorBody = {
  code: string;
  details?: ApiErrorDetails | null;
};

export type ApiErrorResponse = {
  success: false;
  message: string;
  error: ApiErrorBody;
  path: string;
  timestamp: string;
};

export type LoginResponseData = {
  id: string;
  name: string;
  full_name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: unknown | null;
  token: string;
  accessToken: string;
  refreshToken?: string;
  tokenType: string;
};

export type LoginResponse = {
  success: boolean;
  message: string;
  data: LoginResponseData;
};

export type ProfileSummary = {
  bio?: unknown | null;
  description?: unknown | null;
  image?: unknown | null;
  name: string;
};

export type ProfileAddressDetails = {
  street?: unknown | null;
  city?: unknown | null;
  state?: unknown | null;
  zip?: unknown | null;
  country?: unknown | null;
};

export type ProfileData = {
  id: string;
  name: string;
  full_name: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile_number?: unknown | null;
  phone?: unknown | null;
  bio?: unknown | null;
  description?: unknown | null;
  time_zone?: unknown | null;
  street?: unknown | null;
  country?: unknown | null;
  state?: unknown | null;
  city?: unknown | null;
  zip?: unknown | null;
  address?: unknown | null;
  profile: ProfileSummary;
  address_details: ProfileAddressDetails;
  image?: unknown | null;
  password?: string | null;
  link?: unknown | null;
  error?: unknown | null;
};

export type ProfileResponse = {
  success: boolean;
  message: string;
  data: ProfileData;
};

export type UpdateProfileRequest = {
  first_name: string;
  last_name: string;
  email: string;
  mobile_number?: unknown | null;
  phone?: unknown | null;
  bio?: unknown | null;
  time_zone?: unknown | null;
  street?: unknown | null;
  country?: unknown | null;
  state?: unknown | null;
  city?: unknown | null;
  zip?: unknown | null;
  image?: unknown | null;
  link?: unknown | null;
  description?: unknown | null;
};
