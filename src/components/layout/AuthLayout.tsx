import styled from 'styled-components';
import { breakpoints } from '../../theme/breakpoints';
import { tokens } from '../../theme/tokens';

export const AuthShell = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  background: var(--color-16);

  @media (min-width: ${breakpoints.desktop}) {
    grid-template-columns: minmax(420px, 1.15fr) minmax(380px, 0.95fr);
  }
`;

export const AuthPane = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${tokens.spacing['padding-24']};
  background: radial-gradient(
    ellipse at 50% 42%,
    var(--color-50) 0%,
    var(--color-20) 42%,
    var(--color-16) 78%
  );
`;

export const AuthFormCard = styled.div`
  width: min(100%, 440px);
  text-align: center;
`;

export const AuthLogo = styled.p`
  margin: 0;
  color: var(--secondary);
  font-family: ${tokens.typography['heading-lg-108'].fontFamily}, cursive;
  font-size: ${tokens.typography['heading-lg-108'].fontSize};
  font-weight: ${tokens.typography['heading-lg-108'].fontWeight};
  line-height: ${tokens.typography['heading-lg-108'].lineHeight};
`;

export const AuthTagline = styled.p`
  margin: ${tokens.spacing['gap-4']} 0 0;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--secondary);
  font-family: ${tokens.typography['caption-4'].fontFamily}, sans-serif;
  font-size: ${tokens.typography['caption-4'].fontSize};
  font-weight: ${tokens.typography['caption-5'].fontWeight};
  line-height: ${tokens.typography['caption-4'].lineHeight};
`;
