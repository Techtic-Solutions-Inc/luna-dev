import type { ApiSuccessEnvelope } from "@/types/api";

export interface ForgotPasswordRequestBody {
  email: string;
}

export type ForgotPasswordSuccessResponse = ApiSuccessEnvelope<
  Record<string, unknown> | null
>;
