import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseQueryResult,
} from '@tanstack/react-query';
import {
  getProfileDownloads,
  getProfileDownloadsErrorMessage,
  reDownloadProfileFile,
} from '../lib/api/profileDownloads';
import type { ProfileDownloadItem } from '../types/api';

export const profileDownloadsQueryKey = ['profile-downloads'] as const;

export interface UseProfileDownloadsResult {
  data: ProfileDownloadItem[];
  total: number;
  loading: boolean;
  error: string | null;
  query: UseQueryResult<
    { items: ProfileDownloadItem[]; total: number },
    Error
  >;
  reDownload: (id: string) => Promise<boolean>;
  reDownloadingId: string | null;
  isReDownloading: boolean;
  mutationError: string | null;
  refetch: () => Promise<void>;
}

export function useProfileDownloads(): UseProfileDownloadsResult {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: profileDownloadsQueryKey,
    queryFn: getProfileDownloads,
  });

  const reDownloadMutation = useMutation({
    mutationFn: (id: string) => reDownloadProfileFile({ id }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: profileDownloadsQueryKey,
      });
    },
  });

  return {
    data: query.data?.items ?? [],
    total: query.data?.total ?? query.data?.items.length ?? 0,
    loading: query.isPending,
    error: query.error ? getProfileDownloadsErrorMessage(query.error) : null,
    query,
    reDownload: async (id) => {
      try {
        await reDownloadMutation.mutateAsync(id);
        return true;
      } catch {
        return false;
      }
    },
    reDownloadingId: reDownloadMutation.isPending
      ? (reDownloadMutation.variables ?? null)
      : null,
    isReDownloading: reDownloadMutation.isPending,
    mutationError: reDownloadMutation.error
      ? getProfileDownloadsErrorMessage(
          reDownloadMutation.error,
          'Something went wrong while starting the re-download.',
        )
      : null,
    refetch: async () => {
      await query.refetch();
    },
  };
}
