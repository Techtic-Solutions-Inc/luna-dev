import { useCallback, useState } from 'react';
import { apiPut } from '../api/client';
import type { ProfileResponse, UpdateProfileRequest } from '../types/api';
import { getErrorMessage } from '../types/api';

export function useUpdateProfile() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const updateProfile = useCallback(async (payload: UpdateProfileRequest) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const result = await apiPut<ProfileResponse, UpdateProfileRequest>(
      '/api/profile',
      payload,
    );

    setLoading(false);

    if (result.ok) {
      setSuccess(true);
      return { ok: true as const, data: result.data };
    }

    const message = getErrorMessage(result.error);
    setError(message);
    return { ok: false as const, error: message };
  }, []);

  const resetStatus = useCallback(() => {
    setError(null);
    setSuccess(false);
  }, []);

  return {
    updateProfile,
    loading,
    error,
    success,
    resetStatus,
  };
}

export default useUpdateProfile;
