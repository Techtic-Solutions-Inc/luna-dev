import styled from 'styled-components';
import { tokens } from '../../theme/tokens';

const Input = styled.input`
  width: 100%;
  min-height: 44px;
  padding: ${tokens.spacing['padding-10']} ${tokens.spacing['padding-12']};
  border: 1px solid var(--color-18);
  border-radius: ${tokens.radius['radius-6']};
  background: var(--secondary);
  color: var(--text-primary);
`;

export default Input;
