import { useCallback, useEffect, useState } from 'react';
import { getVisitorHome } from '@/lib/api/home';
import { ApiClientError } from '@/types/api';

export function useVisitorHome() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHome = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await getVisitorHome();
    } catch (err) {
      if (err instanceof ApiClientError) {
        if (err.status !== 404) {
          setError(err.message);
        }
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchHome();
  }, [fetchHome]);

  return { loading, error, refetch: fetchHome };
}
