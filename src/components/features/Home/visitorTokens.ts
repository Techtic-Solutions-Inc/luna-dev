import { colors } from '@/theme/tokens';

/** Page-specific computed styles that reference theme tokens (not a forked palette). */
export const tanButtonStyle = {
  fontFamily: 'Almarai, sans-serif',
  backgroundColor: colors.accent,
  color: colors['color-103'],
  borderColor: colors.accent,
} as const;

export const darkFieldStyle = {
  fontFamily: 'Almarai, sans-serif',
  backgroundColor: colors['color-103'],
  color: colors.secondary,
  borderColor: colors['color-111'],
} as const;
