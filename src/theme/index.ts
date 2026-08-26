import { createGlobalStyle } from 'styled-components';
import tokens from './tokens';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: ${tokens.fontFamily};
    background-color: ${tokens.colors.background};
    color: ${tokens.colors.text};
  }
`;

export default GlobalStyle;