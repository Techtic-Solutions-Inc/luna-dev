import styled from 'styled-components';
import Button from '../../ui/Button';
import { SectionContainer, SerifAccent } from './homeStyles';

const PromoSection = styled.section`
  padding: ${({ theme }) => `${theme.spacing['padding-60']} 0`};
  background-color: ${({ theme }) => theme.colors['color-16']};
`;

const PromoCard = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing['gap-40']};
  padding: ${({ theme }) => theme.spacing['padding-40']};
  border-radius: ${({ theme }) => theme.radius['radius-24']};
  background-color: ${({ theme }) => theme.colors['color-67']};
  overflow: hidden;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr 1fr;
    padding: ${({ theme }) => theme.spacing['padding-60']};
    gap: ${({ theme }) => theme.spacing['gap-60']};
  }
`;

const PromoVisual = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing['gap-24']};
`;

const UltimateMindLogo = styled.h3`
  font-family: ${({ theme }) => theme.typography['heading-lg-31'].fontFamily};
  font-size: ${({ theme }) => theme.typography['heading-lg-31'].fontSize};
  font-weight: ${({ theme }) => theme.typography['heading-lg-31'].fontWeight};
  color: ${({ theme }) => theme.colors.secondary};
`;

const DashboardPreview = styled.div`
  padding: ${({ theme }) => theme.spacing['padding-20']};
  border-radius: ${({ theme }) => theme.radius['radius-16']};
  background-color: ${({ theme }) => theme.colors.secondary};
  box-shadow: ${({ theme }) => theme.shadows['drop-shadow-20']};
`;

const PreviewRow = styled.div`
  height: 12px;
  border-radius: ${({ theme }) => theme.radius['radius-4']};
  background-color: ${({ theme }) => theme.colors['color-40']};
  margin-bottom: ${({ theme }) => theme.spacing['gap-12']};

  &:nth-child(2) {
    width: 70%;
  }

  &:nth-child(3) {
    height: 80px;
  }
`;

const PromoContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing['gap-24']};
`;

const PromoTitle = styled.h2`
  font-family: ${({ theme }) => theme.typography['heading-xl-46'].fontFamily};
  font-size: clamp(28px, 4vw, ${({ theme }) => theme.typography['heading-xl-46'].fontSize});
  font-weight: ${({ theme }) => theme.typography['heading-xl-46'].fontWeight};
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.secondary};
`;

const PromoText = styled.p`
  font-family: ${({ theme }) => theme.typography['body-21'].fontFamily};
  font-size: ${({ theme }) => theme.typography['body-21'].fontSize};
  line-height: ${({ theme }) => theme.typography['body-55'].lineHeight};
  color: ${({ theme }) => theme.colors['color-54']};
`;

const HomeUltimateMind = () => (
  <PromoSection aria-labelledby="ultimate-mind-heading">
    <SectionContainer>
      <PromoCard>
        <PromoVisual>
          <UltimateMindLogo>Agentwise Ultimate Mind</UltimateMindLogo>
          <DashboardPreview aria-hidden="true">
            <PreviewRow />
            <PreviewRow />
            <PreviewRow />
          </DashboardPreview>
        </PromoVisual>
        <PromoContent>
          <PromoTitle id="ultimate-mind-heading">
            Here&apos;s The Deal… <SerifAccent>Great Marketing Is Just The Start.</SerifAccent>
          </PromoTitle>
          <PromoText>
            Explore Ultimate Mind to personalize content for your market. Click Customize to
            edit the location, market data, images, or branding.
          </PromoText>
          <div>
            <Button variant="primary" size="md">
              Learn More
            </Button>
          </div>
        </PromoContent>
      </PromoCard>
    </SectionContainer>
  </PromoSection>
);

export default HomeUltimateMind;
