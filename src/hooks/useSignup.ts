import { useMutation } from '@tanstack/react-query';
import { getApiError } from '@/lib/api/client';
import { signupRequest } from '@/services/auth';
import type { SignupRequestBody, SignupResponse } from '@/types/api';

export function useSignup() {
  return useMutation<SignupResponse, unknown, SignupRequestBody>({
    mutationFn: signupRequest,
  });
}

export function useSignupErrorMessage(error: unknown): string {
  return getApiError(error).message;
}
