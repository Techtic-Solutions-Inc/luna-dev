export interface ApiSuccessEnvelope<T> {
  success: true;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  error: {
    code: string;
    details: Record<string, string[]> | Record<string, unknown> | null;
  };
  path: string;
  timestamp: string;
}

export interface ValidationFailedBody {
  message: "Validation failed" | string;
  errors: Record<string, string[]>;
}

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface LoginSuccessData {
  id: string;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  token: string;
  accessToken: string;
  refreshToken: string;
  tokenType: string;
}

export type LoginSuccessResponse = ApiSuccessEnvelope<LoginSuccessData>;

export interface SignupRequestBody {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  terms_accepted: boolean;
}

/** Replace when signup API is verified in backend */
export type SignupSuccessData = Record<string, unknown>;

export type SignupSuccessResponse = ApiSuccessEnvelope<SignupSuccessData>;

export interface VisitorHomeData {
  marketing_message: string;
  sub_heading: string;
  contact_email: string;
  privacy_policy_link: string;
  terms_of_service_link: string;
  phone: string;
  terms_accepted: boolean;
}

export type VisitorHomeResponse = ApiSuccessEnvelope<VisitorHomeData>;

export interface AiCreditUsageItem {
  id: string;
  user: string;
  usage: number;
  limit: number;
}

export interface UltimateMindAiCreditListData {
  ai_credit_usage: AiCreditUsageItem[];
  full_name: string;
  phone: string | null;
}

export type UltimateMindAiCreditListResponse =
  ApiSuccessEnvelope<UltimateMindAiCreditListData>;

export interface CreateUltimateMindAiCreditBody {
  user_id: string;
  usage: number;
  limit: number;
  full_name: string;
  phone: string;
}

export interface UltimateMindAiCreditRecordData extends AiCreditUsageItem {
  full_name: string;
  phone: string;
}

export type UltimateMindAiCreditCreateResponse =
  ApiSuccessEnvelope<UltimateMindAiCreditRecordData>;

export interface UpdateUltimateMindAiCreditBody {
  usage?: number;
  limit?: number;
  full_name?: string;
  phone?: string;
}

export type UltimateMindAiCreditUpdateResponse =
  ApiSuccessEnvelope<UltimateMindAiCreditRecordData>;
