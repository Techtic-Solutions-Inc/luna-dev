import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/utils';

describe('cn utility', () => {
  it('merges class names correctly', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
    expect(cn('text-sm', undefined, 'font-bold')).toBe('text-sm font-bold');
  });
});

describe('theme breakpoints', () => {
  it('exports expected breakpoint values', async () => {
    const { breakpoints } = await import('@/theme/breakpoints');
    expect(breakpoints.mobile).toBe('480px');
    expect(breakpoints.tablet).toBe('768px');
    expect(breakpoints.desktop).toBe('1024px');
  });
});
