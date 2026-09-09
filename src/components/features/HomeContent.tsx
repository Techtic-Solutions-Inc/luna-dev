import { Link } from 'react-router-dom';
import { useVisitorHomeData } from '@/hooks/useVisitorHomeData';
import { AgentwiseMindPreview } from '@/components/features/AgentwiseMindPreview';
import { HomeFooter } from '@/components/features/HomeFooter';
import { VisitorItemCard } from '@/components/features/VisitorItemCard';
import { EmptyState } from '@/components/EmptyState';
import { ErrorMessage } from '@/components/ErrorMessage';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { getApiErrorMessage } from '@/lib/api/errors';
import {
  homeButtonPrimaryClass,
  homeButtonOutlineClass,
  homeButtonGhostClass,
  homeHeadingXlClass,
  homeHeadingLgClass,
  homeBodyClass,
  homeBodySmClass,
  homeLinkClass,
  homeStepCardClass,
  homeStepBadgeClass,
  homeStepTitleClass,
  homeStepDescClass,
  homeLightHeadingClass,
  homeLightBodyClass,
} from '@/routes/home-styles';
import { cn } from '@/lib/utils';

const STEPS = [
  {
    step: '1',
    title: 'Choose your content',
    description: 'Browse studio-produced real estate marketing assets.',
  },
  {
    step: '2',
    title: 'Personalize with AI',
    description: 'Hand-designed by our creative team, personalized to your market.',
  },
  {
    step: '3',
    title: 'Post in minutes',
    description: 'Ready to share across your channels without sacrificing quality.',
  },
];

function MarketingGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-[24px] sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="space-y-[12px]">
          <Skeleton className="aspect-video w-full rounded-[10px]" />
          <Skeleton className="h-[20px] w-3/4" />
          <Skeleton className="h-[16px] w-full" />
        </div>
      ))}
    </div>
  );
}

