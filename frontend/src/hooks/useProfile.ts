import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseQueryResult,
} from '@tanstack/react-query';
import { useEffect } from 'react';
import { getApiFieldErrors } from '../lib/api/errors';
import {
  changePassword as changePasswordRequest,
  getProfile,
  getProfileErrorMessage,
  persistProfileLocally,
  updateProfile as updateProfileRequest,
} from '../lib/api/profile';
import { mapApiFieldErrors } from '../lib/profileValidation';
import type {
  ChangePasswordPayload,
  UserProfile,
  UserProfilePayload,
} from '../types/api';

export const profileQueryKey = ['profile'] as const;

export interface UseProfileResult {
  data: UserProfile | null;
  loading: boolean;
  error: string | null;
  query: UseQueryResult<UserProfile | null, Error>;
  updateProfile: (body: UserProfilePayload) => Promise<boolean>;
  changePassword: (body: ChangePasswordPayload) => Promise<boolean>;
  isSaving: boolean;
  isChangingPassword: boolean;
  mutationError: string | null;
  passwordError: string | null;
  fieldErrors: Record<string, string>;
  passwordFieldErrors: Record<string, string>;
  successMessage: string | null;
  passwordSuccessMessage: string | null;
  refetch: () => Promise<void>;
}

export function useProfile(): UseProfileResult {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: profileQueryKey,
    queryFn: getProfile,
  });

  const updateMutation = useMutation({
    mutationFn: updateProfileRequest,
    onSuccess: async (profile) => {
      if (profile) {
        persistProfileLocally(profile);
        queryClient.setQueryData(profileQueryKey, profile);
      }

      await queryClient.invalidateQueries({ queryKey: profileQueryKey });
    },
  });

  const passwordMutation = useMutation({
    mutationFn: changePasswordRequest,
  });

  useEffect(() => {
    if (query.data) {
      persistProfileLocally(query.data);
    }
  }, [query.data]);

  return {
    data: query.data ?? null,
    loading: query.isPending,
    error: query.error ? getProfileErrorMessage(query.error) : null,
    query,
    updateProfile: async (body) => {
      try {
        await updateMutation.mutateAsync(body);
        return true;
      } catch {
        return false;
      }
    },
    changePassword: async (body) => {
      try {
        await passwordMutation.mutateAsync(body);
        return true;
      } catch {
        return false;
      }
    },
    isSaving: updateMutation.isPending,
    isChangingPassword: passwordMutation.isPending,
    mutationError: updateMutation.error
      ? getProfileErrorMessage(
          updateMutation.error,
          'Something went wrong while saving your profile.',
        )
      : null,
    passwordError: passwordMutation.error
      ? getProfileErrorMessage(
          passwordMutation.error,
          'Something went wrong while changing your password.',
        )
      : null,
    fieldErrors: updateMutation.error
      ? mapApiFieldErrors(getApiFieldErrors(updateMutation.error))
      : {},
    passwordFieldErrors: passwordMutation.error
      ? mapApiFieldErrors(getApiFieldErrors(passwordMutation.error))
      : {},
    successMessage: updateMutation.isSuccess
      ? 'Your profile has been saved.'
      : null,
    passwordSuccessMessage: passwordMutation.isSuccess
      ? 'Your password has been updated.'
      : null,
    refetch: async () => {
      await query.refetch();
    },
  };
}
