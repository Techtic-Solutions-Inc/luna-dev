import { useCallback, useEffect, useState } from 'react';
import { getApiErrorMessage } from '@/lib/api/client';
import { fetchHome } from '@/services/home';
import type { HomeItem, HomePagination } from '@/types/home';
import { VISITOR_HOME_QUERY_KEY } from '@/types/home';

const PAGE_LIMIT = 50;

async function fetchAllVisitorHomeItems(): Promise<{
  items: HomeItem[];
  pagination: HomePagination;
}> {
  let page = 1;
  const allItems: HomeItem[] = [];

  while (true) {
    const response = await fetchHome({ page, limit: PAGE_LIMIT });
    const batch = response.data.items ?? [];
    allItems.push(...batch);

    if (batch.length < PAGE_LIMIT) {
      break;
    }

    page += 1;
  }

  return {
    items: allItems,
    pagination: {
      page: 1,
      limit: allItems.length > 0 ? allItems.length : PAGE_LIMIT,
    },
  };
}

export function useVisitorHome() {
  const [items, setItems] = useState<HomeItem[]>([]);
  const [pagination, setPagination] = useState<HomePagination>({ page: 1, limit: PAGE_LIMIT });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchAllVisitorHomeItems();
      setItems(result.items);
      setPagination(result.pagination);
    } catch (err) {
      setError(getApiErrorMessage(err, 'Unable to load home content. Please try again.'));
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const isEmpty = !isLoading && !error && items.length === 0;

  return {
    queryKey: VISITOR_HOME_QUERY_KEY,
    items,
    pagination,
    isLoading,
    error,
    isEmpty,
    refetch: load,
  };
}
