import { useState, useEffect, useCallback } from 'react';
import type { ContentCalendarEntry } from '../types/contentCalendar';
import { fetchContentCalendarEntries } from '../lib/api/contentCalendar';
import { AxiosError } from 'axios';

interface UseContentCalendarResult {
  entries: ContentCalendarEntry[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useContentCalendar(): UseContentCalendarResult {
  const [entries, setEntries] = useState<ContentCalendarEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchContentCalendarEntries();
      if (response.success) {
        setEntries(response.data.items);
      } else {
        setError(response.message);
      }
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string }>;
      setError(axiosErr.response?.data?.message ?? 'Failed to load content calendar');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { entries, loading, error, refetch: fetchData };
}
