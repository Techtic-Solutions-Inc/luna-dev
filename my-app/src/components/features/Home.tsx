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
import { HomeLoadingSkeleton } from '@/components/features/home/HomeLoadingSkeleton';
import { MaskGroupSection } from '@/components/features/home/MaskGroupSection';
import { StunningMarketingStepsSection } from '@/components/features/home/StunningMarketingStepsSection';
import { useHome } from '@/hooks/useHome';
import '@/components/features/home/home.css';

function HomeMarketingSections() {
  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0">
        <MaskGroupSection />
      </div>

      <Frame2147227838Section />
      <StunningMarketingStepsSection />
      <Frame2147227816Section />
      <Frame2147227817Section />
      <Frame2147227818Section />
      <Group33654438Section />
      <Frame2147227843Section />
      <Frame2147227849Section />
      <Group33654437Section />
      <Frame1618873431Section />
      <Group33654370Section />
    </>
  );
}

function Home() {
  const { isLoading, error, isEmpty, refetch } = useHome();

  if (isLoading) {
    return <HomeLoadingSkeleton />;
  }

  return (
    <div className="home-screen relative min-h-full w-full">
      {(error || isEmpty) && (
        <div className="relative z-20 mx-auto max-w-[720px] px-[var(--spacing-padding-60)] pb-[var(--spacing-padding-20)] pt-[var(--spacing-padding-20)]">
          {error ? (
            <ErrorMessage message={error} onRetry={() => void refetch()} />
          ) : (
            <EmptyState
              title="No Content Available"
              description="Home content is not available at the moment. Showing default marketing content."
              actionLabel="Retry"
              onAction={() => void refetch()}
            />
          )}
        </div>
      )}

      <HomeMarketingSections />
    </div>
  );
}

export default Home;
