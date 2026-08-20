import styled from 'styled-components';
import { tokens } from '../../theme/tokens';
import Input from './Input';

const AuthInput = styled(Input)`
  min-height: 52px;
  padding: ${tokens.spacing['padding-14']} ${tokens.spacing['padding-20']};
  border-radius: ${tokens.radius['radius-10000']};
  border: 1px solid var(--color-63);
  background: var(--color-71);
  color: var(--secondary);

  &::placeholder {
    color: var(--color-93);
  }
`;

export const AuthPasswordInput = styled(AuthInput)`
  padding-right: ${tokens.spacing['padding-50']};
`;

export const AuthDarkInput = styled(AuthInput)`
  border-radius: ${tokens.radius['radius-8']};
  background: var(--color-33);
  border-color: var(--color-49);
`;

export const AuthInputMutedPlaceholder = styled(AuthInput)`
  &::placeholder {
    color: var(--color-57);
  }
`;

export default AuthInput;
