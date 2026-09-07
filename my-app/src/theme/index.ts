import { createGlobalStyle, ThemeProvider as StyledThemeProvider } from 'styled-components'
import { colors, gradients, typography } from './tokens'

const GlobalStyle = createGlobalStyle`
  :root {
    --primary: ${colors.primary};
    --secondary: ${colors.secondary};
    --accent: ${colors.accent};
    --background: ${colors.background};
    --surface: ${colors.surface};
    --text-primary: ${colors['text-primary']};
    --text-secondary: ${colors['text-secondary']};
    --border: ${colors.border};
    --error: ${colors.error};
    --success: ${colors.success};
    --warning: ${colors.warning};
    --info: ${colors.info};
    --app-gradient: ${gradients.gradient};
    --font-body: '${typography.body.family}', sans-serif;
    --font-heading: 'EB Garamond', serif;
    --font-ui: 'Public Sans', sans-serif;
  }

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body, #root {
    min-height: 100vh;
  }

  body {
    font-family: var(--font-body);
    font-size: ${typography.body.size};
    font-weight: ${typography.body.weight};
    line-height: ${typography.body.lineHeight};
    color: ${colors.secondary};
    background-image: ${gradients.gradient};
    background-attachment: fixed;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  button, input, select, textarea {
    font-family: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  :focus-visible {
    outline: 2px solid ${colors.accent};
    outline-offset: 2px;
  }
`

export { GlobalStyle, StyledThemeProvider }
