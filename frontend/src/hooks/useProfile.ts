import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  changePassword,
  fetchProfile,
  getChangePasswordErrorMessage,
  getProfileErrorMessage,
  updateProfile,
} from '@/lib/api/profile';
import { isProfileApiReady } from '@/lib/feature-flags';

import type { UpdateProfileRequest } from '@/types/api';

export const PROFILE_QUERY_KEY = ['profile'] as const;

export function useProfile() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: fetchProfile,
    enabled: isProfileApiReady,
  });

  const updateMutation = useMutation({
    mutationFn: (body: UpdateProfileRequest) => updateProfile(body),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
    },
  });

  const passwordMutation = useMutation({
    mutationFn: changePassword,
  });

  return {
    data: query.data ?? null,
    loading: isProfileApiReady && query.isPending,
    apiReady: isProfileApiReady,
    error: query.error ? getProfileErrorMessage(query.error) : null,
    refetch: query.refetch,
    updateProfile: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    updateError: updateMutation.error
      ? getProfileErrorMessage(updateMutation.error)
      : null,
    changePassword: passwordMutation.mutateAsync,
    isChangingPassword: passwordMutation.isPending,
    changePasswordError: passwordMutation.error
      ? getChangePasswordErrorMessage(passwordMutation.error)
      : null,
  };
}
