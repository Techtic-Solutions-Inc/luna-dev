import { useCallback, useEffect, useState } from 'react';
import { getApiErrorMessage } from '@/lib/api/client';
import { fetchHome } from '@/services/home';
import type { HomeItem, HomePagination } from '@/types/home';
import { VISITOR_HOME_QUERY_KEY } from '@/types/home';

const PAGE_LIMIT = 50;
const MAX_PAGES = 100;

async function fetchAllVisitorHomeItems(): Promise<{
  items: HomeItem[];
  pagination: HomePagination;
  pagesFetched: number;
}> {
  let page = 1;
  const allItems: HomeItem[] = [];

  while (page <= MAX_PAGES) {
    const response = await fetchHome({ page, limit: PAGE_LIMIT });
    const batch = response.data.items ?? [];
    allItems.push(...batch);

    if (batch.length < PAGE_LIMIT) {
      return {
        items: allItems,
        pagination: {
          page: 1,
          limit: allItems.length > 0 ? allItems.length : PAGE_LIMIT,
        },
        pagesFetched: page,
      };
    }

    page += 1;
  }

  throw new Error(
    `Visitor home content exceeded ${MAX_PAGES} pages at ${PAGE_LIMIT} items per page. Please contact support.`,
  );
}

export function useVisitorHome() {
  const [items, setItems] = useState<HomeItem[]>([]);
  const [pagination, setPagination] = useState<HomePagination>({ page: 1, limit: PAGE_LIMIT });
  const [pagesFetched, setPagesFetched] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchAllVisitorHomeItems();
      setItems(result.items);
      setPagination(result.pagination);
      setPagesFetched(result.pagesFetched);
    } catch (err) {
      setError(getApiErrorMessage(err, 'Unable to load home content. Please try again.'));
      setItems([]);
      setPagesFetched(0);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return {
    queryKey: VISITOR_HOME_QUERY_KEY,
    items,
    pagination,
    pagesFetched,
    isLoading,
    error,
    refetch: load,
  };
}
