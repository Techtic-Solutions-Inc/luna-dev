import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../src/components/ProtectedRoute';
import { setToken, removeToken } from '../src/lib/auth/storage';

describe('ProtectedRoute', () => {
  afterEach(() => {
    removeToken();
  });

  it('redirects unauthenticated users to home', () => {
    render(
      <MemoryRouter initialEntries={['/calendar']}>
        <Routes>
          <Route path="/" element={<p>Home</p>} />
          <Route
            path="/calendar"
            element={
              <ProtectedRoute>
                <p>Calendar</p>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('renders children when a token is present', () => {
    setToken('token');

    render(
      <MemoryRouter initialEntries={['/calendar']}>
        <Routes>
          <Route path="/" element={<p>Home</p>} />
          <Route
            path="/calendar"
            element={
              <ProtectedRoute>
                <p>Calendar</p>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText('Calendar')).toBeInTheDocument();
  });
});
