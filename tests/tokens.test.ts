import { describe, expect, it } from 'vitest';
import { colors, theme } from '../src/theme/tokens';

describe('design tokens', () => {
  it('exposes accent color token', () => {
    expect(colors.accent).toBe('#c8a47e');
  });

  it('includes typography and spacing in theme', () => {
    expect(theme.typography.body.fontFamily).toContain('Almarai');
    expect(theme.spacing['padding-16']).toBe('16px');
  });
});
