import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Home from '@/components/features/Home';
import { colors } from '@/theme/tokens';

describe('Agentwise scaffold', () => {
  it('maps Sofia accent token exactly', () => {
    expect(colors.accent).toBe('#c8a47e');
    expect(colors['color-132']).toBe('#272727');
  });

  it('renders the home heading', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: 'Welcome to Agentwise' })).toBeInTheDocument();
    expect(screen.getByLabelText('Loading')).toBeInTheDocument();
  });
});
