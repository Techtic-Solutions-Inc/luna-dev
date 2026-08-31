import { useMutation } from '@tanstack/react-query';
import { getApiError } from '@/lib/api/client';
import { logoutRequest } from '@/services/auth';
import type { LogoutResponse } from '@/types/api';

export function useLogout() {
  return useMutation<LogoutResponse, unknown, void>({
    mutationFn: logoutRequest,
  });
}

export function useLogoutErrorMessage(error: unknown): string {
  return getApiError(error).message;
}
