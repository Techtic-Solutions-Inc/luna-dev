import { type HTMLAttributes, type ReactNode } from 'react';
import styled from 'styled-components';

interface CardProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  as?: 'div' | 'section' | 'article';
}

const StyledCard = styled.section`
  background: var(--secondary);
  border: 1px solid var(--color-38);
  border-radius: var(--radius-10);
  padding: var(--padding-24);
  box-shadow: var(--drop-shadow-40);
`;

const Card = ({ children, as = 'section', ...rest }: CardProps) => (
  <StyledCard as={as} {...rest}>
    {children}
  </StyledCard>
);

export default Card;
