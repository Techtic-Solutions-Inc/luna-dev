import { useCallback, useEffect, useState } from 'react';
import { getProfile } from '../lib/api/client';
import { getApiErrorMessage } from '../lib/api/errors';
import type { ProfileResponse } from '../types/api';

interface UseCurrentUserResult {
  data: ProfileResponse | null;
  isLoading: boolean;
  error: string | null;
  isEmpty: boolean;
  refetch: () => Promise<void>;
}

export const useCurrentUser = (): UseCurrentUserResult => {
  const [data, setData] = useState<ProfileResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const profile = await getProfile();
      setData(profile);
    } catch (err) {
      setError(getApiErrorMessage(err, 'Failed to load profile'));
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refetch();
  }, [refetch]);

  const isEmpty =
    !isLoading &&
    !error &&
    (data === null ||
      (!data.email &&
        (!data.profile || Object.keys(data.profile).length === 0)));

  return { data, isLoading, error, isEmpty, refetch };
};