export function HomeContent() {
  const { data, isLoading, isError, error, refetch, isSuccess } = useVisitorHomeData({
    page: 1,
    limit: 6,
  });

  const items = data?.data?.items ?? [];

  return (
    <div className="home-page relative w-full overflow-hidden">
      {/* Radial glow / gradient atmosphere */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="home-page__glow-purple absolute left-[5%] top-[10%] h-[500px] w-[500px] rounded-full opacity-25" />
        <div className="home-page__glow-tan absolute bottom-[20%] right-[10%] h-[400px] w-[400px] rounded-full opacity-20" />
        <div className="home-page__glow-coral absolute right-[25%] top-[8%] h-[320px] w-[320px] rounded-full opacity-15" />
      </div>

      {/* Hero */}
      <section className="relative px-[32px] py-[64px] lg:py-[80px]">
        <div className="mx-auto grid max-w-[1200px] items-center gap-[40px] lg:grid-cols-2">
          <div>
            <h1 className={homeHeadingXlClass}>Built for Agents like you.</h1>
            <p className={cn('mt-[24px]', homeBodyClass)}>
              Here&apos;s the deal… Great Marketing is Just the Start.
            </p>
            <div className="mt-[32px] flex flex-wrap gap-[16px]">
              <Button asChild variant="ghost" className={homeButtonPrimaryClass}>
                <Link to="/signup">Get Started</Link>
              </Button>
              <Button asChild variant="ghost" className={homeButtonOutlineClass}>
                <Link to="/login">Log in</Link>
              </Button>
              <Button asChild variant="ghost" className={homeButtonGhostClass}>
                <a href="#features">Learn More</a>
              </Button>
            </div>
          </div>
          <div className="grid gap-[16px] sm:grid-cols-2">
            <div className="home-page__glass-card rounded-[10px] border p-[20px] backdrop-blur-sm sm:col-span-2 lg:col-span-1">
              <p className="font-garamond text-[48px] font-medium leading-[62px] [color:var(--token-border)]">
                Hundreds
              </p>
              <p className="mt-[8px] font-almarai text-[14px] leading-[22px] [color:var(--token-primary)]">
                Marketing that stops the scroll
              </p>
            </div>
            <div className="home-page__glass-card rounded-[10px] border p-[20px] backdrop-blur-sm">
              <p className="font-almarai text-[14px] font-bold [color:var(--token-primary)]">
                Join
              </p>
              <p className={cn('mt-[8px] font-almarai text-[12px] leading-[18px]', homeBodySmClass)}>
                Start creating professional content today.
              </p>
              <Link to="/signup" className={cn('mt-[12px] inline-block', homeLinkClass)}>
                Join →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard + AI advisor */}
      <section id="features" className="relative px-[32px] py-[64px]">
        <div className="mx-auto grid max-w-[1200px] items-center gap-[48px] lg:grid-cols-2">
          <div>
            <h2 className={homeHeadingLgClass}>
              A custom business dashboard and a personalized AI advisor built into every plan.
            </h2>
            <p className={cn('mt-[16px]', homeBodyClass)}>
              Stunning marketing in three simple steps. Hand-designed by our creative team.
              Personalized by AI to your market. Ready to post in minutes.
            </p>
          </div>
          <AgentwiseMindPreview />
        </div>
      </section>

      {/* Three steps */}
      <section className="home-page__light-section px-[32px] py-[64px]">
        <div className="mx-auto max-w-[1200px]">
          <h2 className={homeLightHeadingClass}>
            Stunning marketing
            <br />
            in three simple steps
          </h2>
          <p className={cn('mx-auto mt-[16px] max-w-[640px] text-center', homeLightBodyClass)}>
            Hand-designed by our creative team. Personalized by AI to your market. Ready to post
            in minutes.
          </p>
          <div className="mt-[48px] grid gap-[24px] md:grid-cols-3">
            {STEPS.map((step) => (
              <div key={step.step} className={homeStepCardClass}>
                <span className={homeStepBadgeClass}>{step.step}</span>
                <h3 className={cn('mt-[16px]', homeStepTitleClass)}>{step.title}</h3>
                <p className={cn('mt-[8px]', homeStepDescClass)}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section id="about" className="relative px-[32px] py-[64px]">
        <div className="mx-auto max-w-[800px] text-center">
          <p className="font-almarai text-[18px] font-normal leading-[28px] [color:var(--token-primary)]">
            New agents, team leaders, and large brokerages are using Agentwise to spend less time
            marketing and more time closing without sacrificing quality.
          </p>
        </div>
      </section>

      {/* API-driven marketing content */}
      <section id="content" className="relative px-[32px] py-[64px]">
        <div className="mx-auto max-w-[1200px]">
          <h2 className={cn('mb-[32px]', homeHeadingLgClass)}>Featured Marketing Content</h2>

          {isLoading && <MarketingGridSkeleton />}

          {isError && (
            <ErrorMessage
              message={getApiErrorMessage(error, 'Unable to load content. Please try again.')}
              onRetry={() => refetch()}
            />
          )}

          {isSuccess && items.length === 0 && (
            <EmptyState
              title="No marketing content available"
              description="Check back soon for new content and resources."
              action={
                <Button
                  variant="ghost"
                  className={homeButtonOutlineClass}
                  onClick={() => refetch()}
                >
                  Refresh
                </Button>
              }
            />
          )}

          {isSuccess && items.length > 0 && (
            <div className="grid grid-cols-1 gap-[24px] sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <VisitorItemCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-[32px] py-[64px]">
        <div className="home-page__cta-gradient mx-auto max-w-[900px] rounded-[20px] border border-[color:var(--token-border)]/30 px-[32px] py-[48px] text-center">
          <h2 className="font-garamond text-[28px] font-medium leading-[36px] [color:var(--token-primary)] lg:text-[36px] lg:leading-[46px]">
            The Studio Marketing Team Every Agent Deserves.
          </h2>
          <p className={cn('mt-[16px] text-[14px]', homeBodySmClass)}>
            Now accessible through Agentwise.
          </p>
          <Button asChild variant="ghost" className={cn('mt-[32px] px-[32px]', homeButtonPrimaryClass)}>
            <Link to="/signup">Join</Link>
          </Button>
        </div>
      </section>

      <HomeFooter />
    </div>
  );
}
