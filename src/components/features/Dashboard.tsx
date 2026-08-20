import { FiHome } from 'react-icons/fi';
import styled from 'styled-components';
import AppShell from '../layout/AppShell';
import Card from '../ui/Card';
import { tokens } from '../../theme/tokens';

const Heading = styled.h1`
  display: flex;
  align-items: center;
  gap: ${tokens.spacing['gap-8']};
  margin: 0 0 ${tokens.spacing['gap-16']};
  font-family: ${tokens.typography['heading-lg-31'].fontFamily}, serif;
  font-size: ${tokens.typography['heading-lg-31'].fontSize};
  font-weight: ${tokens.typography['heading-lg-31'].fontWeight};
  line-height: ${tokens.typography['heading-lg-31'].lineHeight};
  color: var(--color-16);
`;

const Copy = styled.p`
  margin: 0;
  font-family: ${tokens.typography.body.fontFamily}, sans-serif;
  font-size: ${tokens.typography.body.fontSize};
  font-weight: ${tokens.typography.body.fontWeight};
  line-height: ${tokens.typography['body-21'].lineHeight};
  color: var(--text-secondary);
`;

const Dashboard = () => (
  <AppShell>
    <Card>
      <Heading>
        <FiHome aria-hidden="true" />
        Dashboard
      </Heading>
      <Copy>Welcome back to your Agentwise workspace.</Copy>
    </Card>
  </AppShell>
);

export default Dashboard;
