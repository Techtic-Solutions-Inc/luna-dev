import { useQuery } from '@tanstack/react-query';
import { fetchVisitorHome } from '@/lib/api/visitor';

/** Max items scanned for category discovery — no dedicated categories endpoint in contract. */
export const VISITOR_CATEGORY_DISCOVERY_LIMIT = 100;

export function useVisitorCategories() {
  return useQuery({
    queryKey: ['visitor', 'home', 'categories'],
    queryFn: () => fetchVisitorHome({ page: 1, limit: VISITOR_CATEGORY_DISCOVERY_LIMIT }),
    select: (response) => {
      const categories = new Set(
        response.data.items.map((item) => item.category).filter(Boolean),
      );
      return Array.from(categories).sort((a, b) => a.localeCompare(b));
    },
    staleTime: 5 * 60 * 1000,
  });
}
