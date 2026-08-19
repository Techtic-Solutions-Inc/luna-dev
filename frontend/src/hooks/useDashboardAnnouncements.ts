import { useQuery } from '@tanstack/react-query';
import {
  fetchDashboardAnnouncements,
  getAnnouncementsErrorMessage,
} from '@/lib/api/dashboard';

export const DASHBOARD_ANNOUNCEMENTS_QUERY_KEY = [
  'dashboard',
  'announcements',
] as const;

export function useDashboardAnnouncements() {
  const query = useQuery({
    queryKey: DASHBOARD_ANNOUNCEMENTS_QUERY_KEY,
    queryFn: fetchDashboardAnnouncements,
  });

  return {
    data: query.data ?? [],
    loading: query.isPending,
    error: query.error ? getAnnouncementsErrorMessage(query.error) : null,
    refetch: query.refetch,
  };
}
