import styled from 'styled-components';

export const Page = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors['color-16']};
  color: ${({ theme }) => theme.colors.secondary};
  overflow-x: hidden;
`;

export const Container = styled.div`
  width: min(100%, 1200px);
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing['padding-24']};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0 ${({ theme }) => theme.spacing['padding-16']};
  }
`;

export const WideContainer = styled.div`
  width: min(100%, 1400px);
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing['padding-24']};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0 ${({ theme }) => theme.spacing['padding-16']};
  }
`;

export const Section = styled.section`
  padding: ${({ theme }) => theme.spacing['padding-60']} 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing['padding-40']} 0;
  }
`;

export const SerifHeading = styled.h2`
  font-family: ${({ theme }) => theme.typography.heading};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.secondary};
  margin: 0;
`;

export const AccentText = styled.span`
  color: ${({ theme }) => theme.colors.accent};
`;

export const BodyText = styled.p`
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  font-size: 16px;
  line-height: 28px;
  color: ${({ theme }) => theme.colors['color-96']};
  margin: 0;
`;

export const PrimaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing['padding-14']}
    ${({ theme }) => theme.spacing['padding-32']};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius['radius-100']};
  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors['color-16']};
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.secondary};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const OutlineButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing['padding-14']}
    ${({ theme }) => theme.spacing['padding-32']};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius['radius-100']};
  background: transparent;
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const StatusBanner = styled.p<{ $variant: 'success' | 'error' }>`
  padding: ${({ theme }) => theme.spacing['padding-12']}
    ${({ theme }) => theme.spacing['padding-16']};
  border-radius: ${({ theme }) => theme.borderRadius['radius-8']};
  font-size: 14px;
  line-height: 22px;
  background-color: ${({ theme, $variant }) =>
    $variant === 'success' ? theme.colors['color-50'] : theme.colors['color-98']}22;
  color: ${({ theme, $variant }) =>
    $variant === 'success' ? theme.colors['color-17'] : theme.colors['color-98']};
`;

export const SkeletonBlock = styled.div<{ $height?: string; $width?: string }>`
  width: ${({ $width }) => $width ?? '100%'};
  height: ${({ $height }) => $height ?? '20px'};
  border-radius: ${({ theme }) => theme.borderRadius['radius-8']};
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors['color-26']} 25%,
    ${({ theme }) => theme.colors['color-63']} 50%,
    ${({ theme }) => theme.colors['color-26']} 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;

  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

export const MockupImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  border-radius: ${({ theme }) => theme.borderRadius['radius-16']};
`;
