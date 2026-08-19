import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseQueryResult,
} from '@tanstack/react-query';
import {
  changePassword,
  extractApiFieldErrors,
  getChangePasswordErrorMessage,
  getProfile,
  getProfileErrorMessage,
  getProfileUpdateErrorMessage,
  syncProfileStorage,
  updateProfile,
} from '../lib/api/profile';
import {
  mapApiFieldErrors,
  mapChangePasswordApiFieldErrors,
} from '../lib/profileValidation';
import type {
  ChangePasswordPayload,
  ProfileData,
  ProfileUpdatePayload,
} from '../types/api';
import type { ChangePasswordFieldErrors, ProfileFieldErrors } from '../lib/profileValidation';

export const profileQueryKey = ['profile'] as const;

export interface UseProfileResult {
  data: ProfileData | null;
  loading: boolean;
  error: string | null;
  query: UseQueryResult<ProfileData | null, Error>;
  updateProfile: (
    body: ProfileUpdatePayload,
  ) => Promise<{
    profile: ProfileData | null;
    error: string | null;
    fieldErrors: ProfileFieldErrors;
  }>;
  changePassword: (
    body: ChangePasswordPayload,
  ) => Promise<{
    success: boolean;
    error: string | null;
    fieldErrors: ChangePasswordFieldErrors;
  }>;
  isSaving: boolean;
  isChangingPassword: boolean;
  refetch: () => Promise<void>;
}

export function useProfile(): UseProfileResult {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: profileQueryKey,
    queryFn: async () => {
      const profile = await getProfile();
      if (profile) {
        syncProfileStorage(profile);
      }
      return profile;
    },
  });

  const updateMutation = useMutation({
    mutationFn: (body: ProfileUpdatePayload) => updateProfile(body),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: profileQueryKey });
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: (body: ChangePasswordPayload) => changePassword(body),
  });

  return {
    data: query.data ?? null,
    loading: query.isPending,
    error: query.error ? getProfileErrorMessage(query.error) : null,
    query,
    updateProfile: async (body) => {
      try {
        const profile = await updateMutation.mutateAsync(body);
        return { profile, error: null, fieldErrors: {} };
      } catch (error) {
        return {
          profile: null,
          error: getProfileUpdateErrorMessage(error),
          fieldErrors: mapApiFieldErrors(extractApiFieldErrors(error)),
        };
      }
    },
    changePassword: async (body) => {
      try {
        await changePasswordMutation.mutateAsync(body);
        return { success: true, error: null, fieldErrors: {} };
      } catch (error) {
        return {
          success: false,
          error: getChangePasswordErrorMessage(error),
          fieldErrors: mapChangePasswordApiFieldErrors(
            extractApiFieldErrors(error),
          ),
        };
      }
    },
    isSaving: updateMutation.isPending,
    isChangingPassword: changePasswordMutation.isPending,
    refetch: async () => {
      await query.refetch();
    },
  };
}
