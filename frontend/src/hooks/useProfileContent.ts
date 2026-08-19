import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createProfileContent,
  deleteProfileContent,
  getProfileContentErrorMessage,
  listProfileContent,
  updateProfileContent,
} from '@/lib/api/profile-content';
import { isProfileContentApiReady } from '@/lib/feature-flags';
import type {
  CreateProfileContentRequest,
  UpdateProfileContentRequest,
} from '@/types/api';

export const PROFILE_CONTENT_QUERY_KEY = ['profile-content'] as const;

export function useProfileContent() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: PROFILE_CONTENT_QUERY_KEY,
    queryFn: listProfileContent,
    enabled: isProfileContentApiReady,
  });

  const invalidate = async () => {
    await queryClient.invalidateQueries({ queryKey: PROFILE_CONTENT_QUERY_KEY });
  };

  const createMutation = useMutation({
    mutationFn: (body: CreateProfileContentRequest) => createProfileContent(body),
    onSuccess: invalidate,
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: string;
      body: UpdateProfileContentRequest;
    }) => updateProfileContent(id, body),
    onSuccess: invalidate,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteProfileContent(id),
    onSuccess: invalidate,
  });

  return {
    data: query.data ?? [],
    loading: isProfileContentApiReady && query.isPending,
    apiReady: isProfileContentApiReady,
    error: query.error ? getProfileContentErrorMessage(query.error) : null,
    refetch: query.refetch,
    createContent: createMutation.mutateAsync,
    updateContent: updateMutation.mutateAsync,
    deleteContent: deleteMutation.mutateAsync,
    isMutating:
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending,
  };
}
