import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseQueryResult,
} from '@tanstack/react-query';
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
  loading: boolean;
  error: string | null;
  query: UseQueryResult<ProfileContentItem[], Error>;
  createContent: (
    body: ProfileContentPayload,
  ) => Promise<ProfileContentItem | null>;
  updateContent: (
    id: string,
    body: ProfileContentPayload,
  ) => Promise<ProfileContentItem | null>;
  removeContent: (id: string) => Promise<boolean>;
  isSaving: boolean;
  isDeleting: boolean;
  mutationError: string | null;
  refetch: () => Promise<void>;
}

export function useProfileContent(): UseProfileContentResult {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: profileContentQueryKey,
    queryFn: getProfileContent,
  });

  const invalidateContent = async () => {
    await queryClient.invalidateQueries({ queryKey: profileContentQueryKey });
  };

  const createMutation = useMutation({
    mutationFn: (body: ProfileContentPayload) => createProfileContent(body),
    onSuccess: async () => {
      await invalidateContent();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, body }: { id: string; body: ProfileContentPayload }) =>
      updateProfileContent(id, body),
    onSuccess: async () => {
      await invalidateContent();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteProfileContent(id),
    onSuccess: async () => {
      await invalidateContent();
    },
  });

  const rawMutationError =
    createMutation.error ?? updateMutation.error ?? deleteMutation.error;

  return {
    data: query.data ?? [],
    loading: query.isPending,
    error: query.error ? getProfileContentErrorMessage(query.error) : null,
    query,
    createContent: async (body) => {
      try {
        return await createMutation.mutateAsync(body);
      } catch {
        return null;
      }
    },
    updateContent: async (id, body) => {
      try {
        return await updateMutation.mutateAsync({ id, body });
      } catch {
        return null;
      }
    },
    removeContent: async (id) => {
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
    refetch: async () => {
      await query.refetch();
    },
  };
}
