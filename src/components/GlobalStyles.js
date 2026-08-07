import { createGlobalStyle } from 'styled-components';
import { colorTokens } from '../theme/colors';

const colorVariableDeclarations = Object.entries(colorTokens)
  .map(([property, value]) => `  ${property}: ${value};`)
  .join('\n');

/**
 * Styled-components global styles layer (complements normalize + global.css).
 */
export const GlobalStyles = createGlobalStyle`
  :root {
${colorVariableDeclarations}
  }

  body {
    font-family: ${({ theme }) => theme.typography.fontFamilies.sans};
    color: ${({ theme }) => theme.colors.text.primary};
    background-color: ${({ theme }) => theme.colors.background};
  }

  ::selection {
    background-color: ${({ theme }) => theme.colors.brand.accent};
    color: ${({ theme }) => theme.colors.text.inverse};
  }
`;

export default GlobalStyles;
