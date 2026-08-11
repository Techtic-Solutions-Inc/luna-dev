import { type ReactNode } from 'react';
import styled from 'styled-components';

interface HeaderProps {
  title: string;
  children?: ReactNode;
}

const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  gap: var(--gap-8);
  padding: var(--padding-32) 0;

  @media (max-width: 768px) {
    padding: var(--padding-24) 0;
  }
`;

const Title = styled.h1`
  font-family: var(--font-heading-xl-31-family);
  font-size: var(--font-heading-xl-31-size);
  font-weight: var(--font-heading-xl-31-weight);
  line-height: var(--font-heading-xl-31-line-height);
  color: var(--secondary);

  @media (max-width: 768px) {
    font-family: var(--font-heading-lg-28-family);
    font-size: var(--font-heading-lg-28-size);
    font-weight: var(--font-heading-lg-28-weight);
    line-height: var(--font-heading-lg-28-line-height);
  }
`;

const Header = ({ title, children }: HeaderProps) => (
  <StyledHeader>
    <Title id="blog-page-title">{title}</Title>
    {children}
  </StyledHeader>
);

export default Header;
