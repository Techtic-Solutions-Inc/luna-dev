import { useQuery } from '@tanstack/react-query';
import { fetchVisitorHome } from '@/lib/api/visitor';
import type { VisitorHomeParams } from '@/types';

export function useVisitorHomeData(params: VisitorHomeParams = {}) {
  return useQuery({
    queryKey: ['visitor', 'home', params],
    queryFn: () => fetchVisitorHome(params),
  });
}
