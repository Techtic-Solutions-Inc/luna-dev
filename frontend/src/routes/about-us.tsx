import styled from 'styled-components';
import {
  AboutUsSection,
  ContactInformation,
  Footer,
  LegalLinks,
  MarketingSection,
  TeamMembers,
} from '../components/features/about';
import ErrorBoundary from '../components/ErrorBoundary';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gap-48);
  width: min(100%, 72rem);
  margin: 0 auto;
  padding-bottom: var(--padding-40);

  @media (max-width: 768px) {
    gap: var(--gap-32);
  }
`;

const FooterRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gap-16);
`;

const AboutUsPageContent = () => (
  <Page>
    <AboutUsSection />
    <MarketingSection />
    <TeamMembers />
    <ContactInformation />
    <FooterRow>
      <LegalLinks />
      <Footer />
    </FooterRow>
  </Page>
);

const AboutUsPage = () => (
  <ErrorBoundary>
    <AboutUsPageContent />
  </ErrorBoundary>
);

export default AboutUsPage;
