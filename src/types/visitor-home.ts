import type { ApiErrorResponse, ApiSuccessEnvelope } from "@/types/api";

export interface VisitorHomeMarketingData {
  marketing_message: string;
  sub_heading: string;
  contact_email: string;
  privacy_policy_link: string;
  terms_of_service_link: string;
  phone: string;
  terms_accepted: boolean;
}

export type VisitorHomeMarketingResponse =
  | ApiSuccessEnvelope<VisitorHomeMarketingData>
  | ApiErrorResponse;
