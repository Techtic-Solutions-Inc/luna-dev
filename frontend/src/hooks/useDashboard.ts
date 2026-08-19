import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseQueryResult,
} from '@tanstack/react-query';
import {
  createDashboardAnnouncement,
  getDashboardAnalytics,
  getDashboardAnnouncements,
  getDashboardErrorMessage,
} from '../lib/api/dashboard';
import type {
  DashboardAnalytics,
  DashboardAnnouncement,
  DashboardAnnouncementPayload,
} from '../types/api';

export const dashboardAnnouncementsQueryKey = [
  'dashboard',
  'announcements',
] as const;

export const dashboardAnalyticsQueryKey = ['dashboard', 'analytics'] as const;

export interface UseDashboardAnnouncementsResult {
  data: DashboardAnnouncement[];
  loading: boolean;
  error: string | null;
  query: UseQueryResult<DashboardAnnouncement[], Error>;
  createAnnouncement: (
    body: DashboardAnnouncementPayload,
  ) => Promise<DashboardAnnouncement | null>;
  isCreating: boolean;
  refetch: () => Promise<void>;
}

export function useDashboardAnnouncements(): UseDashboardAnnouncementsResult {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: dashboardAnnouncementsQueryKey,
    queryFn: getDashboardAnnouncements,
  });

  const createMutation = useMutation({
    mutationFn: (body: DashboardAnnouncementPayload) =>
      createDashboardAnnouncement(body),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: dashboardAnnouncementsQueryKey,
      });
    },
  });

  return {
    data: query.data ?? [],
    loading: query.isPending,
    error: query.error ? getDashboardErrorMessage(query.error) : null,
    query,
    createAnnouncement: async (body) => {
      try {
        return await createMutation.mutateAsync(body);
      } catch {
        return null;
      }
    },
    isCreating: createMutation.isPending,
    refetch: async () => {
      await query.refetch();
    },
  };
}

export interface UseDashboardAnalyticsResult {
  data: DashboardAnalytics | null;
  loading: boolean;
  error: string | null;
  query: UseQueryResult<DashboardAnalytics, Error>;
  refetch: () => Promise<void>;
}

export function useDashboardAnalytics(): UseDashboardAnalyticsResult {
  const query = useQuery({
    queryKey: dashboardAnalyticsQueryKey,
    queryFn: getDashboardAnalytics,
  });

  return {
    data: query.data ?? null,
    loading: query.isPending,
    error: query.error ? getDashboardErrorMessage(query.error) : null,
    query,
    refetch: async () => {
      await query.refetch();
    },
  };
}
