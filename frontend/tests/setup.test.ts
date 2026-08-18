import { describe, expect, it } from 'vitest';
import { colors } from '../src/theme/tokens';

describe('design tokens', () => {
  it('exposes core brand colors', () => {
    expect(colors.accent).toBe('#c8a47e');
    expect(colors.textPrimary).toBe('#000000');
  });
});
