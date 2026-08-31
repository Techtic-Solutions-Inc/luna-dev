import { useQuery } from '@tanstack/react-query';
import { getApiError } from '@/lib/api/client';
import { getCurrentUser } from '@/services/users';
import { getToken } from '@/hooks/useAuth';
import type { AuthUser } from '@/types/api';

export const currentUserQueryKey = ['users', 'me'] as const;

export function useCurrentUser(initialData?: AuthUser | null) {
  const authenticated = Boolean(getToken());

  return useQuery({
    queryKey: currentUserQueryKey,
    queryFn: getCurrentUser,
    enabled: authenticated,
    initialData: initialData ?? undefined,
    retry: 1,
    meta: {
      error: true,
    },
  });
}

export function useCurrentUserErrorMessage(error: unknown): string {
  return getApiError(error).message;
}
