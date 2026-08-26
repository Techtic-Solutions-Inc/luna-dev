import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ContactSection } from '@/components/home/ContactSection';
import { EmptyLinksState } from '@/components/home/EmptyLinksState';
import { FeaturesGallery } from '@/components/home/FeaturesGallery';
import { HeroSection } from '@/components/home/HeroSection';
import { HomeErrorState } from '@/components/home/HomeErrorState';
import { HomeSkeleton } from '@/components/home/HomeSkeleton';
import { SiteFooter } from '@/components/home/SiteFooter';
import { SiteHeader } from '@/components/home/SiteHeader';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { ThreeStepsSection } from '@/components/home/ThreeStepsSection';
import { UltimateMindSection } from '@/components/home/UltimateMindSection';
import { useVisitorHome } from '@/hooks/useVisitorHome';

export function HomePage() {
  const { status, data, error, retry } = useVisitorHome();
  const { pathname } = useLocation();
  const showSkeleton = status === 'loading' && error === null;
  const showContent = !showSkeleton;

  useEffect(() => {
    if (pathname !== '/contact' || !showContent) {
      return;
    }
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }, [pathname, showContent]);

  return (
    <div className="home-hero-bg min-h-screen bg-color-103">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main-content" aria-busy={status === 'loading'}>
        {error ? (
          <div className="px-[20px] pb-[16px] pt-[12px] md:px-[30px] lg:px-[101px]">
            <HomeErrorState message={error.message} onRetry={retry} busy={status === 'loading'} />
          </div>
        ) : null}
        {status === 'empty' ? (
          <div className="px-[20px] pb-[16px] pt-[12px] md:px-[30px] lg:px-[101px]">
            <EmptyLinksState />
          </div>
        ) : null}
        {showSkeleton ? (
          <HomeSkeleton />
        ) : (
          <>
            <HeroSection data={data} />
            <div id="features">
              <FeaturesGallery />
            </div>
            <ThreeStepsSection />
            <UltimateMindSection />
            <TestimonialsSection />
            <ContactSection data={data} />
          </>
        )}
      </main>
      <SiteFooter data={data} />
    </div>
  );
}
