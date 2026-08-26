export interface ApiErrorDetails {
  code: string;
  details: Record<string, string[]> | null;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  error: ApiErrorDetails;
  path: string;
  timestamp: string;
}

export interface ApiSuccessResponse<T> {
  success: true;
  message: string;
  data: T;
}

export class ApiClientError extends Error {
  readonly code: string;
  readonly details: Record<string, string[]> | null;
  readonly status: number;

  constructor(
    message: string,
    code: string,
    details: Record<string, string[]> | null,
    status: number,
  ) {
    super(message);
    this.name = 'ApiClientError';
    this.code = code;
    this.details = details;
    this.status = status;
  }
}
