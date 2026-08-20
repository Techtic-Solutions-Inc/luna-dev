import { useCallback, useEffect, useState } from 'react';
import { getApiErrorMessage, searchHomeContent } from '../lib/api/client';
import { normalizeHomeSearchItems } from '../lib/home';
import type { HomeSearchItem } from '../types/api';

export interface HomeSearchState {
  query: string;
  setQuery: (value: string) => void;
  items: HomeSearchItem[];
  loading: boolean;
  error: string | null;
  search: (value?: string) => Promise<void>;
}

export default function useHomeSearch(): HomeSearchState {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState<HomeSearchItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (value = '') => {
    setQuery(value);
    setLoading(true);
    setError(null);
    try {
      const response = await searchHomeContent(value.trim() || undefined);
      setItems(normalizeHomeSearchItems(response));
    } catch (err) {
      setItems([]);
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const response = await searchHomeContent();
        if (!cancelled) {
          setItems(normalizeHomeSearchItems(response));
        }
      } catch {
        if (!cancelled) {
          setItems([]);
        }
      }
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { query, setQuery, items, loading, error, search };
}
