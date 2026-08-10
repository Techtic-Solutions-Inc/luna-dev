import { useCallback, useEffect, useState } from 'react';
import { getAboutContractGapMessage } from '../lib/api/contract-gaps';
import type { AboutResponse } from '../types/api';

export const ABOUT_QUERY_KEY = ['about'] as const;

interface UseAboutDataResult {
  data: AboutResponse | null;
  isLoading: boolean;
  error: string | null;
  isEmpty: boolean;
  refetch: () => Promise<void>;
  queryKey: typeof ABOUT_QUERY_KEY;
}

export const invalidateAboutQuery = (): void => {
  // No-op until GET /api/about is added to the API contract and wired in the client.
};

export const useAboutData = (): UseAboutDataResult => {
  const [data, setData] = useState<AboutResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setData(null);
    setError(getAboutContractGapMessage());
    setIsLoading(false);
  }, []);

  useEffect(() => {
    void refetch();
  }, [refetch]);

  const isEmpty =
    !isLoading &&
    !error &&
    (data === null ||
      (!data.title &&
        !data.description &&
        (data.sections?.length ?? 0) === 0 &&
        (data.team_members?.length ?? 0) === 0));

  return {
    data,
    isLoading,
    error,
    isEmpty,
    refetch,
    queryKey: ABOUT_QUERY_KEY,
  };
};
