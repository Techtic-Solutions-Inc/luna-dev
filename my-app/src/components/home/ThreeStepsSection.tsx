import styled from 'styled-components';
import {
  AccentText,
  BodyText,
  Container,
  MockupImage,
  Section,
  SerifHeading,
  SkeletonBlock,
} from './shared';
import AppLink from '../ui/AppLink';

const StepsSection = styled(Section)`
  background: ${({ theme }) => theme.colors['color-16']};
`;

const StepsTitle = styled(SerifHeading)`
  font-size: clamp(32px, 4vw, 42px);
  line-height: 1.25;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['gap-60']};
`;

const StepBlock = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing['gap-48']};
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing['gap-75']};

  &:nth-child(even) {
    direction: rtl;

    > * {
      direction: ltr;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing['gap-32']};

    &:nth-child(even) {
      direction: ltr;
    }
  }
`;

const StepContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing['gap-16']};
`;

const StepLabel = styled.span`
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  font-size: 14px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
`;

const StepHeading = styled(SerifHeading)`
  font-size: clamp(24px, 3vw, 30px);
  line-height: 1.3;
  color: ${({ theme }) => theme.colors.accent};
`;

const ActionLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing['gap-24']};
  margin-top: ${({ theme }) => theme.spacing['gap-8']};
`;

const steps = [
  {
    id: '01',
    title: 'Browse The Continuously Updated Collection.',
    body: 'Help real estate professionals create content faster with ready-made templates. Explore the complete Agentwise content library and find the perfect starting point.',
    image: '/assets/figma/step-01-mockup.png',
    imageAlt: 'Agentwise content library with template categories',
    links: [{ label: 'Browse all', to: '#content' }],
  },
  {
    id: '02',
    title: 'We Personalize It To Your Business And Market.',
    body: 'We personalize it to your business and market. Customize location, price, and agent details so every post feels authentically yours.',
    image: '/assets/figma/step-02-mockup.png',
    imageAlt: 'Personalize your post form with location and pricing fields',
    links: [{ label: 'Customize', to: '#contact' }],
  },
  {
    id: '03',
    title: 'Post, Attract, Engage, And Stand Out.',
    body: 'Download your finished content and share it anywhere. Looks like you have a full-scale marketing team (and with Agentwise, you do.) Increase audience engagement through visually appealing social media posts.',
    image: '/assets/figma/step-03-mockup.png',
    imageAlt: 'Mobile app preview showing Instagram post with download and copy caption actions',
    links: [
      { label: 'Download', to: '#content' },
      { label: 'Copy Caption', to: '#content' },
    ],
  },
];

interface ThreeStepsProps {
  isLoading?: boolean;
}

const ThreeSteps = ({ isLoading = false }: ThreeStepsProps) => (
  <StepsSection aria-labelledby="steps-heading">
    <Container>
      <StepsTitle id="steps-heading">
        Stunning Marketing, <AccentText>In Three Simple Steps</AccentText>
      </StepsTitle>
      {isLoading
        ? steps.map((step) => (
            <StepBlock key={step.id}>
              <SkeletonBlock $height="200px" />
              <SkeletonBlock $height="320px" />
            </StepBlock>
          ))
        : steps.map((step) => (
            <StepBlock key={step.id}>
              <StepContent>
                <StepLabel>Step {step.id}</StepLabel>
                <StepHeading>{step.title}</StepHeading>
                <BodyText>{step.body}</BodyText>
                <ActionLinks>
                  {step.links.map((link) => (
                    <AppLink key={link.label} to={link.to} variant="primary">
                      {link.label}
                    </AppLink>
                  ))}
                </ActionLinks>
              </StepContent>
              <MockupImage src={step.image} alt={step.imageAlt} />
            </StepBlock>
          ))}
    </Container>
  </StepsSection>
);

export default ThreeSteps;
