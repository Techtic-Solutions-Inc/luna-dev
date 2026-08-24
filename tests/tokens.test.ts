import { describe, expect, it } from 'vitest';
import { colors, radius, shadows, spacing, typography } from '../src/theme/tokens';

describe('design tokens', () => {
  it('maps semantic colors exactly', () => {
    expect(colors.accent).toBe('#c8a47e');
    expect(colors.background).toBe('#637381');
    expect(colors['color-24']).toBe('#0e0d0d');
  });

  it('includes required typography, spacing, radius and shadow tokens', () => {
    expect(typography['heading-xl-45'].fontSize).toBe('84px');
    expect(spacing['gap-50']).toBe('50px');
    expect(spacing['padding-32']).toBe('32px');
    expect(radius['radius-20']).toBe('20px');
    expect(shadows['drop-shadow-18']).toContain('#3b3b3b72');
  });
});
