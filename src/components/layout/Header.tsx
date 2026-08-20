import styled from 'styled-components';
import { typographyStyle } from '../../theme/typography';

const Bar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--padding-16) var(--padding-24);
  background: var(--color-69);
  color: var(--secondary);
  border-bottom: 1px solid var(--color-44);
`;

const Brand = styled.div`
  ${typographyStyle('heading-lg-47')}
  color: var(--secondary);
`;

export default function Header() {
  return (
    <Bar>
      <Brand>Agentwise</Brand>
    </Bar>
  );
}
