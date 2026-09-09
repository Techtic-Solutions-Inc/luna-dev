import type { ReactNode } from 'react';
import { ErrorMessage } from '@/components/ErrorMessage';
import { Frame2147227838Section } from '@/components/features/home/Frame2147227838Section';
import { HomePageLoading } from '@/components/features/home/HomePageLoading';
import { MaskGroupSection } from '@/components/features/home/MaskGroupSection';
import {
  buildHomeContentProps,
  type HomeContentProps,
} from '@/components/features/home/homeContentMappers';
import { useVisitorHome } from '@/hooks/useVisitorHome';
import type { HomeItem, HomePagination } from '@/types/home';

export interface HomeSectionData {
  items: HomeItem[];
  pagination: HomePagination;
  pagesFetched: number;
  content: HomeContentProps;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export interface HomeSectionProps {
  children: (data: HomeSectionData) => ReactNode;
}

export function HomeSection({ children }: HomeSectionProps) {
  const { items, pagination, pagesFetched, isLoading, error, refetch } = useVisitorHome();
  const content = buildHomeContentProps(items);

  if (isLoading) {
    return <HomePageLoading />;
  }

  if (error) {
    return (
      <div className="home-screen relative flex min-h-full w-full items-start justify-center px-[var(--spacing-padding-60)] py-[var(--spacing-padding-60)]">
        <div className="w-full max-w-[720px]">
          <ErrorMessage message={error} onRetry={() => void refetch()} />
        </div>
      </div>
    );
  }

  const { headline, subheadline, sections } = content;

  return (
    <div className="home-screen relative min-h-full w-full">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0">
        <MaskGroupSection />
      </div>

      <Frame2147227838Section headline={headline} subheadline={subheadline} />

      {!sections.hero && (
        <p className="relative z-20 mx-auto max-w-[720px] px-[var(--spacing-padding-60)] pt-[var(--spacing-padding-16)] text-center font-['Almarai'] text-[14px] text-foreground/70">
          Hero copy was not included in the visitor home response.
        </p>
      )}

      {children({ items, pagination, pagesFetched, content, isLoading, error, refetch })}
    </div>
  );
}
