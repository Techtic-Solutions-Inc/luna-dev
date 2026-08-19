import HomeContent from '@/components/domain/HomeContent';
import SiteFooter from '@/components/layout/SiteFooter';
import SiteHeader from '@/components/layout/SiteHeader';

export default function Home() {
  return (
    <div className="min-h-screen bg-color-16">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-token-8 focus:bg-accent focus:px-3 focus:py-2 focus:text-color-16"
      >
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main-content">
        <HomeContent />
      </main>
      <SiteFooter />
    </div>
  );
}
