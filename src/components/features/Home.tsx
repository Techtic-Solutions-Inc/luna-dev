import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { colors, spacing } from '../../theme/tokens';
import { typographyStyle } from '../../theme/typography';
import ButtonLink from '../ui/ButtonLink';

const Page = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${spacing.gap24};
  padding: ${spacing.padding40} ${spacing.padding24};
  background: ${colors.color32};
  text-align: center;
`;

const Brand = styled.p`
  margin: 0;
  color: ${colors.color16};
  ${typographyStyle('headingLg108')}
`;

const Title = styled.h1`
  margin: 0;
  color: ${colors.color16};
  ${typographyStyle('headingXl44')}
`;

const Copy = styled.p`
  margin: 0;
  max-width: ${spacing.gap465};
  color: ${colors.color60};
  ${typographyStyle('bodySm38')}

  a {
    color: ${colors.accent};
  }
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.gap12};
  justify-content: center;
`;

/**
 * Thin visitor Home placeholder (JAW-9137 blocked until subscribe/search/terms
 * endpoints ship). Not production marketing content — no mock testimonials or forms.
 */
export default function Home() {
  return (
    <Page>
      <Brand>Agentwise</Brand>
      <Title>Visitor home coming soon</Title>
      <Copy>
        Public homepage content stays unavailable until visitor API contracts are executed. Use
        sign-in to access an authenticated session.
      </Copy>
      <Actions>
        <ButtonLink to="/login" variant="accent">
          Sign In
        </ButtonLink>
        <ButtonLink to="/signup" variant="primary">
          Sign Up
        </ButtonLink>
      </Actions>
      <Copy>
        <Link to="/forgot-password">Forgot password</Link>
      </Copy>
    </Page>
  );
}
