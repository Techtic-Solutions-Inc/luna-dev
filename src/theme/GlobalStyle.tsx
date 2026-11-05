import { createGlobalStyle } from "styled-components";
import { tokens } from "./tokens";

export const GlobalStyle = createGlobalStyle`
  html {
    scroll-behavior: smooth;
  }
  body {
    margin: 0;
    background-color: ${tokens.colors.background};
    color: ${tokens.colors.textPrimary};
    font-family: ${tokens.fonts.almarai};
  }
`;
