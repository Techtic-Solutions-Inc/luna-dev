export interface ApiSuccessResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  message: string;
  errors?: Record<string, string[] | string>;
}
