import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const Ring = styled.div<{ $size: number }>`
  display: inline-block;
  width: ${(p) => p.$size}px;
  height: ${(p) => p.$size}px;
  border: ${(p) => Math.max(2, Math.round(p.$size / 10))}px solid rgba(255, 255, 255, 0.3);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

const Wrapper = styled.div<{ $inline: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${(p) => (p.$inline ? '0' : '24px')};
`;

interface SpinnerProps {
  size?: number;
  inline?: boolean;
}

export default function Spinner({ size = 32, inline = false }: SpinnerProps) {
  return (
    <Wrapper $inline={inline}>
      <Ring $size={size} role="status" aria-label="Loading" />
    </Wrapper>
  );
}
