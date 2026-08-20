import styled from 'styled-components';
import { tokens } from '../../theme/tokens';

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: ${tokens.spacing['padding-10']} ${tokens.spacing['padding-20']};
  border: 0;
  border-radius: ${tokens.radius['radius-6']};
  background: var(--accent);
  color: var(--color-16);
  cursor: pointer;
  font-family: ${tokens.typography['body-sm-29'].fontFamily}, sans-serif;
  font-size: ${tokens.typography['body-sm-29'].fontSize};
  font-weight: ${tokens.typography['body-sm-29'].fontWeight};
  line-height: ${tokens.typography['body-sm-29'].lineHeight};

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default Button;
