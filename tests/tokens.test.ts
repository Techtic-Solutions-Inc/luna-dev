import { colors, radius, spacing, typography, shadows } from '../src/theme/tokens';
import { breakpoints } from '../src/theme/breakpoints';

describe('design tokens', () => {
  it('maps semantic color tokens from Figma', () => {
    expect(colors.accent).toBe('#c8a47e');
    expect(colors.primary).toBe('#00000000');
    expect(colors.secondary).toBe('#ffffff');
    expect(colors['color-16']).toBe('#0b0b0b');
    expect(colors['color-95']).toBe('#272727');
  });

  it('maps typography tokens from Figma', () => {
    expect(typography.body.fontFamily).toBe('Almarai');
    expect(typography.body.fontSize).toBe('16px');
    expect(typography['heading-lg-24'].fontFamily).toBe('EB Garamond');
    expect(typography['body-sm-40'].letterSpacing).toBe('0.22499999999999998px');
  });

  it('maps spacing, radius, shadow, and breakpoint tokens', () => {
    expect(spacing['padding-20']).toBe('20px');
    expect(spacing['gap-832']).toBe('832px');
    expect(radius['radius-10']).toBe('10px');
    expect(shadows['drop-shadow-40'].color).toBe('#919eab28');
    expect(breakpoints.desktop).toBe('1024px');
  });
});
