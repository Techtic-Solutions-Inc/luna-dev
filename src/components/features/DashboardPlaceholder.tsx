import styled from 'styled-components';
import AppShell from '../layout/AppShell';
import { typographyStyle } from '../../theme/typography';

const Copy = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--padding-12);
`;

const Title = styled.h1`
  ${typographyStyle('heading-lg-57')}
  margin: 0;
`;

const Text = styled.p`
  ${typographyStyle('body-sm-37')}
  margin: 0;
  color: var(--color-57);
`;

export default function DashboardPlaceholder() {
  return (
    <AppShell>
      <Copy>
        <Title>Dashboard coming soon</Title>
        <Text>You are signed in. The dashboard overview API is not yet available in the frontend contract.</Text>
      </Copy>
    </AppShell>
  );
}
