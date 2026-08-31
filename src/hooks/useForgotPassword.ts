import { useMutation } from '@tanstack/react-query';
import { getApiError } from '@/lib/api/client';
import { forgotPasswordRequest } from '@/services/auth';
import type { ForgotPasswordRequestBody, ForgotPasswordResponse } from '@/types/api';

export function useForgotPassword() {
  return useMutation<ForgotPasswordResponse, unknown, ForgotPasswordRequestBody>({
    mutationFn: forgotPasswordRequest,
  });
}

export function useForgotPasswordErrorMessage(error: unknown): string {
  return getApiError(error).message;
}
