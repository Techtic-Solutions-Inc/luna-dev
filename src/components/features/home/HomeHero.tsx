import styled from 'styled-components';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok } from 'react-icons/fa6';
import { FiMail } from 'react-icons/fi';
import { SectionContainer, SerifAccent } from './homeStyles';

const HeroSection = styled.section`
  position: relative;
  overflow: hidden;
  padding: ${({ theme }) => `${theme.spacing['padding-40']} 0 ${theme.spacing['padding-40']}`};
  margin-top: -72px;
  padding-top: calc(72px + ${({ theme }) => theme.spacing['padding-60']});
  background-color: ${({ theme }) => theme.colors['color-16']};
  background-image:
    radial-gradient(circle at 85% 17%, ${({ theme }) => theme.colors['color-68']}66 0%, transparent 25%),
    radial-gradient(circle at 2% 95%, ${({ theme }) => theme.colors['color-67']}66 0%, transparent 36%),
    linear-gradient(
      110deg,
      ${({ theme }) => theme.colors['color-43']} 0%,
      ${({ theme }) => theme.colors['color-33']} 52%,
      ${({ theme }) => theme.colors['color-16']} 100%
    );

  &::before {
    content: '';
    position: absolute;
    top: 10%;
    right: 5%;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, ${({ theme }) => theme.colors['color-29']}66 0%, transparent 70%);
    pointer-events: none;
  }
`;

const HeroInner = styled(SectionContainer)`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${({ theme }) => theme.spacing['gap-40']};
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing['gap-24']};
  max-width: 820px;
`;

const HeroTitle = styled.h1`
  font-family: ${({ theme }) => theme.typography['heading-xl-45'].fontFamily};
  font-size: clamp(36px, 5vw, ${({ theme }) => theme.typography['heading-xl-45'].fontSize});
  font-weight: ${({ theme }) => theme.typography['heading-xl-45'].fontWeight};
  line-height: 1.12;
  color: ${({ theme }) => theme.colors.secondary};
`;

const HeroSubtitle = styled.p`
  max-width: 560px;
  font-family: ${({ theme }) => theme.typography['body-21'].fontFamily};
  font-size: ${({ theme }) => theme.typography['body-21'].fontSize};
  line-height: ${({ theme }) => theme.typography['body-55'].lineHeight};
  color: ${({ theme }) => theme.colors['color-61']};
`;

const SocialRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing['gap-12']};
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radius['radius-10000']};
  border: 1px solid ${({ theme }) => theme.colors['color-49']};
  color: ${({ theme }) => theme.colors.secondary};
  transition: border-color 0.15s ease, color 0.15s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const HeroVisual = styled.div`
  position: relative;
  width: 100%;
  max-width: 720px;
  display: flex;
  justify-content: center;
`;

const DashboardMock = styled.div`
  position: relative;
  width: 100%;
  padding: ${({ theme }) => theme.spacing['padding-24']};
  border-radius: ${({ theme }) => theme.radius['radius-16']};
  background: linear-gradient(
    145deg,
    ${({ theme }) => theme.colors['color-41']} 0%,
    ${({ theme }) => theme.colors['color-33']} 100%
  );
  box-shadow: ${({ theme }) => theme.shadows['drop-shadow-20']};
`;

const MockHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: ${({ theme }) => theme.spacing['padding-12']};
  border-bottom: 1px solid ${({ theme }) => theme.colors['color-49']};
`;

const MockGreeting = styled.div`
  font-family: ${({ theme }) => theme.typography['heading-md-10'].fontFamily};
  font-size: ${({ theme }) => theme.typography['heading-md-10'].fontSize};
  color: ${({ theme }) => theme.colors.secondary};
  text-align: left;
`;

const MockSubGreeting = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.typography['body-sm-2'].fontFamily};
  font-size: ${({ theme }) => theme.typography['body-sm-2'].fontSize};
  color: ${({ theme }) => theme.colors['color-61']};
`;

const MockGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing['gap-8']};
  margin-top: ${({ theme }) => theme.spacing['gap-16']};
`;

const MockCard = styled.div`
  height: 64px;
  border-radius: ${({ theme }) => theme.radius['radius-8']};
  background-color: ${({ theme }) => theme.colors['color-49']};
`;

const FloatingCard = styled.div<{
  $top?: string;
  $bottom?: string;
  $left?: string;
  $right?: string;
}>`
  position: absolute;
  top: ${({ $top }) => $top ?? 'auto'};
  bottom: ${({ $bottom }) => $bottom ?? 'auto'};
  left: ${({ $left }) => $left ?? 'auto'};
  right: ${({ $right }) => $right ?? 'auto'};
  padding: ${({ theme }) => `${theme.spacing['padding-12']} ${theme.spacing['padding-16']}`};
  border-radius: ${({ theme }) => theme.radius['radius-10']};
  background-color: ${({ theme }) => theme.colors.secondary};
  box-shadow: ${({ theme }) => theme.shadows['drop-shadow-11']};
  font-family: ${({ theme }) => theme.typography['caption-5'].fontFamily};
  font-size: ${({ theme }) => theme.typography['caption-5'].fontSize};
  font-weight: ${({ theme }) => theme.typography['caption-5'].fontWeight};
  color: ${({ theme }) => theme.colors['color-20']};
  white-space: nowrap;
`;

const UltimateMindBadge = styled(FloatingCard)`
  background-color: ${({ theme }) => theme.colors['color-67']};
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.typography['body-sm-29'].fontFamily};
  font-size: ${({ theme }) => theme.typography['body-sm-2'].fontSize};
`;

const HomeHero = () => (
  <HeroSection aria-labelledby="hero-heading">
    <HeroInner>
      <HeroContent>
        <HeroTitle id="hero-heading">
          Stunning Real Estate Marketing,{' '}
          <SerifAccent>Personalized To Your Market In Minutes</SerifAccent>
        </HeroTitle>
        <HeroSubtitle>
          Help real estate professionals create content faster with ready-made templates.
          Increase audience engagement through visually appealing social media posts.
        </HeroSubtitle>
        <SocialRow aria-label="Social media links">
          <SocialLink href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
            <FaFacebookF size={16} aria-hidden="true" />
          </SocialLink>
          <SocialLink href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={16} aria-hidden="true" />
          </SocialLink>
          <SocialLink href="https://tiktok.com" aria-label="TikTok" target="_blank" rel="noopener noreferrer">
            <FaTiktok size={16} aria-hidden="true" />
          </SocialLink>
          <SocialLink href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn size={16} aria-hidden="true" />
          </SocialLink>
          <SocialLink href="mailto:hello@agentwisemarketing.com" aria-label="Email">
            <FiMail size={16} aria-hidden="true" />
          </SocialLink>
        </SocialRow>
      </HeroContent>

      <HeroVisual>
        <DashboardMock aria-hidden="true">
          <MockHeader>
            <div>
              <MockGreeting>Good morning</MockGreeting>
              <MockSubGreeting>Ava.</MockSubGreeting>
            </div>
            <span style={{ color: '#c8a47e', fontSize: '12px' }}>Agentwise Ultimate Mind</span>
          </MockHeader>
          <MockGrid>
            <MockCard />
            <MockCard />
            <MockCard />
            <MockCard />
            <MockCard />
            <MockCard />
          </MockGrid>
        </DashboardMock>
        <FloatingCard $top="-12px" $right="-12px">
          YOU POSTED 15 TIMES THIS WEEK
        </FloatingCard>
        <UltimateMindBadge $bottom="-16px" $left="-12px">
          Agentwise Ultimate Mind
        </UltimateMindBadge>
      </HeroVisual>
    </HeroInner>
  </HeroSection>
);

export default HomeHero;
