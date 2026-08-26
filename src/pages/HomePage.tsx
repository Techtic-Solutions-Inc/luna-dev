import { Alert } from '../components/ui/Alert';
import { EmptyState } from '../components/ui/EmptyState';
import { HomeContact } from '../components/home/HomeContact';
import { HomeFooter } from '../components/home/HomeFooter';
import { HomeHeader } from '../components/home/HomeHeader';
import { HomeHero } from '../components/home/HomeHero';
import { HomeSections } from '../components/home/HomeSections';
import { HomeSkeleton } from '../components/home/HomeSkeleton';
import { SkipLink } from '../components/layout/SkipLink';
import { useVisitorHome } from '../hooks/useVisitorHome';
import { readString } from '../lib/api/home';

export function HomePage() {
  const { status, data, error, retry } = useVisitorHome();

  if (status === 'loading') {
    return (
      <div className="mx-auto min-h-screen max-w-[1920px] bg-color-105">
        <SkipLink />
        <main id="main-content" aria-busy="true">
          <HomeSkeleton />
        </main>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen max-w-[1920px] bg-color-105">
      <SkipLink />
      <main id="main-content">
        <div className="home-hero-bg">
          <HomeHeader />
          {status === 'error' && error ? (
            <div className="px-[20px] py-[16px] md:px-[40px]">
              <Alert onRetry={retry}>{error.message}</Alert>
            </div>
          ) : null}
          {status === 'empty' ? (
            <div className="px-[20px] py-[16px] md:px-[40px]">
              <EmptyState />
            </div>
          ) : null}
          <HomeHero
            headline={readString(data, 'marketing_message')}
            subcopy={readString(data, 'sub_heading')}
          />
        </div>
        <HomeSections />
        <HomeContact data={data} />
      </main>
      <HomeFooter data={data} />
    </div>
  );
}
