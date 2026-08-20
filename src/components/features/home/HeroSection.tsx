import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { breakpoints } from '../../../theme/breakpoints';
import { tokens } from '../../../theme/tokens';
import { AccentText, BodyCopy, Container, GoldButton, Section, SerifDisplay } from './shared';

const HeroSectionWrap = styled(Section)`
  padding-top: ${tokens.spacing['padding-32']};
  background:
    radial-gradient(ellipse at 80% 20%, rgba(200, 164, 126, 0.12) 0%, transparent 55%),
    radial-gradient(ellipse at 20% 0%, rgba(108, 80, 130, 0.18) 0%, transparent 45%),
    var(--color-16);
`;

const Grid = styled.div`
  display: grid;
  gap: ${tokens.spacing['gap-32']};
  align-items: center;

  @media (min-width: ${breakpoints.desktop}) {
    grid-template-columns: 1fr 1.1fr;
    gap: ${tokens.spacing['gap-48']};
  }
`;

const CopyBlock = styled.div`
  display: grid;
  gap: ${tokens.spacing['gap-24']};
`;

const HeroTitle = styled(SerifDisplay)`
  font-size: ${tokens.typography['heading-xl-44'].fontSize};
  line-height: ${tokens.typography['heading-xl-44'].lineHeight};

  @media (min-width: ${breakpoints.tablet}) {
    font-size: ${tokens.typography['heading-xl-53'].fontSize};
    line-height: ${tokens.typography['heading-xl-53'].lineHeight};
  }

  @media (min-width: ${breakpoints.desktop}) {
    font-size: ${tokens.typography['heading-xl-89'].fontSize};
    line-height: ${tokens.typography['heading-xl-89'].lineHeight};
  }
`;

const SocialRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${tokens.spacing['gap-12']};
`;

const SocialChip = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 36px;
  padding: 0 ${tokens.spacing['padding-12']};
  border-radius: ${tokens.radius['radius-10000']};
  border: 1px solid var(--color-49);
  color: var(--color-14);
  font-family: ${tokens.typography['caption-4'].fontFamily}, sans-serif;
  font-size: ${tokens.typography['caption-4'].fontSize};
  line-height: ${tokens.typography['caption-4'].lineHeight};
`;

const PreviewWrap = styled.div`
  position: relative;
  padding: ${tokens.spacing['padding-16']};
  border-radius: ${tokens.radius['radius-16']};
  border: 1px solid var(--color-49);
  background: linear-gradient(145deg, var(--color-33) 0%, var(--color-20) 100%);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
`;

const PreviewFrame = styled.div`
  display: grid;
  grid-template-columns: 72px 1fr;
  min-height: 360px;
  border-radius: ${tokens.radius['radius-12']};
  overflow: hidden;
  background: var(--color-16);
  border: 1px solid var(--color-49);

  @media (min-width: ${breakpoints.tablet}) {
    min-height: 420px;
  }
`;

const PreviewSidebar = styled.aside`
  padding: ${tokens.spacing['padding-16']} ${tokens.spacing['padding-12']};
  background: var(--color-33);
  border-right: 1px solid var(--color-49);
  display: grid;
  gap: ${tokens.spacing['gap-12']};
  align-content: start;
`;

const SidebarItem = styled.span<{ $active?: boolean }>`
  display: block;
  padding: ${tokens.spacing['padding-8']} ${tokens.spacing['padding-10']};
  border-radius: ${tokens.radius['radius-6']};
  background: ${({ $active }) => ($active ? 'var(--color-49)' : 'transparent')};
  color: ${({ $active }) => ($active ? 'var(--secondary)' : 'var(--color-57)')};
  font-family: ${tokens.typography['caption-4'].fontFamily}, sans-serif;
  font-size: ${tokens.typography['caption-4'].fontSize};
  line-height: ${tokens.typography['caption-4'].lineHeight};
`;

const PreviewMain = styled.div`
  padding: ${tokens.spacing['padding-20']};
  display: grid;
  gap: ${tokens.spacing['gap-16']};
  align-content: start;
`;

