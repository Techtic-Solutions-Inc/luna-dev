import { useCallback, useRef } from 'react';
import { useVisitorHome } from '../../hooks/useVisitorHome';
import ContactFormSection from './home/ContactFormSection';
import HeroSection from './home/HeroSection';
import HomeFooter from './home/HomeFooter';
import HomeHeader from './home/HomeHeader';
import MarketingGallerySection from './home/MarketingGallerySection';
import StepsSection from './home/StepsSection';
import TestimonialsSection from './home/TestimonialsSection';
import UltimateMindSection from './home/UltimateMindSection';

const Home = () => {
  const contactRef = useRef<HTMLDivElement>(null);
  const {
    searchResults,
    searchLoading,
    searchError,
    performSearch,
    submitForm,
    submitStatus,
    submitMessage,
    fieldErrors,
    initialLoading,
  } = useVisitorHome();

  const scrollToContact = useCallback(() => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleCustomize = useCallback(() => {
    void performSearch('templates');
    scrollToContact();
  }, [performSearch, scrollToContact]);

  const handleDownload = useCallback(() => {
    void performSearch('download');
  }, [performSearch]);

  const handleLearnMore = useCallback(() => {
    document.getElementById('ultimate-mind')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-16)] text-secondary">
      <HomeHeader onGetStarted={scrollToContact} />

      <main>
        <HeroSection
          onGetStarted={scrollToContact}
          searchResults={searchResults}
          searchLoading={searchLoading}
          searchError={searchError}
          onSearch={performSearch}
        />

        <MarketingGallerySection />

        <StepsSection onCustomize={handleCustomize} onDownload={handleDownload} />

        <div id="ultimate-mind">
          <UltimateMindSection onLearnMore={handleLearnMore} />
        </div>

        <TestimonialsSection />

        <div ref={contactRef}>
          <ContactFormSection
            onSubmit={submitForm}
            fieldErrors={fieldErrors}
            submitStatus={submitStatus}
            submitMessage={submitMessage}
            initialLoading={initialLoading}
          />
        </div>
      </main>

      <HomeFooter />
    </div>
  );
};

export default Home;
