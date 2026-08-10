import styled from 'styled-components';
import { useAboutContent } from '../../../hooks/useAboutContent';
import Card from '../../ui/Card';
import AboutStatus from './AboutStatus';
import { SkeletonBlock, VisuallyHidden } from './styles';

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: var(--gap-40);
`;

const Hero = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gap-16);
  max-width: 48rem;
`;

const Title = styled.h1`
  font-family: var(--font-heading-xl-42-family);
  font-size: var(--font-heading-xl-42-size);
  font-weight: var(--font-heading-xl-42-weight);
  line-height: var(--font-heading-xl-42-line-height);
  color: var(--color-20);

  @media (max-width: 768px) {
    font-family: var(--font-heading-xl-43-family);
    font-size: var(--font-heading-xl-43-size);
    font-weight: var(--font-heading-xl-43-weight);
    line-height: var(--font-heading-xl-43-line-height);
  }
`;

const Description = styled.p`
  font-family: var(--font-body-3-family);
  font-size: var(--font-body-3-size);
  font-weight: var(--font-body-3-weight);
  line-height: var(--font-body-3-line-height);
  color: var(--color-19);
`;

const StoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--gap-24);

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const StoryCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: var(--gap-12);
  background: var(--secondary);
`;

const StoryTitle = styled.h2`
  font-family: var(--font-heading-lg-46-family);
  font-size: var(--font-heading-lg-46-size);
  font-weight: var(--font-heading-lg-46-weight);
  line-height: var(--font-heading-lg-46-line-height);
  color: var(--color-20);
`;

const StoryBody = styled.p`
  font-family: var(--font-body-86-family);
  font-size: var(--font-body-86-size);
  font-weight: var(--font-body-86-weight);
  line-height: var(--font-body-86-line-height);
  color: var(--color-41);
`;

const Belief = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gap-12);
  padding: var(--padding-40);
  border-radius: var(--radius-16);
  background: var(--color-20);
  color: var(--secondary);

  @media (max-width: 768px) {
    padding: var(--padding-24);
  }
`;

const BeliefHeadline = styled.h2`
  font-family: var(--font-heading-xl-60-family);
  font-size: var(--font-heading-xl-60-size);
  font-weight: var(--font-heading-xl-60-weight);
  line-height: var(--font-heading-xl-60-line-height);
  color: var(--accent);
`;

const BeliefBody = styled.p`
  font-family: var(--font-body-72-family);
  font-size: var(--font-body-72-size);
  font-weight: var(--font-body-72-weight);
  line-height: var(--font-body-72-line-height);
  color: var(--color-93);
  max-width: 40rem;
`;

const TeamIntro = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gap-8);
  max-width: 40rem;
`;

const TeamHeadline = styled.h2`
  font-family: var(--font-heading-xl-31-family);
  font-size: var(--font-heading-xl-31-size);
  font-weight: var(--font-heading-xl-31-weight);
  line-height: var(--font-heading-xl-31-line-height);
  color: var(--color-20);
`;

const TeamSubheadline = styled.p`
  font-family: var(--font-body-6-family);
  font-size: var(--font-body-6-size);
  font-weight: var(--font-body-6-weight);
  line-height: var(--font-body-6-line-height);
  color: var(--text-secondary);
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

const AboutUsSectionLoading = () => (
  <Section aria-busy="true" aria-live="polite" aria-labelledby="about-us-title">
    <VisuallyHidden>Loading About Us content</VisuallyHidden>
    <SkeletonStack>
      <SkeletonHero>
        <SkeletonBlock $height="3.5rem" $width="min(100%, 20rem)" />
        <SkeletonBlock $height="1.25rem" $width="min(100%, 36rem)" />
        <SkeletonBlock $height="1.25rem" $width="min(100%, 28rem)" />
      </SkeletonHero>
      <StoryGrid>
        <SkeletonBlock $height="10rem" $radius="var(--radius-10)" />
        <SkeletonBlock $height="10rem" $radius="var(--radius-10)" />
        <SkeletonBlock $height="10rem" $radius="var(--radius-10)" />
      </StoryGrid>
      <SkeletonBlock $height="12rem" $radius="var(--radius-16)" />
      <SkeletonHero>
        <SkeletonBlock $height="2rem" $width="min(100%, 16rem)" />
        <SkeletonBlock $height="1rem" $width="min(100%, 24rem)" />
      </SkeletonHero>
    </SkeletonStack>
  </Section>
);

const AboutUsSection = () => {
  const { data, isLoading, error, isEmpty, refetch } = useAboutContent();

  if (isLoading) {
    return <AboutUsSectionLoading />;
  }

  if (error) {
    return (
      <AboutStatus
        variant="error"
        message={error}
        actionLabel="Try again"
        ariaLabel="Retry loading About Us"
        onAction={() => {
          void refetch();
        }}
      />
    );
  }

  if (isEmpty || !data) {
    return (
      <AboutStatus
        variant="empty"
        message="No About Us content is available."
        actionLabel="Refresh"
        actionVariant="secondary"
        onAction={() => {
          void refetch();
        }}
      />
    );
  }

  const sections = data.sections ?? [];

  return (
    <Section aria-labelledby="about-us-title">
      <Hero>
        <Title id="about-us-title">{data.title}</Title>
        <Description>{data.description}</Description>
      </Hero>

      {sections.length > 0 ? (
        <StoryGrid>
          {sections.map((section) => (
            <StoryCard key={section.title} as="article">
              <StoryTitle>{section.title}</StoryTitle>
              <StoryBody>{section.body}</StoryBody>
            </StoryCard>
          ))}
        </StoryGrid>
      ) : null}

      <Belief>
        <BeliefHeadline>{data.belief_headline}</BeliefHeadline>
        <BeliefBody>{data.belief_body}</BeliefBody>
      </Belief>

      <TeamIntro>
        <TeamHeadline id="meet-our-team">{data.team_headline}</TeamHeadline>
        <TeamSubheadline>{data.team_subheadline}</TeamSubheadline>
      </TeamIntro>
    </Section>
  );
};

export default AboutUsSection;
