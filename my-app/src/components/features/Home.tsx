import type { CSSProperties, ReactNode } from 'react';
import { EmptyState } from '@/components/EmptyState';
import { ErrorMessage } from '@/components/ErrorMessage';
import { buildHomeContentProps, type HomeContentProps } from '@/components/features/home/homeContentMappers';
import { Frame2147227816Section } from '@/components/features/home/Frame2147227816Section';
import { Frame2147227817Section } from '@/components/features/home/Frame2147227817Section';
import { Frame2147227818Section } from '@/components/features/home/Frame2147227818Section';
import { Group33654370Section } from '@/components/features/home/Group33654370Section';
import { Group33654437Section } from '@/components/features/home/Group33654437Section';
import { Group33654438Section } from '@/components/features/home/Group33654438Section';
import { HomeLoadingSkeleton } from '@/components/features/home/HomeLoadingSkeleton';
import { HOME_PAGE_INSET_CLASS } from '@/components/features/home/homeSectionLayout';
import { MaskGroupSection } from '@/components/features/home/MaskGroupSection';
import { StunningMarketingStepsSection } from '@/components/features/home/StunningMarketingStepsSection';
import { useVisitorHome } from '@/hooks/useVisitorHome';
import type { HomePagination } from '@/types/home';
import '@/components/features/home/home.css';

const homePageStyle: CSSProperties = {
  backgroundColor: 'var(--home-background)',
  color: 'var(--home-foreground)',
  minHeight: '100vh',
};

function HomePageShell({ children }: { children: ReactNode }) {
  return (
    <div className="w-full flex flex-col" style={homePageStyle}>
      <div className="relative flex w-full flex-col">
        <MaskGroupSection />
        <div className="relative z-10 flex w-full flex-col">{children}</div>
      </div>
    </div>
  );
}

interface HomeMarketingSectionsProps {
  content: HomeContentProps;
  isEmpty: boolean;
  itemCount: number;
  pagination: HomePagination;
  error?: string | null;
  onRetry?: () => void;
}

function HomeMarketingSections({
  content,
  isEmpty,
  itemCount,
  pagination,
  error,
  onRetry,
}: HomeMarketingSectionsProps) {
  return (
    <>
      {error && (
        <div className={`w-full py-8 ${HOME_PAGE_INSET_CLASS}`}>
          <ErrorMessage message={error} onRetry={onRetry ? () => void onRetry() : undefined} />
        </div>
      )}
      {!isEmpty && !error && (
        <p className="sr-only">
          {`Loaded ${itemCount} visitor home content ${itemCount === 1 ? 'item' : 'items'} from page ${pagination.page} (limit ${pagination.limit}). Sections ready: ${Object.entries(content.sections)
            .filter(([, enabled]) => enabled)
            .map(([name]) => name)
            .join(', ') || 'none'}.`}
        </p>
      )}
      {isEmpty && !error && (
        <div className={`w-full py-8 ${HOME_PAGE_INSET_CLASS}`}>
          <EmptyState
            tone="home"
            title="No content is available"
            description="We could not load visitor home content from the server. Default marketing sections are shown below."
          />
        </div>
      )}
      <StunningMarketingStepsSection
        headline={content.headline}
        subheadline={content.subheadline}
      />
      <Frame2147227816Section />
      <Frame2147227817Section />
      <Frame2147227818Section />
      <Group33654438Section
        galleryImages={content.galleryImages.length > 0 ? content.galleryImages : undefined}
      />
      <Group33654437Section
        testimonials={content.testimonials.length > 0 ? content.testimonials : undefined}
      />
      <Group33654370Section
        navLinks={content.navLinks.length > 0 ? content.navLinks : undefined}
      />
    </>
  );
}

function Home() {
  const { items, pagination, isLoading, error, isEmpty, refetch } = useVisitorHome();
  const content = buildHomeContentProps(items);

  if (isLoading) {
    return (
      <HomePageShell>
        <HomeLoadingSkeleton />
      </HomePageShell>
    );
  }

  return (
    <HomePageShell>
      <HomeMarketingSections
        content={content}
        isEmpty={isEmpty}
        itemCount={items.length}
        pagination={pagination}
        error={error}
        onRetry={refetch}
      />
    </HomePageShell>
  );
}

export default Home;
