import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import NotFound from '../src/components/404';
import { AppThemeProvider } from '../src/theme';

describe('NotFound', () => {
  it('renders the 404 heading and a home link', () => {
    render(
      <AppThemeProvider>
        <MemoryRouter>
          <NotFound />
        </MemoryRouter>
      </AppThemeProvider>,
    );

    expect(screen.getByRole('heading', { name: 'Page Not Found' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Back to home' })).toBeInTheDocument();
  });
});
