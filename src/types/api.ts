export interface ApiErrorDto {
  code: string;
  details: Record<string, string[]> | Record<string, unknown> | null;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  error: ApiErrorDto;
  path: string;
  timestamp: string;
}

export interface ApiSuccessEnvelope<T> {
  success: true;
  message: string;
  data: T;
}

export type VisitorHomeResponse =
  | ApiErrorResponse
  | ApiSuccessEnvelope<Record<string, unknown>>;
