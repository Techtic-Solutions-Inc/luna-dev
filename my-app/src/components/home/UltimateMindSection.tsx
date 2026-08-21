import styled from 'styled-components';
import {
  AccentText,
  BodyText,
  Container,
  MockupImage,
  PrimaryButton,
  Section,
  SerifHeading,
  SkeletonBlock,
} from './shared';
import AppLink from '../ui/AppLink';

const UltimateSection = styled(Section)`
  padding: ${({ theme }) => theme.spacing['padding-60']} 0;
`;

const UltimateCard = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing['gap-48']};
  align-items: center;
  padding: ${({ theme }) => theme.spacing['padding-50']};
  border-radius: ${({ theme }) => theme.borderRadius['radius-24']};
  background: ${({ theme }) => theme.shadows['gradient-10']};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
    padding: ${({ theme }) => theme.spacing['padding-32']};
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing['gap-24']};
`;

const Title = styled(SerifHeading)`
  font-size: clamp(28px, 3.5vw, 36px);
  line-height: 1.3;
  color: ${({ theme }) => theme.colors.accent};
`;

const MindLabel = styled.p`
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  font-size: 14px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
  margin: 0;
`;

const LinkRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing['gap-24']};
  align-items: center;
`;

interface UltimateMindProps {
  isLoading?: boolean;
}

const UltimateMind = ({ isLoading = false }: UltimateMindProps) => (
  <UltimateSection id="about" aria-labelledby="ultimate-heading">
    <Container>
      {isLoading ? (
        <SkeletonBlock $height="480px" />
      ) : (
        <UltimateCard>
          <MockupImage
            src="/assets/figma/ultimate-mind-mockup.png"
            alt="Agentwise Ultimate Mind dashboard interface"
          />
          <Content>
            <MindLabel>Agentwise Ultimate Mind</MindLabel>
            <Title id="ultimate-heading">
              Here&apos;s The Deal… <AccentText>Great Marketing Is Just The Start.</AccentText>
            </Title>
            <BodyText>
              Market identification is just the beginning. Agentwise Ultimate Mind helps you
              understand your audience, refine your messaging, and scale content that converts.
              Mobile App Development tools and AI-powered insights keep you ahead of the market.
            </BodyText>
            <LinkRow>
              <PrimaryButton type="button" aria-label="Learn more about Agentwise Ultimate Mind">
                Learn More
              </PrimaryButton>
              <AppLink to="#about" variant="primary">
                Explore Ultimate Mind
              </AppLink>
            </LinkRow>
          </Content>
        </UltimateCard>
      )}
    </Container>
  </UltimateSection>
);

export default UltimateMind;
