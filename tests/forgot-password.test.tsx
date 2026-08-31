import { afterEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import type { ReactElement } from 'react';
import ForgotPasswordForm from '@/components/forms/ForgotPasswordForm';
import ForgotPassword from '@/routes/ForgotPassword';
import { apiClient } from '@/lib/api/client';
import { endpoints } from '@/types/api';
import { forgotPasswordRequest } from '@/services/auth';

function renderWithProviders(ui: ReactElement) {
  const client = new QueryClient({
    defaultOptions: {
      mutations: { retry: false },
      queries: { retry: false },
    },
  });
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter>{ui}</MemoryRouter>
    </QueryClientProvider>,
  );
}

describe('forgot password', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('posts to the locked forgot-password path', async () => {
    const spy = vi.spyOn(apiClient, 'post').mockResolvedValue({
      data: { success: true, message: 'Reset link sent.' },
    });
    await forgotPasswordRequest({ email: 'agent@example.com' });
    expect(spy).toHaveBeenCalledWith(endpoints.forgotPassword, { email: 'agent@example.com' });
    expect(endpoints.forgotPassword).toBe('/api/auth/forgot-password');
  });

  it('renders the reset password form copy and email field', () => {
    renderWithProviders(<ForgotPassword />);
    expect(screen.getByRole('heading', { name: 'Reset Password' })).toBeInTheDocument();
    expect(
      screen.getByText(
        /Enter the email address you used to create your account and we'll send you a link to reset your password./,
      ),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send me a link' })).toBeInTheDocument();
  });

  it('validates that email is required', async () => {
    renderWithProviders(<ForgotPasswordForm />);
    fireEvent.click(screen.getByRole('button', { name: 'Send me a link' }));
    expect(await screen.findByText('Email is required')).toBeInTheDocument();
  });

  it('submits the email and shows the success message', async () => {
    const spy = vi.spyOn(apiClient, 'post').mockResolvedValue({
      data: { success: true, message: 'Reset link sent.' },
    });
    renderWithProviders(<ForgotPasswordForm />);
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'agent@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: 'Send me a link' }));
    expect(await screen.findByText('Reset link sent.')).toBeInTheDocument();
    expect(spy).toHaveBeenCalledWith('/api/auth/forgot-password', { email: 'agent@example.com' });
  });
});
