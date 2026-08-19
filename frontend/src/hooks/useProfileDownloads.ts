import {
  useMutation,
  useQuery,
  type UseQueryResult,
} from '@tanstack/react-query';
import {
  getProfileDownloads,
  getProfileDownloadsErrorMessage,
  getProfileReDownloadErrorMessage,
  reDownloadProfileFile,
} from '../lib/api/profileDownloads';
import type { ProfileDownloadItem } from '../types/api';

export const profileDownloadsQueryKey = ['profile-downloads'] as const;

export interface UseProfileDownloadsResult {
  data: ProfileDownloadItem[];
  loading: boolean;
  error: string | null;
  query: UseQueryResult<ProfileDownloadItem[], Error>;
  reDownload: (id: string) => Promise<{ url: string | null; error: string | null }>;
  isReDownloading: boolean;
  reDownloadError: string | null;
  reDownloadingId: string | null;
  refetch: () => Promise<void>;
}

export function useProfileDownloads(): UseProfileDownloadsResult {
  const query = useQuery({
    queryKey: profileDownloadsQueryKey,
    queryFn: getProfileDownloads,
  });

  const reDownloadMutation = useMutation({
    mutationFn: (id: string) => reDownloadProfileFile({ id }),
  });

  return {
    data: query.data ?? [],
    loading: query.isPending,
    error: query.error ? getProfileDownloadsErrorMessage(query.error) : null,
    query,
    reDownload: async (id) => {
      try {
        const url = await reDownloadMutation.mutateAsync(id);
        return { url, error: null };
      } catch (error) {
        return {
          url: null,
          error: getProfileReDownloadErrorMessage(error),
        };
      }
    },
    isReDownloading: reDownloadMutation.isPending,
    reDownloadError: reDownloadMutation.error
      ? getProfileReDownloadErrorMessage(reDownloadMutation.error)
      : null,
    reDownloadingId:
      reDownloadMutation.isPending && reDownloadMutation.variables
        ? reDownloadMutation.variables
        : null,
    refetch: async () => {
      await query.refetch();
    },
  };
}
