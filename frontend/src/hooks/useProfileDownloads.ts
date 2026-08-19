import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getDownloadsErrorMessage,
  getReDownloadErrorMessage,
  listProfileDownloads,
  reDownload,
} from '@/lib/api/profile-downloads';
import { isProfileDownloadsApiReady } from '@/lib/feature-flags';

export const PROFILE_DOWNLOADS_QUERY_KEY = ['profile-downloads'] as const;

export function useProfileDownloads() {
  const query = useQuery({
    queryKey: PROFILE_DOWNLOADS_QUERY_KEY,
    queryFn: listProfileDownloads,
    enabled: isProfileDownloadsApiReady,
  });

  const reDownloadMutation = useMutation({
    mutationFn: (id: string) => reDownload(id),
  });

  return {
    data: query.data ?? [],
    loading: isProfileDownloadsApiReady && query.isPending,
    apiReady: isProfileDownloadsApiReady,
    error: query.error ? getDownloadsErrorMessage(query.error) : null,
    refetch: query.refetch,
    reDownload: reDownloadMutation.mutateAsync,
    isReDownloading: reDownloadMutation.isPending,
    reDownloadError: reDownloadMutation.error
      ? getReDownloadErrorMessage(reDownloadMutation.error)
      : null,
    reDownloadingId: reDownloadMutation.variables ?? null,
  };
}
