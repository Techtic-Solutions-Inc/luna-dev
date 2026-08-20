import ContactSection from './ContactSection';
import HeroSection from './HeroSection';
import ScrollGallerySection from './ScrollGallerySection';
import StepsSection from './StepsSection';
import TestimonialsSection from './TestimonialsSection';
import UltimateMindSection from './UltimateMindSection';
import VisitorFooter from './VisitorFooter';
import VisitorHeader from './VisitorHeader';
import { Page } from './shared';

const HomePage = () => (
  <Page>
    <VisitorHeader />
    <main>
      <HeroSection />
      <ScrollGallerySection />
      <StepsSection />
      <UltimateMindSection />
      <TestimonialsSection />
      <ContactSection />
    </main>
    <VisitorFooter />
  </Page>
);

export default HomePage;
