import styled from 'styled-components';
import Button from '../../ui/Button';
import { breakpoints } from '../../../theme/breakpoints';
import { tokens } from '../../../theme/tokens';

export const Page = styled.div`
  min-height: 100vh;
  background: var(--color-16);
  color: var(--secondary);
`;

export const Container = styled.div`
  width: min(100%, 1200px);
  margin: 0 auto;
  padding: 0 ${tokens.spacing['padding-16']};

  @media (min-width: ${breakpoints.tablet}) {
    padding: 0 ${tokens.spacing['padding-24']};
  }
`;

export const WideContainer = styled.div`
  width: min(100%, 1320px);
  margin: 0 auto;
  padding: 0 ${tokens.spacing['padding-16']};

  @media (min-width: ${breakpoints.tablet}) {
    padding: 0 ${tokens.spacing['padding-32']};
  }
`;

export const HeroDisplay = styled.h1`
  margin: 0;
  font-family: ${tokens.typography['heading-xl-89'].fontFamily}, serif;
  font-size: ${tokens.typography['heading-lg-31'].fontSize};
  font-weight: ${tokens.typography['heading-xl-89'].fontWeight};
  line-height: ${tokens.typography['heading-lg-31'].lineHeight};

  @media (min-width: ${breakpoints.tablet}) {
    font-size: ${tokens.typography['heading-xl-53'].fontSize};
    line-height: ${tokens.typography['heading-xl-53'].lineHeight};
  }

  @media (min-width: ${breakpoints.desktop}) {
    font-size: ${tokens.typography['heading-xl-89'].fontSize};
    line-height: ${tokens.typography['heading-xl-89'].lineHeight};
  }
`;

export const SerifDisplay = styled.h2`
  margin: 0;
  font-family: ${tokens.typography['heading-xl-89'].fontFamily}, serif;
  font-size: ${tokens.typography['heading-lg-31'].fontSize};
  font-weight: ${tokens.typography['heading-xl-89'].fontWeight};
  line-height: ${tokens.typography['heading-lg-31'].lineHeight};

  @media (min-width: ${breakpoints.tablet}) {
    font-size: ${tokens.typography['heading-xl-53'].fontSize};
    line-height: ${tokens.typography['heading-xl-53'].lineHeight};
  }

  @media (min-width: ${breakpoints.desktop}) {
    font-size: ${tokens.typography['heading-xl-89'].fontSize};
    line-height: ${tokens.typography['heading-xl-89'].lineHeight};
  }
`;

export const AccentText = styled.span`
  color: var(--accent);
`;

export const BodyCopy = styled.p`
  margin: 0;
  color: var(--color-14);
  font-family: ${tokens.typography['body-sm-38'].fontFamily}, sans-serif;
  font-size: ${tokens.typography['body-sm-38'].fontSize};
  font-weight: ${tokens.typography['body-sm-38'].fontWeight};
  line-height: ${tokens.typography['body-3'].lineHeight};
`;

export const GoldButton = styled(Button).attrs({ variant: 'gold' as const })``;

export const GhostButton = styled(Button).attrs({ variant: 'ghost' as const })``;

export const Section = styled.section`
  padding: ${tokens.spacing['padding-50']} 0;

  @media (min-width: ${breakpoints.desktop}) {
    padding: ${tokens.spacing['gap-48']} 0;
  }
`;

export const GridBackdrop = styled.div`
  background-color: var(--color-16);
  background-image:
    linear-gradient(var(--color-49) 1px, transparent 1px),
    linear-gradient(90deg, var(--color-49) 1px, transparent 1px);
  background-size: 48px 48px;
`;

export const VisuallyHidden = styled.label`
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

export const ErrorText = styled.p`
  margin: 0 0 ${tokens.spacing['gap-12']};
  color: var(--color-45);
  font-family: ${tokens.typography['caption-4'].fontFamily}, sans-serif;
  font-size: ${tokens.typography['caption-4'].fontSize};
  line-height: ${tokens.typography['caption-4'].lineHeight};
`;

export const SuccessText = styled.p`
  margin: 0 0 ${tokens.spacing['gap-16']};
  color: var(--color-17);
  font-family: ${tokens.typography['body-sm-38'].fontFamily}, sans-serif;
  font-size: ${tokens.typography['body-sm-38'].fontSize};
  line-height: ${tokens.typography['body-3'].lineHeight};
`;

export const Skeleton = styled.div`
  min-height: 52px;
  border-radius: ${tokens.radius['radius-10000']};
  background: var(--color-22);
  animation: pulse 1.4s ease-in-out infinite;

  @keyframes pulse {
    0%,
    100% {
      opacity: 0.45;
    }
    50% {
      opacity: 0.85;
    }
  }
`;
