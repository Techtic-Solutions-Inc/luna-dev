import { Loader2 } from 'lucide-react';
import { HomeLoadingSkeleton } from '@/components/features/home/HomeLoadingSkeleton';

export function HomePageLoading() {
  return (
    <div className="home-screen relative min-h-full w-full" aria-busy="true">
      <div
        className="absolute inset-0 z-50 flex items-center justify-center bg-home-background/70"
        role="status"
        aria-live="polite"
        aria-label="Loading home content"
      >
        <Loader2 className="h-10 w-10 animate-spin text-accent" aria-hidden="true" />
        <span className="sr-only">Loading home content…</span>
      </div>
      <HomeLoadingSkeleton />
    </div>
  );
}
