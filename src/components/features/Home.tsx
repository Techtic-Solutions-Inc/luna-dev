import { Suspense, useCallback, useEffect, useState } from 'react';
import { parseApiError, searchHomeContent } from '../../lib/api/visitorHome';
import type { HomeSearchItem } from '../../types/visitorHome';
import Spinner from '../ui/Spinner';
import HomeContactForm from './home/HomeContactForm';
import HomeFeatures from './home/HomeFeatures';
import HomeFooter from './home/HomeFooter';
import HomeGallery from './home/HomeGallery';
import HomeHeader from './home/HomeHeader';
import HomeHero from './home/HomeHero';
import HomeNewsletter from './home/HomeNewsletter';
import HomeTestimonials from './home/HomeTestimonials';
import HomeUltimateMind from './home/HomeUltimateMind';
import { PageWrapper } from './home/homeStyles';

const HomeContent = () => {
  const [galleryItems, setGalleryItems] = useState<HomeSearchItem[]>([]);
  const [isGalleryLoading, setIsGalleryLoading] = useState(true);
  const [isGalleryError, setIsGalleryError] = useState(false);
  const [galleryErrorMessage, setGalleryErrorMessage] = useState('');

  const loadGallery = useCallback(async () => {
    setIsGalleryLoading(true);
    setIsGalleryError(false);
    setGalleryErrorMessage('');

    try {
      const response = await searchHomeContent();
      setGalleryItems(response.data.items);
    } catch (error) {
      setIsGalleryError(true);
      setGalleryErrorMessage(parseApiError(error));
      setGalleryItems([]);
    } finally {
      setIsGalleryLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadGallery();
  }, [loadGallery]);

  return (
    <PageWrapper>
      <HomeHeader />
      <main>
        <HomeHero />
        <HomeNewsletter />
        <HomeGallery
          items={galleryItems}
          isLoading={isGalleryLoading}
          isError={isGalleryError}
          errorMessage={galleryErrorMessage}
          isEmpty={!isGalleryLoading && !isGalleryError && galleryItems.length === 0}
          onRetry={loadGallery}
        />
        <HomeFeatures />
        <HomeUltimateMind />
        <HomeTestimonials />
        <HomeContactForm />
      </main>
      <HomeFooter />
    </PageWrapper>
  );
};

const Home = () => (
  <Suspense fallback={<Spinner label="Loading home..." />}>
    <HomeContent />
  </Suspense>
);

export default Home;
