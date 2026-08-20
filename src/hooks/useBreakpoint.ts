import { useMediaQuery } from '@/hooks/useMediaQuery';
import { breakpointQueries } from '@/theme/breakpoints';

export function useBreakpoint(name: keyof typeof breakpointQueries): boolean {
  return useMediaQuery(breakpointQueries[name]);
}
