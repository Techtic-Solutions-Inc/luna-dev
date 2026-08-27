export interface ApiValidationError {
  message: string;
  errors?: Record<string, string[]>;
}

export interface ApiSuccessEnvelope<T> {
  success: true;
  message: string;
  data: T;
}
