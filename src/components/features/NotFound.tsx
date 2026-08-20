import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { colors, spacing } from '../../theme/tokens';
import { typographyStyle } from '../../theme/typography';

const Page = styled.main`
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: ${spacing.padding40};
  background: ${colors.color16};
  color: ${colors.secondary};
  text-align: center;
`;

const Title = styled.h1`
  margin: 0 0 ${spacing.gap12};
  ${typographyStyle('headingXl44')}
`;

const Body = styled.p`
  margin: 0 0 ${spacing.gap24};
  ${typographyStyle('body')}
  color: ${colors.color93};
`;

const HomeLink = styled(Link)`
  color: ${colors.accent};
`;

export default function NotFound() {
  return (
    <Page>
      <div>
        <Title>Page not found</Title>
        <Body>The page you requested does not exist.</Body>
        <HomeLink to="/">Return home</HomeLink>
      </div>
    </Page>
  );
}
