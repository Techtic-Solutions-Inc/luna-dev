export interface ApiSuccessResponse<T> {
  success: true;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  statusCode: number;
  message: string | string[];
  errors?: Record<string, string[]>;
}
