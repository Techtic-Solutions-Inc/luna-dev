import { describe, expect, it } from 'vitest';
import { colors, gradients, radius, shadows, spacing, typography } from '../src/theme/tokens';

describe('Figma design tokens', () => {
  it('maps every Sofia color token', () => {
    expect(Object.keys(colors)).toHaveLength(132);
    expect(colors.primary).toBe('#00000000');
    expect(colors.accent).toBe('#c8a47e');
    expect(colors['color-132']).toBe('#272727');
  });

  it('maps every typography token', () => {
    expect(Object.keys(typography)).toHaveLength(117);
    expect(typography.body.fontFamily).toBe('Almarai');
    expect(typography['body-117'].lineHeight).toBe('48px');
  });

  it('maps spacing, radius, shadow and gradient tokens', () => {
    expect(Object.keys(spacing)).toHaveLength(74);
    expect(Object.keys(radius)).toHaveLength(50);
    expect(Object.keys(shadows)).toHaveLength(40);
    expect(Object.keys(gradients)).toHaveLength(21);
    expect(spacing['gap--10']).toBe('-10px');
    expect(radius['radius-12']).toBe('12px');
    expect(shadows['drop-shadow-11']).toBe('0px 4.0px 4.0px 0px #0000003f');
  });
});
