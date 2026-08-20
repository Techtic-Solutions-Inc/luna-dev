import styled from 'styled-components';

export const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors['color-16']};
  color: ${({ theme }) => theme.colors.secondary};
`;

export const SectionContainer = styled.div<{ $light?: boolean }>`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing['padding-24']};

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 0 ${({ theme }) => theme.spacing['padding-40']};
  }
`;

export const SectionHeading = styled.h2<{ $light?: boolean }>`
  font-family: ${({ theme }) => theme.typography['heading-xl-45'].fontFamily};
  font-size: clamp(32px, 5vw, ${({ theme }) => theme.typography['heading-xl-45'].fontSize});
  font-weight: ${({ theme }) => theme.typography['heading-xl-45'].fontWeight};
  line-height: 1.2;
  color: ${({ theme, $light }) => ($light ? theme.colors['color-20'] : theme.colors.secondary)};
  text-align: center;
`;

export const SectionSubheading = styled.p<{ $light?: boolean }>`
  max-width: 640px;
  margin: ${({ theme }) => theme.spacing['gap-16']} auto 0;
  font-family: ${({ theme }) => theme.typography['body-21'].fontFamily};
  font-size: ${({ theme }) => theme.typography['body-21'].fontSize};
  line-height: ${({ theme }) => theme.typography['body-21'].lineHeight};
  color: ${({ theme, $light }) => ($light ? theme.colors.textSecondary : theme.colors['color-61'])};
  text-align: center;
`;

export const SerifAccent = styled.span`
  color: ${({ theme }) => theme.colors.accent};
  font-style: italic;
`;

export const StepLabel = styled.span`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing['gap-12']};
  font-family: ${({ theme }) => theme.typography['body-sm-2'].fontFamily};
  font-size: ${({ theme }) => theme.typography['body-sm-2'].fontSize};
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
`;

export const FeatureTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography['heading-xl-46'].fontFamily};
  font-size: clamp(24px, 3.5vw, ${({ theme }) => theme.typography['heading-xl-46'].fontSize});
  font-weight: ${({ theme }) => theme.typography['heading-xl-46'].fontWeight};
  line-height: 1.25;
  color: ${({ theme }) => theme.colors.secondary};
`;

export const FeatureDescription = styled.p`
  margin-top: ${({ theme }) => theme.spacing['gap-16']};
  font-family: ${({ theme }) => theme.typography['body-21'].fontFamily};
  font-size: ${({ theme }) => theme.typography['body-21'].fontSize};
  line-height: ${({ theme }) => theme.typography['body-55'].lineHeight};
  color: ${({ theme }) => theme.colors['color-61']};
`;
