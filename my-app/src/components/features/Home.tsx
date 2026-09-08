import { EmptyState } from '@/components/EmptyState';
import { ErrorMessage } from '@/components/ErrorMessage';
import { Frame1618873431Section } from '@/components/features/home/Frame1618873431Section';
import { Frame2147227816Section } from '@/components/features/home/Frame2147227816Section';
import { Frame2147227817Section } from '@/components/features/home/Frame2147227817Section';
import { Frame2147227818Section } from '@/components/features/home/Frame2147227818Section';
import { Frame2147227838Section } from '@/components/features/home/Frame2147227838Section';
import { Frame2147227843Section } from '@/components/features/home/Frame2147227843Section';
import { Frame2147227849Section } from '@/components/features/home/Frame2147227849Section';
import { Group33654370Section } from '@/components/features/home/Group33654370Section';
import { Group33654437Section } from '@/components/features/home/Group33654437Section';
import { Group33654438Section } from '@/components/features/home/Group33654438Section';
import {
  buildHomeContentProps,
  type HomeContentProps,
} from '@/components/features/home/homeContentMappers';
import { HomeLoadingSkeleton } from '@/components/features/home/HomeLoadingSkeleton';
import { MaskGroupSection } from '@/components/features/home/MaskGroupSection';
import { StunningMarketingStepsSection } from '@/components/features/home/StunningMarketingStepsSection';
import { useVisitorHome } from '@/hooks/useVisitorHome';
import type { HomePagination } from '@/types/home';
import '@/components/features/home/home.css';

interface HomeMarketingSectionsProps {
  content: HomeContentProps;
  itemCount: number;
  pagination: HomePagination;
}

function HomeMarketingSections({ content, itemCount, pagination }: HomeMarketingSectionsProps) {
  const { headline, subheadline, galleryImages, testimonials, navLinks, sections } = content;

  return (
    <>
      <p className="sr-only">
        Loaded {itemCount} visitor home content {itemCount === 1 ? 'item' : 'items'} aggregated
        across page {pagination.page} with batch limit {pagination.limit}.
      </p>

      <div className="pointer-events-none absolute inset-x-0 top-0 z-0">
        <MaskGroupSection />
      </div>

      <Frame2147227838Section headline={headline} subheadline={subheadline} />
      {!sections.hero && (
        <p className="relative z-20 mx-auto max-w-[720px] px-[var(--spacing-padding-60)] pt-[12px] text-center font-['Almarai'] text-[14px] text-[#ffffff]/70">
          Hero copy was not included in the visitor home response.
        </p>
      )}
      <StunningMarketingStepsSection />
      <Frame2147227816Section />
      <Frame2147227817Section />
      <Frame2147227818Section />
      <Group33654438Section
        galleryImages={galleryImages}
        showEmptyState={!sections.gallery}
      />
      <Frame2147227843Section />
      <Frame2147227849Section />
      <Group33654437Section
        testimonials={testimonials}
        showEmptyState={!sections.testimonials}
      />
      <Frame1618873431Section />
      <Group33654370Section navLinks={navLinks} showEmptyState={!sections.navLinks} />
    </>
  );
}

function Home() {
  const { items, pagination, isLoading, error, isEmpty, refetch } = useVisitorHome();
  const content = buildHomeContentProps(items);

  if (isLoading) {
    return <HomeLoadingSkeleton />;
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

  if (isEmpty) {
    return (
      <div className="home-screen relative flex min-h-full w-full items-start justify-center px-[var(--spacing-padding-60)] py-[var(--spacing-padding-60)]">
        <div className="w-full max-w-[720px]">
          <EmptyState
            title="No Content Available"
            description="Home content is not available at the moment."
            actionLabel="Retry"
            onAction={() => void refetch()}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="home-screen relative min-h-full w-full">
      <HomeMarketingSections content={content} itemCount={items.length} pagination={pagination} />
    </div>
  );
}

export default Home;
