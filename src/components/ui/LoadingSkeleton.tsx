import styled, { keyframes } from 'styled-components';

interface LoadingSkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
}

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const Skeleton = styled.div<{
  $width: string;
  $height: string;
  $borderRadius: string;
}>`
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  border-radius: ${({ $borderRadius }) => $borderRadius};
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors['color-41']} 25%,
    ${({ theme }) => theme.colors['color-49']} 50%,
    ${({ theme }) => theme.colors['color-41']} 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.4s ease-in-out infinite;
`;

const LoadingSkeleton = ({
  width = '100%',
  height = '16px',
  borderRadius,
}: LoadingSkeletonProps) => (
  <Skeleton
    $width={width}
    $height={height}
    $borderRadius={borderRadius ?? '4px'}
    aria-hidden="true"
  />
);

export default LoadingSkeleton;
