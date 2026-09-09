import { colors, gradients, radius, spacing, theme } from './tokens';
import { breakpoints } from './breakpoints';
import { HOME_FRAME_WIDTH, homeScreen } from './screens/home';

/** Maps Figma tokens to CSS custom properties consumed by Tailwind and components. */
export function buildCssVariableBlock(): string {
  const lines: string[] = [
    `--primary: ${colors.primary};`,
    `--secondary: ${colors.secondary};`,
    `--accent: ${colors.accent};`,
    `--background-token: ${colors['color-25']};`,
    `--foreground-token: ${colors.secondary};`,
    `--card-token: ${colors['color-44']};`,
    `--card-foreground-token: ${colors.secondary};`,
    `--popover-token: ${colors['color-44']};`,
    `--popover-foreground-token: ${colors.secondary};`,
    `--primary-token: ${colors.accent};`,
    `--primary-foreground-token: ${colors.secondary};`,
    `--secondary-token: ${colors['color-64']};`,
    `--secondary-foreground-token: ${colors.secondary};`,
    `--muted-token: ${colors['color-19']};`,
    `--muted-foreground-token: ${colors['text-secondary']};`,
    `--accent-token: ${colors.accent};`,
    `--accent-foreground-token: ${colors.secondary};`,
    `--destructive-token: ${colors['color-51']};`,
    `--destructive-foreground-token: ${colors.secondary};`,
    `--border-token: ${colors['color-19']};`,
    `--input-token: ${colors['color-19']};`,
    `--ring-token: ${colors.accent};`,
    `--success-token: ${colors['color-17']};`,
    `--warning-token: ${colors['color-49']};`,
    `--info-token: ${colors['color-114']};`,
    `--shell-header: ${colors['color-42']};`,
    `--shell-sidebar: ${colors['color-44']};`,
    `--gradient: ${gradients.gradient};`,
    `--radius-sm-value: ${radius['radius-4']};`,
    `--radius-md-value: ${radius['radius-8']};`,
    `--radius-lg-value: ${radius['radius-10']};`,
    `--radius-xl-value: ${radius['radius-16']};`,
    `--radius-fractional-60709: ${radius['radius-60709']};`,
    `--radius-fractional-29511: ${radius['radius-29511']};`,
    `--radius-fractional-40972: ${radius['radius-40972']};`,
    `--radius-fractional-4861: ${radius['radius-4861']};`,
    `--spacing-padding-12: ${spacing['padding-12']};`,
    `--spacing-padding-16: ${spacing['padding-16']};`,
    `--spacing-padding-20: ${spacing['padding-20']};`,
    `--spacing-padding-24: ${spacing['padding-24']};`,
    `--spacing-padding-30: ${spacing['padding-30']};`,
    `--spacing-padding-32: ${spacing['padding-32']};`,
    `--spacing-padding-40: ${spacing['padding-40']};`,
    `--spacing-padding-60: ${spacing['padding-60']};`,
    `--token-breakpoint-mobile: ${breakpoints.mobile};`,
    `--token-breakpoint-tablet: ${breakpoints.tablet};`,
    `--token-breakpoint-desktop: ${breakpoints.desktop};`,
    `--token-breakpoint-wide: ${breakpoints.wide};`,
    `--home-background: ${homeScreen.background};`,
    `--home-frame-width: ${HOME_FRAME_WIDTH};`,
    `--home-mask-base: ${colors['text-primary']};`,
    `--home-mask-overlay: rgba(0, 0, 0, 0.7);`,
    `--radius-535-value: ${radius['radius-535']};`,
  ];

  return lines.join('\n    ');
}

export { theme };
