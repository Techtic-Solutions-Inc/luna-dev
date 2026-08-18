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
    mutationFn: (item: ProfileDownloadItem) =>
      reDownloadProfileFile({
        id: item.id,
        url: item.url,
        title: item.title,
      }),
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
      const item = query.data?.items.find((entry) => entry.id === id) ?? {
        id,
        title: '',
        file_type: '',
        size: '',
        date: '',
        created_at: '',
        updated_at: '',
        url: '',
      };

      try {
        await reDownloadMutation.mutateAsync(item);
        return true;
      } catch {
        return false;
      }
    },
    reDownloadingId: reDownloadMutation.isPending
      ? (reDownloadMutation.variables?.id ?? null)
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
