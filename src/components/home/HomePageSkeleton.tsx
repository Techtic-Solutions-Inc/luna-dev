import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.8; }
`;

const Placeholder = styled.main`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  animation: ${pulse} 1.4s ease-in-out infinite;
`;

export function HomePageSkeleton() {
  return <Placeholder aria-busy="true" aria-label="Loading visitor home" />;
}
