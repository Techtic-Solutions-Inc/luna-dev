import { colors, typography, spacing, borderRadius, effects } from '../src/theme/theme';

describe('design tokens', () => {
  it('maps required color tokens', () => {
    expect(colors.primary).toBe('#00000000');
    expect(colors.accent).toBe('#c8a47e');
    expect(colors['color-132']).toBe('#272727');
  });

  it('maps required typography, spacing, radius, and effects', () => {
    expect(typography.body.fontFamily).toBe('Almarai');
    expect(typography.body.fontSize).toBe('16.0px');
    expect(typography['heading-lg-19'].fontFamily).toBe('EB Garamond');
    expect(spacing['padding-20']).toBe('20px');
    expect(borderRadius['radius-6']).toBe('6px');
    expect(effects['drop-shadow-11']).toBe(
      'box-shadow: 0px 4.0px 4.0px 0px #0000003f;',
    );
  });
});
