import { describe, expect, it } from 'vitest'
import { colors } from '@/theme/tokens'

describe('design tokens', () => {
  it('maps accent color from Figma', () => {
    expect(colors.accent).toBe('#c8a47e')
  })

  it('maps primary color from Figma', () => {
    expect(colors.primary).toBe('#00000000')
  })
})
