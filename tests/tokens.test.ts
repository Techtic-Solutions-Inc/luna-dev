import { describe, expect, it } from 'vitest';
import { colors, typography, spacing, radius, shadows } from '../src/theme/tokens';

describe('design tokens', () => {
  it('maps the accent and background tokens exactly', () => {
    expect(colors.accent).toBe('#c8a47e');
    expect(colors.background).toBe('#637381');
  });

  it('exposes typography, spacing, radius and shadows', () => {
    expect(typography.body.fontFamily).toBe('Almarai');
    expect(spacing['padding-32']).toBe('32px');
    expect(spacing['gap-50']).toBe('50px');
    expect(radius['radius-24']).toBe('24px');
    expect(shadows['drop-shadow-37']).toBe('0px 4px 34px 0px #c8a47e33');
  });
});
