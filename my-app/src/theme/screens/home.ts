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

/** Figma export frame for Ld0PDcExWUGrmN6c7l8cvcjcsJk 1 (node 2289:17245). */
export const HOME_MASK_FRAME_EXPORT = {
  width: 1955,
  height: 2875,
} as const;

/** Rectangle 34624219 (node 2295:3507) layout within the mask export frame. */
export const HOME_MASK_OVERLAY_LAYOUT = {
  top: 32,
  left: 95,
  width: 1765,
  height: 960,
} as const;
