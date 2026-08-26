export interface ApiErrorDto {
  code: string;
  details: Record<string, string[]> | null;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  error: ApiErrorDto;
  path: string;
  timestamp: string;
}

export interface ApiSuccessResponse<T> {
  success: true;
  message: string;
  data: T;
}

/** GET /api/visitor/home is not in live OpenAPI. Do not invent fields. */
export type VisitorHomeData = unknown;
