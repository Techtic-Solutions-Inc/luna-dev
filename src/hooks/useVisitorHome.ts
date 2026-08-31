import axios from 'axios';
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

export function visitorHomeErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    if (status === 401 || status === 403) {
      return 'Home content could not be loaded. Please try again.';
    }
    if (status === 404) {
      return 'Home content is not available yet. Please try again later.';
    }
  }
  return getApiError(error).message;
}

export function isVisitorHomeNotFound(error: unknown): boolean {
  return axios.isAxiosError(error) && error.response?.status === 404;
}

export function useVisitorHomeErrorMessage(error: unknown): string {
  return visitorHomeErrorMessage(error);
}
