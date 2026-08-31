import { useMutation } from '@tanstack/react-query';
import { getApiError } from '@/lib/api/client';
import { loginRequest } from '@/services/auth';
import type { LoginRequestBody, LoginResponse } from '@/types/api';

export function useSignIn() {
  return useMutation<LoginResponse, unknown, LoginRequestBody>({
    mutationFn: loginRequest,
  });
}

export function useSignInErrorMessage(error: unknown): string {
  return getApiError(error).message;
}
