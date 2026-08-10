import styled from 'styled-components';
import type { AboutContentSection } from '../../types/api';
import Card from '../ui/Card';

interface AboutUsSectionProps {
  title: string;
  description: string;
  sections: AboutContentSection[];
  beliefHeadline: string;
  beliefBody: string;
  teamHeadline: string;
  teamSubheadline: string;
}

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

const AboutUsSection = ({
  title,
  description,
  sections,
  beliefHeadline,
  beliefBody,
  teamHeadline,
  teamSubheadline,
}: AboutUsSectionProps) => (
  <Section aria-labelledby="about-us-title">
    <Hero>
      <Title id="about-us-title">{title}</Title>
      <Description>{description}</Description>
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
      <BeliefHeadline>{beliefHeadline}</BeliefHeadline>
      <BeliefBody>{beliefBody}</BeliefBody>
    </Belief>

    <TeamIntro>
      <TeamHeadline id="meet-our-team">{teamHeadline}</TeamHeadline>
      <TeamSubheadline>{teamSubheadline}</TeamSubheadline>
    </TeamIntro>
  </Section>
);

export default AboutUsSection;
