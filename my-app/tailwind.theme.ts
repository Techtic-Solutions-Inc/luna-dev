import { breakpoints } from './src/theme/breakpoints.js'
import { layout, radius, semanticColors, spacing, typography } from './src/theme/tokens.js'

function toKebabCase(key: string): string {
  return key.replace(/([A-Z])/g, '-$1').toLowerCase()
}

type TypographyToken = (typeof typography)[keyof typeof typography]

function typographyVars(name: string, token: TypographyToken): string {
  return `  --text-${name}: ${token.size};
  --text-${name}--line-height: ${token.lineHeight};
  --font-weight-${name}: ${token.weight};`
}

/** Single source of truth for Tailwind @theme — consumed by the Vite plugin in vite.config.ts */
export function generateTailwindThemeBlock(): string {
  const colorVars = Object.entries(semanticColors)
    .map(([key, value]) => `  --color-${toKebabCase(key)}: ${value};`)
    .join('\n')

  const fontBody = `'${typography.body.family}', sans-serif`
  const fontHeading = `'${typography['heading-lg-19'].family}', serif`
  const fontUi = `'${typography['caption-4'].family}', sans-serif`

  const breakpointVars = Object.entries(breakpoints)
    .map(([key, value]) => `  --breakpoint-${key}: ${value};`)
    .join('\n')

  return `@theme {
${colorVars}
  --font-body: ${fontBody};
  --font-heading: ${fontHeading};
  --font-ui: ${fontUi};
  --font-family-body: ${fontBody};
  --font-family-heading: ${fontHeading};
  --font-family-ui: ${fontUi};
  --radius-sm: ${radius['radius-6']};
  --radius-md: ${radius['radius-8']};
  --radius-lg: ${radius['radius-10']};
  --spacing-layout-x: ${spacing['padding-24']};
  --spacing-layout-y: ${spacing['padding-16']};
  --spacing-sidebar-x: ${spacing['padding-16']};
  --spacing-sidebar-y: ${spacing['padding-24']};
  --width-sidebar: ${layout.sidebarWidth};
${typographyVars('heading-xl', typography['heading-xl-35'])}
${typographyVars('heading-lg', typography['heading-lg-19'])}
${typographyVars('heading-lg-sm', typography['heading-lg-68'])}
${typographyVars('body', typography.body)}
${typographyVars('body-sm', typography['body-sm-2'])}
${breakpointVars}
}`
}
