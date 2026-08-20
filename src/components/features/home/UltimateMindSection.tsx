import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { breakpoints } from '../../../theme/breakpoints';
import { tokens } from '../../../theme/tokens';
import { AccentText, BodyCopy, Container, GoldButton, Section, SerifDisplay } from './shared';

const Block = styled(Section)`
  padding-top: 0;
`;

const Panel = styled.div`
  display: grid;
  border-radius: ${tokens.radius['radius-16']};
  overflow: hidden;
  border: 1px solid var(--color-49);

  @media (min-width: ${breakpoints.desktop}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Left = styled.div`
  padding: ${tokens.spacing['padding-32']};
  background: var(--color-67);
  display: grid;
  gap: ${tokens.spacing['gap-16']};
  align-content: start;
`;

const Right = styled.div`
  padding: ${tokens.spacing['padding-32']};
  background: var(--color-43);
  display: grid;
  gap: ${tokens.spacing['gap-24']};
  align-content: center;
`;

const MockPlanner = styled.div`
  min-height: 220px;
  border-radius: ${tokens.radius['radius-12']};
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(0, 0, 0, 0.2);
  padding: ${tokens.spacing['padding-16']};
  display: grid;
  gap: ${tokens.spacing['gap-12']};
`;

const MockLine = styled.div`
  height: 10px;
  border-radius: ${tokens.radius['radius-10000']};
  background: rgba(255, 255, 255, 0.25);
`;

const DealTitle = styled(SerifDisplay)`
  font-size: ${tokens.typography['heading-xl-44'].fontSize};
  line-height: ${tokens.typography['heading-xl-44'].lineHeight};

  @media (min-width: ${breakpoints.tablet}) {
    font-size: ${tokens.typography['heading-xl-53'].fontSize};
    line-height: ${tokens.typography['heading-xl-53'].lineHeight};
  }
`;

const StyledLink = styled(GoldButton)`
  width: fit-content;
  text-decoration: none;
`;

const UltimateMindSection = () => (
  <Block id="ultimate-mind">
    <Container>
      <Panel>
        <Left>
          <SerifDisplay>Agentwise Ultimate Mind</SerifDisplay>
          <BodyCopy>
            Explore Ultimate Mind to plan your week, track goals, and keep your marketing rhythm
            consistent.
          </BodyCopy>
          <MockPlanner aria-hidden="true">
            <MockLine style={{ width: '55%' }} />
            <MockLine style={{ width: '80%' }} />
            <MockLine style={{ width: '65%' }} />
            <MockLine style={{ width: '72%' }} />
          </MockPlanner>
        </Left>
        <Right>
          <DealTitle>
            Here&apos;s The Deal... <AccentText>Great Marketing Is Just The Start.</AccentText>
          </DealTitle>
          <BodyCopy>
            Increase audience engagement through visually appealing social media posts and stay
            ahead with a planner built for agents like you.
          </BodyCopy>
          <StyledLink as={Link} to="/sign-up">
            Learn More
          </StyledLink>
        </Right>
      </Panel>
    </Container>
  </Block>
);

export default UltimateMindSection;
