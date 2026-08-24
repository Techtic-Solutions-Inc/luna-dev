import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { act } from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import ProtectedRoute from '../src/components/layout/ProtectedRoute';
import { clearToken, setToken } from '../src/hooks/useAuth';

describe('ProtectedRoute', () => {
  afterEach(() => {
    act(() => {
      clearToken();
    });
  });

  it('redirects unauthenticated users to home', () => {
    render(
      <MemoryRouter initialEntries={['/app']}>
        <Routes>
          <Route path="/" element={<div>public home</div>} />
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <div>protected studio</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText('public home')).toBeInTheDocument();
    expect(screen.queryByText('protected studio')).not.toBeInTheDocument();
  });

  it('renders children when a token is present', () => {
    act(() => {
      setToken('test-token');
    });

    render(
      <MemoryRouter initialEntries={['/app']}>
        <Routes>
          <Route path="/" element={<div>public home</div>} />
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <div>protected studio</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText('protected studio')).toBeInTheDocument();
  });
});
