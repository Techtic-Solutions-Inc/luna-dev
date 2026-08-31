import { afterEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import type { ReactElement } from 'react';
import SignInForm from '@/components/forms/SignInForm';
import SignIn from '@/routes/SignIn';
import { AuthProvider } from '@/hooks/useAuth';
import { apiClient } from '@/lib/api/client';
import { endpoints } from '@/types/api';
import { loginRequest, logoutRequest } from '@/services/auth';

function renderWithProviders(ui: ReactElement) {
  const client = new QueryClient({
    defaultOptions: {
      mutations: { retry: false },
      queries: { retry: false },
    },
  });
  return render(
    <QueryClientProvider client={client}>
      <AuthProvider>
        <MemoryRouter>{ui}</MemoryRouter>
      </AuthProvider>
    </QueryClientProvider>,
  );
}

const loginPayload = {
  success: true,
  message: 'Signed in successfully.',
  data: {
    id: '1',
    name: 'Ada Lovelace',
    first_name: 'Ada',
    last_name: 'Lovelace',
    email: 'ada@example.com',
    token: 'token-1',
    accessToken: 'token-1',
    refreshToken: 'refresh-1',
    tokenType: 'Bearer',
  },
};

describe('sign in', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    window.localStorage.clear();
  });

  it('posts to the locked login path', async () => {
    const spy = vi.spyOn(apiClient, 'post').mockResolvedValue({ data: loginPayload });
    await loginRequest({ email: 'ada@example.com', password: 'password1' });
    expect(spy).toHaveBeenCalledWith(endpoints.login, {
      email: 'ada@example.com',
      password: 'password1',
    });
    expect(endpoints.login).toBe('/api/auth/login');
  });

  it('gets the locked logout path', async () => {
    const spy = vi.spyOn(apiClient, 'get').mockResolvedValue({
      data: { success: true, message: 'Signed out.' },
    });
    await logoutRequest();
    expect(spy).toHaveBeenCalledWith(endpoints.logout);
    expect(endpoints.logout).toBe('/api/auth/logout');
  });

  it('renders the sign in copy and fields', () => {
    renderWithProviders(<SignIn />);
    expect(screen.getByRole('heading', { name: 'Welcome To Agentwise' })).toBeInTheDocument();
    expect(
      screen.getByText('Everything you need to create standout real estate content.'),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Remember me')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Forgot your password?' })).toHaveAttribute(
      'href',
      '/forgot-password',
    );
    expect(screen.getByRole('link', { name: 'Sign up here.' })).toHaveAttribute('href', '/sign-up');
  });

  it('validates that email is required', async () => {
    renderWithProviders(<SignInForm />);
    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));
    expect(await screen.findByText('Email is required')).toBeInTheDocument();
  });

  it('submits credentials and shows the success message', async () => {
    const spy = vi.spyOn(apiClient, 'post').mockResolvedValue({ data: loginPayload });
    renderWithProviders(<SignInForm />);
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'ada@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password1' } });
    fireEvent.click(screen.getByLabelText('Remember me'));
    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));
    expect(await screen.findByText('Signed in successfully.')).toBeInTheDocument();
    expect(spy).toHaveBeenCalledWith('/api/auth/login', {
      email: 'ada@example.com',
      password: 'password1',
    });
    await waitFor(() => {
      expect(window.localStorage.getItem('remember_me')).toBe('true');
      expect(window.localStorage.getItem('remembered_email')).toBe('ada@example.com');
    });
  });
});
