import type { ApiErrorResponse, ApiSuccessEnvelope } from "@/types/api";

export interface AboutUsData {
  mission_statement: string;
  team_intro: string;
  contact_email: string;
  story: string;
  problem_statement: string;
  footer: string;
  phone: string;
  terms_accepted: boolean;
}

export type AboutUsResponse =
  | ApiSuccessEnvelope<AboutUsData>
  | ApiErrorResponse;
