import { useQuery } from '@tanstack/react-query';
import { getApiError } from '@/lib/api/client';
import { visitorHomeQueryKey } from '@/lib/queryKeys';
import { getVisitorHome } from '@/services/visitor';

export { visitorHomeQueryKey };

export function useVisitorHome() {
  return useQuery({
    queryKey: visitorHomeQueryKey,
    queryFn: getVisitorHome,
    retry: 1,
    meta: {
      error: true,
    },
  });
}

export function useVisitorHomeErrorMessage(error: unknown): string {
  return getApiError(error).message;
}
