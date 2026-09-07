import { createGlobalStyle, ThemeProvider as StyledThemeProvider } from 'styled-components'
import { breakpoints } from './breakpoints'
import { colors, gradients, semanticColors, typography } from './tokens'

const GlobalStyle = createGlobalStyle`
  :root {
    --primary: ${semanticColors.primary};
    --secondary: ${semanticColors.secondary};
    --accent: ${semanticColors.accent};
    --background: ${colors.background};
    --surface: ${colors.surface};
    --text-primary: ${colors['text-primary']};
    --text-secondary: ${semanticColors.mutedForeground};
    --border: ${semanticColors.border};
    --shell-border: ${semanticColors.shellBorder};
    --shell: ${semanticColors.shell};
    --error: ${colors.error};
    --success: ${colors.success};
    --warning: ${colors.warning};
    --info: ${colors.info};
    --app-gradient: ${gradients.gradient};
    --font-body: '${typography.body.family}', sans-serif;
    --font-heading: '${typography['heading-lg-19'].family}', serif;
    --font-ui: '${typography['caption-4'].family}', sans-serif;
    --breakpoint-mobile: ${breakpoints.mobile};
    --breakpoint-tablet: ${breakpoints.tablet};
    --breakpoint-desktop: ${breakpoints.desktop};
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
    color: ${semanticColors.foreground};
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
    outline: 2px solid ${semanticColors.accent};
    outline-offset: 2px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    body {
      overflow-x: hidden;
    }
  }
`

export { GlobalStyle, StyledThemeProvider }
