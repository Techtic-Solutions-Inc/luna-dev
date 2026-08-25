import { useCallback, useEffect, useState } from 'react';
import { getHomeContent } from '@/lib/api/visitor';
import { HOME_QUERY_KEY, type HomeContent } from '@/types/home';

export type HomeContentState = {
  data: HomeContent | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  isEmpty: boolean;
  error: Error | null;
  refetch: () => void;
  queryKey: typeof HOME_QUERY_KEY;
};

function isEmptyContent(data: HomeContent | null): boolean {
  if (!data) return true;
  return data.headings.length === 0 && data.marketing.length === 0 && data.images.length === 0 && data.links.length === 0;
}

export function useHomeContent(): HomeContentState {
  const [data, setData] = useState<HomeContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const refetch = useCallback(() => {
    setIsLoading(true);
    setIsError(false);
    setError(null);

    void getHomeContent()
      .then((result) => {
        setData(result);
        setIsError(false);
      })
      .catch((reason: unknown) => {
        setData(null);
        setIsError(true);
        setError(reason instanceof Error ? reason : new Error('Failed to load home content'));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const isSuccess = !isLoading && !isError && data !== null;

  return {
    data,
    isLoading,
    isError,
    isSuccess,
    isEmpty: isSuccess && isEmptyContent(data),
    error,
    refetch,
    queryKey: HOME_QUERY_KEY,
  };
}
