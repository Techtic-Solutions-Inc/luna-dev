import styled from 'styled-components';

const StyledHeader = styled.header`
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 24px;
  background: var(--secondary);
  border-bottom: 1px solid var(--color-42);
`;

const Brand = styled.span`
  font-family: 'EB Garamond', serif;
  font-size: 24px;
  font-weight: 600;
  color: var(--text-primary);
`;

export default function Header() {
  return (
    <StyledHeader>
      <Brand>Agentwise</Brand>
    </StyledHeader>
  );
}
