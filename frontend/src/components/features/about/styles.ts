import styled, { keyframes } from 'styled-components';

export const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

export const SkeletonBlock = styled.div<{
  $height?: string;
  $width?: string;
  $radius?: string;
  $aspect?: string;
}>`
  width: ${({ $width }) => $width ?? '100%'};
  height: ${({ $height, $aspect }) => ($aspect ? 'auto' : ($height ?? '1rem'))};
  aspect-ratio: ${({ $aspect }) => $aspect ?? 'auto'};
  border-radius: ${({ $radius }) => $radius ?? 'var(--radius-6)'};
  background: linear-gradient(
    90deg,
    var(--color-38) 0%,
    var(--color-46) 50%,
    var(--color-38) 100%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.4s ease-in-out infinite;
`;

export const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

export const StatusCard = styled.div<{ $variant: 'error' | 'empty' }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--gap-16);
  padding: var(--padding-24);
  border-radius: var(--radius-10);
  max-width: 40rem;

  ${({ $variant }) =>
    $variant === 'error'
      ? `
        background: var(--color-29);
        border: 1px solid var(--border);
        color: var(--color-53);
      `
      : `
        background: var(--color-38);
        color: var(--text-secondary);
      `}
`;

export const StatusText = styled.p`
  font-family: var(--font-body-sm-2-family);
  font-size: var(--font-body-sm-2-size);
  font-weight: var(--font-body-sm-2-weight);
  line-height: var(--font-body-sm-2-line-height);
`;
