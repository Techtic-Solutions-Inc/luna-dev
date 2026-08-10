import { useCallback, useEffect, useState } from 'react';
import { getAbout } from '../lib/api/client';
import { getApiErrorMessage } from '../lib/api/errors';
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

const aboutCache = new Map<string, AboutResponse>();

const cacheKeyFor = (queryKey: readonly string[]): string => queryKey.join(':');

export const invalidateAboutQuery = (): void => {
  aboutCache.delete(cacheKeyFor(ABOUT_QUERY_KEY));
};

export const useAboutData = (): UseAboutDataResult => {
  const [data, setData] = useState<AboutResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const key = cacheKeyFor(ABOUT_QUERY_KEY);
    aboutCache.delete(key);

    try {
      const about = await getAbout();
      aboutCache.set(key, about);
      setData(about);
    } catch (err) {
      setError(getApiErrorMessage(err, 'Failed to load About Us content'));
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const key = cacheKeyFor(ABOUT_QUERY_KEY);
    const cached = aboutCache.get(key);

    if (cached) {
      setData(cached);
      setIsLoading(false);
      setError(null);
      return;
    }

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
