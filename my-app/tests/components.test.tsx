import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import NotFound from '../src/components/NotFound';
import { getToken, setToken, removeToken } from '../src/lib/auth/storage';
import { theme } from '../src/theme/theme';

describe('auth storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('stores and retrieves auth token', () => {
    setToken('test-token');
    expect(getToken()).toBe('test-token');
  });

  it('removes auth token', () => {
    setToken('test-token');
    removeToken();
    expect(getToken()).toBeNull();
  });
});

describe('NotFound', () => {
  it('renders 404 heading', () => {
    render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <NotFound />
        </BrowserRouter>
      </ThemeProvider>,
    );

    expect(screen.getByRole('heading', { name: '404 - Not Found' })).toBeInTheDocument();
  });
});
