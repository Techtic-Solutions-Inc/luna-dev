import { useQuery } from '@tanstack/react-query';
import {
  fetchDashboardAnalytics,
  getDashboardErrorMessage,
} from '@/lib/api/dashboard';

export const DASHBOARD_ANALYTICS_QUERY_KEY = ['dashboard', 'analytics'] as const;

export function useDashboardAnalytics() {
  const query = useQuery({
    queryKey: DASHBOARD_ANALYTICS_QUERY_KEY,
    queryFn: fetchDashboardAnalytics,
  });

  return {
    data: query.data ?? null,
    loading: query.isPending,
    error: query.error ? getDashboardErrorMessage(query.error) : null,
    refetch: query.refetch,
  };
}
