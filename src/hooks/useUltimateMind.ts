import { useCallback, useEffect, useState } from 'react';
import { getUltimateMindSuggestions } from '@/lib/api/ultimate-mind';
import { ApiClientError } from '@/types/api';
import type { UltimateMindSuggestion } from '@/types/ultimate-mind';

export function useUltimateMind() {
  const [suggestions, setSuggestions] = useState<UltimateMindSuggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSuggestions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getUltimateMindSuggestions();
      setSuggestions(result);
    } catch (err) {
      if (err instanceof ApiClientError && err.status === 404) {
        setSuggestions([]);
      } else if (err instanceof ApiClientError) {
        setError(err.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchSuggestions();
  }, [fetchSuggestions]);

  return {
    suggestions,
    loading,
    error,
    empty: !loading && suggestions.length === 0,
    refetch: fetchSuggestions,
  };
}
