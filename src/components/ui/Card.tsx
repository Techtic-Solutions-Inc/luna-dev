import styled from 'styled-components';
import { tokens } from '../../theme/tokens';

const Card = styled.section`
  background: var(--secondary);
  border: 1px solid var(--color-42);
  border-radius: ${tokens.radius['radius-10']};
  padding: ${tokens.spacing['padding-20']};
  box-shadow: ${tokens.shadows['drop-shadow-11'].css};
`;

export default Card;
