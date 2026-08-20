import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AppShell from '../layout/AppShell';
import Card from '../ui/Card';
import { tokens } from '../../theme/tokens';

const Heading = styled.h1`
  margin: 0 0 ${tokens.spacing['gap-16']};
  font-family: ${tokens.typography['heading-lg-31'].fontFamily}, serif;
  font-size: ${tokens.typography['heading-lg-31'].fontSize};
  font-weight: ${tokens.typography['heading-lg-31'].fontWeight};
  line-height: ${tokens.typography['heading-lg-31'].lineHeight};
  color: var(--color-16);
`;

const Copy = styled.p`
  margin: 0 0 ${tokens.spacing['gap-16']};
  font-family: ${tokens.typography.body.fontFamily}, sans-serif;
  font-size: ${tokens.typography.body.fontSize};
  color: var(--text-secondary);
`;

const HomeLink = styled(Link)`
  color: var(--accent);
`;

const NotFound = () => (
  <AppShell>
    <Card>
      <Heading>Page not found</Heading>
      <Copy>The page you requested is not available.</Copy>
      <HomeLink to="/">Return home</HomeLink>
    </Card>
  </AppShell>
);

export default NotFound;
