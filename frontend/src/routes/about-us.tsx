import styled, { keyframes } from 'styled-components';
import { useAboutData } from '../hooks/useAboutData';
import AboutUsSection from '../components/features/AboutUsSection';
import MarketingSection from '../components/features/MarketingSection';
import TeamMembersList from '../components/features/TeamMembersList';
import ContactInformation from '../components/features/ContactInformation';
import LegalLinks from '../components/features/LegalLinks';
import Footer from '../components/features/Footer';
import Button from '../components/ui/Button';
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

const StatusCard = styled.div<{ $variant: 'error' | 'empty' }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--gap-16);
  padding: var(--padding-24);
  border-radius: var(--radius-10);
  max-width: 40rem;

  ${({ $variant }) =>
    $variant === 'error'
      ? `
        background: var(--color-29);
        border: 1px solid var(--border);
        color: var(--color-53);
      `
      : `
        background: var(--color-38);
        color: var(--text-secondary);
      `}
`;

const StatusText = styled.p`
  font-family: var(--font-body-sm-2-family);
  font-size: var(--font-body-sm-2-size);
  font-weight: var(--font-body-sm-2-weight);
  line-height: var(--font-body-sm-2-line-height);
`;

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const SkeletonBlock = styled.div<{
  $height?: string;
  $width?: string;
  $radius?: string;
  $aspect?: string;
}>`
  width: ${({ $width }) => $width ?? '100%'};
  height: ${({ $height, $aspect }) => ($aspect ? 'auto' : ($height ?? '1rem'))};
  aspect-ratio: ${({ $aspect }) => $aspect ?? 'auto'};
  border-radius: ${({ $radius }) => $radius ?? 'var(--radius-6)'};
  background: linear-gradient(
    90deg,
    var(--color-38) 0%,
    var(--color-46) 50%,
    var(--color-38) 100%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.4s ease-in-out infinite;
`;

const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

const SkeletonStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gap-24);
`;

const SkeletonHero = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gap-12);
`;

const SkeletonCards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--gap-24);

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const SkeletonTeam = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: var(--gap-20);

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const SkeletonTeamCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gap-12);
`;

const FooterRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gap-16);
`;

const AboutUsLoading = () => (
  <Page aria-busy="true" aria-live="polite">
    <VisuallyHidden>Loading About Us content</VisuallyHidden>
    <SkeletonStack>
      <SkeletonHero>
        <SkeletonBlock $height="3.5rem" $width="min(100%, 20rem)" />
        <SkeletonBlock $height="1.25rem" $width="min(100%, 36rem)" />
        <SkeletonBlock $height="1.25rem" $width="min(100%, 28rem)" />
      </SkeletonHero>
      <SkeletonCards>
        <SkeletonBlock $height="10rem" $radius="var(--radius-10)" />
        <SkeletonBlock $height="10rem" $radius="var(--radius-10)" />
        <SkeletonBlock $height="10rem" $radius="var(--radius-10)" />
      </SkeletonCards>
      <SkeletonBlock $height="12rem" $radius="var(--radius-16)" />
      <SkeletonHero>
        <SkeletonBlock $height="2rem" $width="min(100%, 16rem)" />
        <SkeletonBlock $height="1rem" $width="min(100%, 24rem)" />
      </SkeletonHero>
      <SkeletonTeam>
        {Array.from({ length: 5 }, (_, index) => (
          <SkeletonTeamCard key={index}>
            <SkeletonBlock $aspect="1 / 1" $radius="var(--radius-10)" />
            <SkeletonBlock $height="1.25rem" $width="70%" />
            <SkeletonBlock $height="1rem" $width="50%" />
          </SkeletonTeamCard>
        ))}
      </SkeletonTeam>
      <SkeletonBlock $height="14rem" $radius="var(--radius-10)" />
    </SkeletonStack>
  </Page>
);

const AboutUsPageContent = () => {
  const { data, isLoading, error, isEmpty, refetch } = useAboutData();

  if (isLoading) {
    return <AboutUsLoading />;
  }

  if (error) {
    return (
      <Page>
        <StatusCard $variant="error" role="alert">
          <StatusText>{error}</StatusText>
          <Button type="button" onClick={() => void refetch()} aria-label="Retry loading About Us">
            Try again
          </Button>
        </StatusCard>
      </Page>
    );
  }

  if (isEmpty || !data) {
    return (
      <Page>
        <StatusCard $variant="empty" role="status">
          <StatusText>No About Us content is available.</StatusText>
          <Button type="button" onClick={() => void refetch()} variant="secondary">
            Refresh
          </Button>
        </StatusCard>
      </Page>
    );
  }

  return (
    <Page>
      <AboutUsSection
        title={data.title}
        description={data.description}
        sections={data.sections ?? []}
        beliefHeadline={data.belief_headline}
        beliefBody={data.belief_body}
        teamHeadline={data.team_headline}
        teamSubheadline={data.team_subheadline}
      />
      {data.marketing ? <MarketingSection marketing={data.marketing} /> : null}
      <TeamMembersList members={data.team_members ?? []} />
      {data.contact ? (
        <ContactInformation
          contact={{
            ...data.contact,
            links: data.contact.links ?? [],
          }}
        />
      ) : null}
      <FooterRow>
        <LegalLinks links={data.legal_links ?? []} />
        {data.footer_copyright ? (
          <Footer copyright={data.footer_copyright} />
        ) : null}
      </FooterRow>
    </Page>
  );
};

const AboutUsPage = () => (
  <ErrorBoundary>
    <AboutUsPageContent />
  </ErrorBoundary>
);

export default AboutUsPage;
