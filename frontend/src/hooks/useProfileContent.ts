import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseQueryResult,
} from '@tanstack/react-query';
import { getApiFieldErrors } from '../lib/api/errors';
import {
  createProfileContent,
  deleteProfileContent,
  getProfileContent,
  getProfileContentErrorMessage,
  updateProfileContent,
} from '../lib/api/profileContent';
import type { ProfileContentItem, ProfileContentPayload } from '../types/api';

export const profileContentQueryKey = ['profile-content'] as const;

export interface UseProfileContentResult {
  data: ProfileContentItem[];
  total: number;
  loading: boolean;
  error: string | null;
  query: UseQueryResult<{ items: ProfileContentItem[]; total: number }, Error>;
  createEntry: (body: ProfileContentPayload) => Promise<boolean>;
  updateEntry: (id: string, body: ProfileContentPayload) => Promise<boolean>;
  removeEntry: (id: string) => Promise<boolean>;
  isSaving: boolean;
  isDeleting: boolean;
  mutationError: string | null;
  mutationCause: unknown;
  fieldErrors: Record<string, string>;
  refetch: () => Promise<void>;
}

export function useProfileContent(): UseProfileContentResult {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: profileContentQueryKey,
    queryFn: getProfileContent,
  });

  const createMutation = useMutation({
    mutationFn: (body: ProfileContentPayload) => createProfileContent(body),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: profileContentQueryKey });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, body }: { id: string; body: ProfileContentPayload }) =>
      updateProfileContent(id, body),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: profileContentQueryKey });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteProfileContent(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: profileContentQueryKey });
    },
  });

  const rawMutationError =
    createMutation.error ?? updateMutation.error ?? deleteMutation.error;

  return {
    data: query.data?.items ?? [],
    total: query.data?.total ?? query.data?.items.length ?? 0,
    loading: query.isPending,
    error: query.error ? getProfileContentErrorMessage(query.error) : null,
    query,
    createEntry: async (body) => {
      try {
        await createMutation.mutateAsync(body);
        return true;
      } catch {
        return false;
      }
    },
    updateEntry: async (id, body) => {
      try {
        await updateMutation.mutateAsync({ id, body });
        return true;
      } catch {
        return false;
      }
    },
    removeEntry: async (id) => {
      try {
        await deleteMutation.mutateAsync(id);
        return true;
      } catch {
        return false;
      }
    },
    isSaving: createMutation.isPending || updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    mutationError: rawMutationError
      ? getProfileContentErrorMessage(rawMutationError)
      : null,
    mutationCause: rawMutationError,
    fieldErrors: rawMutationError ? getApiFieldErrors(rawMutationError) : {},
    refetch: async () => {
      await query.refetch();
    },
  };
}
