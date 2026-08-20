import { createGlobalStyle } from 'styled-components';
import { colors } from './tokens';

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :root {
    --primary: ${colors.primary};
    --secondary: ${colors.secondary};
    --accent: ${colors.accent};
    --background: ${colors.background};
    --surface: ${colors.surface};
    --text-primary: ${colors.textPrimary};
    --text-secondary: ${colors.textSecondary};
    --border: ${colors.border};
    --error: ${colors.error};
    --success: ${colors.success};
    --warning: ${colors.warning};
    --info: ${colors.info};
  }

  html,
  body {
    margin: 0;
    padding: 0;
    min-height: 100%;
  }

  body {
    font-family: 'Almarai', sans-serif;
    color: ${colors.textPrimary};
    background: ${colors.secondary};
    -webkit-font-smoothing: antialiased;
  }

  #root {
    min-height: 100vh;
  }

  a {
    color: inherit;
  }

  button,
  input,
  textarea {
    font: inherit;
  }

  :focus-visible {
    outline: 2px solid ${colors.accent};
    outline-offset: 2px;
  }
`;
