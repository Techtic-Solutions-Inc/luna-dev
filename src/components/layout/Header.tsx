import styled from 'styled-components';
import { tokens } from '../../theme/tokens';

const Bar = styled.header`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  min-height: 56px;
  padding: 0 ${tokens.spacing['padding-20']};
  background: var(--color-16);
  color: var(--secondary);
`;

const Title = styled.p`
  margin: 0;
  font-family: ${tokens.typography['heading-lg-31'].fontFamily}, serif;
  font-size: ${tokens.typography['heading-md-20'].fontSize};
  font-weight: ${tokens.typography['heading-lg-31'].fontWeight};
  line-height: ${tokens.typography['heading-md-20'].lineHeight};
`;

const Header = () => (
  <Bar>
    <Title>Agentwise</Title>
  </Bar>
);

export default Header;
