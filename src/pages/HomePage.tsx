import { SkipLink } from '@/components/layout/SkipLink';
import { HomeHeader } from '@/components/home/HomeHeader';
import { HomeHero } from '@/components/home/HomeHero';
import { HomeSections } from '@/components/home/HomeSections';
import { HomeContact } from '@/components/home/HomeContact';
import { HomeFooter } from '@/components/home/HomeFooter';
import { HomeSkeleton } from '@/components/home/HomeSkeleton';
import { Alert } from '@/components/ui/Alert';
import { useVisitorHome } from '@/hooks/useVisitorHome';

export function HomePage() {
  const { loading, error, refetch } = useVisitorHome();

  return (
    <div className="min-h-screen bg-[#050505]">
      <SkipLink />
      <HomeHeader />
      <main id="main">
        {error && (
          <div className="px-6 py-4 md:px-[40px]">
            <Alert message={error} onRetry={() => void refetch()} />
          </div>
        )}
        {loading ? <HomeSkeleton /> : <HomeHero />}
        <HomeSections />
        <HomeContact />
      </main>
      <HomeFooter />
    </div>
  );
}
