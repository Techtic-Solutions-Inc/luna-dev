import styled from 'styled-components';
import Button from '../../ui/Button';
import {
  FeatureDescription,
  FeatureTitle,
  SectionContainer,
  SectionHeading,
  SectionSubheading,
  StepLabel,
} from './homeStyles';

const FeaturesSection = styled.section`
  padding: ${({ theme }) => `${theme.spacing['padding-60']} 0`};
  background-color: ${({ theme }) => theme.colors['color-16']};
  background-image:
    linear-gradient(${({ theme }) => theme.colors['color-41']}33 1px, transparent 1px),
    linear-gradient(90deg, ${({ theme }) => theme.colors['color-41']}33 1px, transparent 1px);
  background-size: 40px 40px;
`;

const Intro = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing['gap-60']};
`;

const FeatureRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing['gap-40']};
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing['gap-60']};

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr 1fr;
    gap: ${({ theme }) => theme.spacing['gap-60']};
  }
`;

const FeatureText = styled.div``;

const FeatureVisual = styled.div`
  display: flex;
  justify-content: center;
`;

const MockPanel = styled.div<{ $variant?: 'dark' | 'light' | 'mobile' }>`
  width: 100%;
  max-width: 420px;
  padding: ${({ theme }) => theme.spacing['padding-24']};
  border-radius: ${({ theme }) => theme.radius['radius-16']};
  background-color: ${({ theme, $variant }) =>
    $variant === 'light' ? theme.colors.secondary : theme.colors['color-41']};
  box-shadow: ${({ theme }) => theme.shadows['drop-shadow-20']};
  color: ${({ theme, $variant }) =>
    $variant === 'light' ? theme.colors['color-20'] : theme.colors.secondary};

  ${({ $variant }) =>
    $variant === 'mobile' &&
    `
    max-width: 240px;
    aspect-ratio: 9 / 16;
  `}
`;

const MockBar = styled.div`
  height: 12px;
  border-radius: ${({ theme }) => theme.radius['radius-4']};
  background-color: ${({ theme }) => theme.colors['color-49']};
  margin-bottom: ${({ theme }) => theme.spacing['gap-12']};
`;

const MockBlock = styled.div<{ $height?: string }>`
  height: ${({ $height }) => $height ?? '48px'};
  border-radius: ${({ theme }) => theme.radius['radius-8']};
  background-color: ${({ theme }) => theme.colors['color-49']};
  margin-bottom: ${({ theme }) => theme.spacing['gap-8']};
`;

const ActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing['gap-12']};
  margin-top: ${({ theme }) => theme.spacing['gap-24']};
`;

const FEATURES = [
  {
    step: 'Step 01',
    title: 'Browse The Continuously Updated Collection.',
    description:
      'Help real estate professionals create content faster with ready-made templates.',
    buttonLabel: 'Get Started',
    buttonVariant: 'primary' as const,
    visual: 'dark' as const,
  },
  {
    step: 'Step 02',
    title: 'We Personalize It To Your Business And Market.',
    description:
      'Click Customize to edit the location, market data, images, or branding.',
    buttonLabel: 'Customize',
    buttonVariant: 'outline' as const,
    visual: 'light' as const,
  },
  {
    step: 'Step 03',
    title: 'Post, Attract, Engage, And Stand Out.',
    description: 'Download your finished content and share it anywhere.',
    buttonLabel: 'Download',
    buttonVariant: 'primary' as const,
    visual: 'mobile' as const,
  },
] as const;

const HomeFeatures = () => (
  <FeaturesSection aria-labelledby="features-heading">
    <SectionContainer>
      <Intro>
        <SectionHeading id="features-heading">
          Stunning Marketing, In Three Simple Steps
        </SectionHeading>
        <SectionSubheading>
          Built for Agents like you — explore Ultimate Mind to create content in minutes.
        </SectionSubheading>
      </Intro>

      {FEATURES.map((feature, index) => (
        <FeatureRow key={feature.step}>
          <FeatureText style={{ order: index % 2 === 1 ? 2 : 1 }}>
            <StepLabel>{feature.step}</StepLabel>
            <FeatureTitle>{feature.title}</FeatureTitle>
            <FeatureDescription>{feature.description}</FeatureDescription>
            <ActionRow>
              <Button variant={feature.buttonVariant}>{feature.buttonLabel}</Button>
            </ActionRow>
          </FeatureText>
          <FeatureVisual style={{ order: index % 2 === 1 ? 1 : 2 }}>
            <MockPanel $variant={feature.visual} aria-hidden="true">
              {feature.visual === 'light' && (
                <>
                  <p
                    style={{
                      fontFamily: "'EB Garamond', serif",
                      fontSize: '18px',
                      marginBottom: '12px',
                      color: '#14100d',
                    }}
                  >
                    Explore Ultimate Mind
                  </p>
                  <MockBar />
                  <MockBlock $height="80px" />
                  <MockBlock />
                  <MockBlock />
                </>
              )}
              {feature.visual === 'dark' && (
                <>
                  <MockBar />
                  <MockBlock $height="64px" />
                  <MockBlock />
                  <MockBlock $height="96px" />
                </>
              )}
              {feature.visual === 'mobile' && (
                <>
                  <MockBlock $height="120px" />
                  <MockBlock />
                  <MockBlock $height="32px" />
                </>
              )}
            </MockPanel>
          </FeatureVisual>
        </FeatureRow>
      ))}
    </SectionContainer>
  </FeaturesSection>
);

export default HomeFeatures;
