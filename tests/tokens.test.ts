import { describe, expect, it } from 'vitest';

import { colors, typography } from '../src/theme/tokens';

describe('Sofia design tokens', () => {
  it('maps semantic colors from the design reference', () => {
    expect(colors.accent).toBe('#c8a47e');
    expect(colors.primary).toBe('#00000000');
    expect(colors['text-primary']).toBe('#000000');
    expect(colors['color-16']).toBe('#0b0b0b');
  });

  it('maps core typography tokens', () => {
    expect(typography.body.fontFamily).toBe('Almarai');
    expect(typography.body.fontSize).toBe('16.0px');
    expect(typography['heading-xl-44'].fontFamily).toBe('EB Garamond');
  });
});
