import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getDownloadsErrorMessage,
  getReDownloadErrorMessage,
  listProfileDownloads,
  reDownload,
} from '@/lib/api/profile-downloads';

export const PROFILE_DOWNLOADS_QUERY_KEY = ['profile-downloads'] as const;

export function useProfileDownloads() {
  const query = useQuery({
    queryKey: PROFILE_DOWNLOADS_QUERY_KEY,
    queryFn: listProfileDownloads,
  });

  const reDownloadMutation = useMutation({
    mutationFn: (id: string) => reDownload(id),
  });

  return {
    data: query.data ?? [],
    loading: query.isPending,
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
