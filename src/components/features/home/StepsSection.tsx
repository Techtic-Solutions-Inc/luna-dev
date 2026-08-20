import styled from 'styled-components';
import { breakpoints } from '../../../theme/breakpoints';
import { tokens } from '../../../theme/tokens';
import { BodyCopy, Container, GridBackdrop, Section, SerifDisplay } from './shared';

const StepsSectionWrap = styled(Section)``;

const Title = styled(SerifDisplay)`
  text-align: center;
  margin-bottom: ${tokens.spacing['gap-48']};
`;

const Step = styled.article`
  display: grid;
  gap: ${tokens.spacing['gap-24']};
  margin-bottom: ${tokens.spacing['gap-48']};
  align-items: center;

  @media (min-width: ${breakpoints.desktop}) {
    grid-template-columns: 1fr 1fr;
    gap: ${tokens.spacing['gap-48']};
  }
`;

const StepCopy = styled.div`
  display: grid;
  gap: ${tokens.spacing['gap-12']};
`;

const StepLabel = styled.p`
  margin: 0;
  color: var(--accent);
  font-family: ${tokens.typography['caption-4'].fontFamily}, sans-serif;
  font-size: ${tokens.typography['caption-4'].fontSize};
  font-weight: ${tokens.typography['caption-5'].fontWeight};
  line-height: ${tokens.typography['caption-4'].lineHeight};
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const StepHeading = styled.h3`
  margin: 0;
  color: var(--secondary);
  font-family: ${tokens.typography['heading-xl-76'].fontFamily}, serif;
  font-size: ${tokens.typography['heading-lg-31'].fontSize};
  font-weight: ${tokens.typography['heading-xl-76'].fontWeight};
  line-height: ${tokens.typography['heading-lg-31'].lineHeight};

  @media (min-width: ${breakpoints.tablet}) {
    font-size: ${tokens.typography['heading-xl-76'].fontSize};
    line-height: ${tokens.typography['heading-xl-76'].lineHeight};
  }
`;

const Visual = styled.div`
  min-height: 280px;
  border-radius: ${tokens.radius['radius-16']};
  border: 1px solid var(--color-49);
  background: linear-gradient(145deg, var(--color-33) 0%, var(--color-43) 100%);
  padding: ${tokens.spacing['padding-20']};
  display: grid;
  gap: ${tokens.spacing['gap-12']};
  align-content: start;
`;

const VisualRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${tokens.spacing['gap-8']};
`;

const VisualTile = styled.div`
  min-height: 72px;
  border-radius: ${tokens.radius['radius-8']};
  border: 1px solid var(--color-49);
  background: var(--color-16);
`;

const VisualBar = styled.div`
  height: 10px;
  border-radius: ${tokens.radius['radius-10000']};
  background: var(--color-49);
`;

const steps = [
  {
    id: 'step-1',
    label: 'Step 01',
    heading: 'Browse The Continuously Updated Collection.',
    body: 'Help real estate professionals create content faster with ready-made templates.',
  },
  {
    id: 'step-2',
    label: 'Step 02',
    heading: 'We Personalize It To Your Business And Market.',
    body: 'Click Customize to edit the location, market data, images, or branding.',
  },
  {
    id: 'step-3',
    label: 'Step 03',
    heading: 'Post, Attract, Engage, And Stand Out.',
    body: 'Download your finished content and share it anywhere.',
  },
];

const StepsSection = () => (
  <GridBackdrop>
    <StepsSectionWrap>
      <Container>
        <Title>Stunning Marketing, In Three Simple Steps</Title>
        {steps.map((step, index) => (
          <Step key={step.id}>
            <StepCopy style={index % 2 === 1 ? { order: 2 } : undefined}>
              <StepLabel>{step.label}</StepLabel>
              <StepHeading>{step.heading}</StepHeading>
              <BodyCopy>{step.body}</BodyCopy>
            </StepCopy>
            <Visual style={index % 2 === 1 ? { order: 1 } : undefined} aria-hidden="true">
              <VisualBar style={{ width: '40%' }} />
              <VisualBar style={{ width: '70%' }} />
              <VisualRow>
                <VisualTile />
                <VisualTile />
                <VisualTile />
              </VisualRow>
              <VisualRow>
                <VisualTile />
                <VisualTile />
                <VisualTile />
              </VisualRow>
            </Visual>
          </Step>
        ))}
      </Container>
    </StepsSectionWrap>
  </GridBackdrop>
);

export default StepsSection;
