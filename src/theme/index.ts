import { createGlobalStyle, ThemeProvider } from "styled-components";
import { colors } from "./tokens";

export const appTheme = {
  colors,
};

export const GlobalStyle = createGlobalStyle`
  :root {
    --primary: ${colors.primary};
    --secondary: ${colors.secondary};
    --accent: ${colors.accent};
  }
`;

export { ThemeProvider };
