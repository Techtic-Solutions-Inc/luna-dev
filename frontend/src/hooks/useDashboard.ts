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
  'dashboard-announcements',
] as const;
export const dashboardAnalyticsQueryKey = ['dashboard-analytics'] as const;

export interface UseDashboardAnnouncementsResult {
  data: DashboardAnnouncement[];
  loading: boolean;
  error: string | null;
  query: UseQueryResult<DashboardAnnouncement[], Error>;
  createAnnouncement: (body: DashboardAnnouncementPayload) => Promise<boolean>;
  isSaving: boolean;
  mutationError: string | null;
  refetch: () => Promise<void>;
}

export interface UseDashboardAnalyticsResult {
  data: DashboardAnalytics | null;
  loading: boolean;
  error: string | null;
  query: UseQueryResult<DashboardAnalytics | null, Error>;
  refetch: () => Promise<void>;
}

export function useDashboardAnnouncements(): UseDashboardAnnouncementsResult {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: dashboardAnnouncementsQueryKey,
    queryFn: getDashboardAnnouncements,
  });

  const createMutation = useMutation({
    mutationFn: createDashboardAnnouncement,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: dashboardAnnouncementsQueryKey,
      });
    },
  });

  return {
    data: query.data ?? [],
    loading: query.isPending,
    error: query.error
      ? getDashboardErrorMessage(
          query.error,
          'Something went wrong while loading announcements.',
        )
      : null,
    query,
    createAnnouncement: async (body) => {
      try {
        const created = await createMutation.mutateAsync(body);
        return created !== null;
      } catch {
        return false;
      }
    },
    isSaving: createMutation.isPending,
    mutationError: createMutation.error
      ? getDashboardErrorMessage(
          createMutation.error,
          'Something went wrong while posting the announcement.',
        )
      : null,
    refetch: async () => {
      await query.refetch();
    },
  };
}

export function useDashboardAnalytics(): UseDashboardAnalyticsResult {
  const query = useQuery({
    queryKey: dashboardAnalyticsQueryKey,
    queryFn: getDashboardAnalytics,
  });

  return {
    data: query.data ?? null,
    loading: query.isPending,
    error: query.error
      ? getDashboardErrorMessage(
          query.error,
          'Something went wrong while loading analytics.',
        )
      : null,
    query,
    refetch: async () => {
      await query.refetch();
    },
  };
}
