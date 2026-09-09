import { colors } from '../tokens';

/** Figma frame anchor for the Home screen (reference width — not a page hard-width). */
export const HOME_FRAME_WIDTH = 1920;

export const homeScreen = {
  name: 'Home',
  background: colors['color-24'],
  frameWidth: HOME_FRAME_WIDTH,
} as const;

export type HomeScreenTokens = typeof homeScreen;

/**
 * Converts a Figma pixel measurement to a viewport-relative length using the
 * frame anchor. Keeps layout proportional without fixing the page to 1920px.
 */
export function frameRelativeLength(figmaPx: number): string {
  return `calc(${figmaPx} * 100vw / ${HOME_FRAME_WIDTH})`;
}

/**
 * Caps proportional scaling at the design frame width so content does not
 * stretch beyond the Figma artboard on ultra-wide viewports.
 */
export function frameRelativeLengthCapped(figmaPx: number): string {
  return `min(${figmaPx}px, ${frameRelativeLength(figmaPx)})`;
}
