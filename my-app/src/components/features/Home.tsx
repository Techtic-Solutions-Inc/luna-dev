import type { CSSProperties, ReactNode } from 'react';
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
}

function HomeMarketingSections({
  content,
  isEmpty,
  itemCount,
  pagination,
}: HomeMarketingSectionsProps) {
  return (
    <>
      <p className="sr-only">
        {isEmpty
          ? 'No visitor home API items were returned; showing default marketing content.'
          : `Loaded ${itemCount} visitor home content ${itemCount === 1 ? 'item' : 'items'} from page ${pagination.page} (limit ${pagination.limit}). Sections ready: ${Object.entries(content.sections)
              .filter(([, enabled]) => enabled)
              .map(([name]) => name)
              .join(', ') || 'none'}.`}
      </p>
      <StunningMarketingStepsSection />
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

function HomeStatusPanel({ children }: { children: ReactNode }) {
  return (
    <div className={`w-full py-16 ${HOME_PAGE_INSET_CLASS}`}>
      <div className="mx-auto w-full max-w-[720px]">{children}</div>
    </div>
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

  if (error) {
    return (
      <HomePageShell>
        <HomeStatusPanel>
          <ErrorMessage message={error} onRetry={() => void refetch()} />
        </HomeStatusPanel>
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
      />
    </HomePageShell>
  );
}

export default Home;
