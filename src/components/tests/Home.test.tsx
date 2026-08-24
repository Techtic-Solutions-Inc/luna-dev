import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Home from '../features/Home';
import { AppThemeProvider } from '../../theme';

describe('Home', () => {
  it('renders the workspace heading after loading', async () => {
    render(
      <AppThemeProvider>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </AppThemeProvider>,
    );

    expect(await screen.findByRole('heading', { name: 'Agentwise' })).toBeInTheDocument();
  });
});
