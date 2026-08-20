import { describe, expect, it } from 'vitest';
import { breakpoints } from '../src/theme/breakpoints';
import { colors, radius, shadows, spacing, typography } from '../src/theme/tokens';

describe('design tokens', () => {
  it('maps every required color token', () => {
    expect(Object.keys(colors)).toHaveLength(95);
    expect(colors.accent).toBe('#c8a47e');
    expect(colors['color-14']).toBe('#959595');
  });

  it('maps every required typography token', () => {
    expect(Object.keys(typography)).toHaveLength(119);
    expect(typography.body.fontFamily).toBe('Almarai');
  });

  it('maps spacing, radius, and shadow tokens', () => {
    expect(Object.keys(spacing).length).toBeGreaterThan(0);
    expect(Object.keys(radius)).toHaveLength(50);
    expect(Object.keys(shadows)).toHaveLength(40);
  });

  it('defines responsive breakpoints', () => {
    expect(breakpoints.mobile).toBe('480px');
    expect(breakpoints.tablet).toBe('768px');
    expect(breakpoints.desktop).toBe('1024px');
  });
});