const Greeting = styled.p`
  margin: 0;
  color: var(--color-57);
  font-family: ${tokens.typography['caption-4'].fontFamily}, sans-serif;
  font-size: ${tokens.typography['caption-4'].fontSize};
  line-height: ${tokens.typography['caption-4'].lineHeight};
`;

const Name = styled.h3`
  margin: 0;
  color: var(--secondary);
  font-family: ${tokens.typography['heading-lg-74'].fontFamily}, serif;
  font-size: ${tokens.typography['heading-lg-74'].fontSize};
  font-weight: ${tokens.typography['heading-lg-74'].fontWeight};
  line-height: ${tokens.typography['heading-lg-74'].lineHeight};
`;

const MiniCards = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${tokens.spacing['gap-12']};
`;

const MiniCard = styled.div`
  min-height: 88px;
  border-radius: ${tokens.radius['radius-8']};
  border: 1px solid var(--color-49);
  background: linear-gradient(135deg, var(--color-67) 0%, var(--color-33) 100%);
`;

const FloatingBadge = styled.div`
  position: absolute;
  right: ${tokens.spacing['padding-12']};
  bottom: ${tokens.spacing['padding-24']};
  padding: ${tokens.spacing['padding-12']} ${tokens.spacing['padding-16']};
  border-radius: ${tokens.radius['radius-8']};
  border: 1px solid var(--color-49);
  background: rgba(15, 15, 15, 0.92);
  color: var(--secondary);
  font-family: ${tokens.typography['caption-4'].fontFamily}, sans-serif;
  font-size: ${tokens.typography['caption-4'].fontSize};
  line-height: ${tokens.typography['caption-4'].lineHeight};
`;

const CtaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${tokens.spacing['gap-12']};
  align-items: center;
`;

const StyledGoldLink = styled(GoldButton)`
  text-decoration: none;
`;

const HeroSection = () => (
  <HeroSectionWrap id="about">
    <Container>
      <Grid>
        <CopyBlock>
          <HeroTitle>
            <AccentText>Stunning Real Estate Marketing,</AccentText> Personalized To Your Market In
            Minutes.
          </HeroTitle>
          <BodyCopy>
            Help real estate professionals create content faster with ready-made templates. Increase
            audience engagement through visually appealing social media posts. Download your
            finished content and share it anywhere.
          </BodyCopy>
          <SocialRow aria-label="Social platforms">
            <SocialChip>Facebook</SocialChip>
            <SocialChip>Instagram</SocialChip>
            <SocialChip>TikTok</SocialChip>
            <SocialChip>LinkedIn</SocialChip>
            <SocialChip>Twitter</SocialChip>
          </SocialRow>
          <CtaRow>
            <StyledGoldLink as={Link} to="/sign-up">
              Get Started
            </StyledGoldLink>
            <BodyCopy>Join 10,000+ other agents on Agentwise</BodyCopy>
          </CtaRow>
        </CopyBlock>

        <PreviewWrap aria-hidden="true">
          <PreviewFrame>
            <PreviewSidebar>
              <SidebarItem $active>Overview</SidebarItem>
              <SidebarItem>Content Library</SidebarItem>
              <SidebarItem>Content Calendar</SidebarItem>
              <SidebarItem $active>Ultimate Mind</SidebarItem>
            </PreviewSidebar>
            <PreviewMain>
              <Greeting>Good morning</Greeting>
              <Name>Ava.</Name>
              <BodyCopy>
                Browse the continuously updated collection tailored to your market.
              </BodyCopy>
              <MiniCards>
                <MiniCard />
                <MiniCard />
                <MiniCard />
                <MiniCard />
              </MiniCards>
            </PreviewMain>
          </PreviewFrame>
          <FloatingBadge>Success Score · Ultimate Mind</FloatingBadge>
        </PreviewWrap>
      </Grid>
    </Container>
  </HeroSectionWrap>
);

export default HeroSection;
