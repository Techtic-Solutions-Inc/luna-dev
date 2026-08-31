import { afterEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import type { ReactElement } from 'react';
import SignUpForm from '@/components/forms/SignUpForm';
import SignUp from '@/routes/SignUp';
import { apiClient } from '@/lib/api/client';
import { endpoints } from '@/types/api';
import { signupRequest } from '@/services/auth';

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

describe('sign up', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('posts to the locked signup path', async () => {
    const spy = vi.spyOn(apiClient, 'post').mockResolvedValue({
      data: {
        success: true,
        message: 'Account created.',
        data: { id: '1', name: 'A', email: 'a@b.c' },
      },
    });
    await signupRequest({
      first_name: 'Ada',
      last_name: 'Lovelace',
      email: 'ada@example.com',
      password: 'password1',
    });
    expect(spy).toHaveBeenCalledWith(endpoints.signup, {
      first_name: 'Ada',
      last_name: 'Lovelace',
      email: 'ada@example.com',
      password: 'password1',
    });
    expect(endpoints.signup).toBe('/api/signup');
  });

  it('renders the sign up copy and fields', () => {
    renderWithProviders(<SignUp />);
    expect(
      screen.getByRole('heading', {
        name: 'Great Marketing Made Easier. Specifically For Agents',
      }),
    ).toBeInTheDocument();
    expect(screen.getByText('Create your account today')).toBeInTheDocument();
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Create a Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign Up' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Sign in' })).toHaveAttribute('href', '/sign-in');
  });

  it('keeps Sign Up disabled until terms are accepted', () => {
    renderWithProviders(<SignUpForm />);
    expect(screen.getByRole('button', { name: 'Sign Up' })).toBeDisabled();
    fireEvent.click(screen.getByLabelText(/I have read and agree/));
    expect(screen.getByRole('button', { name: 'Sign Up' })).not.toBeDisabled();
  });

  it('submits the form and shows the success message', async () => {
    const spy = vi.spyOn(apiClient, 'post').mockResolvedValue({
      data: {
        success: true,
        message: 'Account created.',
        data: { id: '1', name: 'Ada Lovelace', email: 'ada@example.com' },
      },
    });
    renderWithProviders(<SignUpForm />);
    fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'Ada' } });
    fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Lovelace' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'ada@example.com' } });
    fireEvent.change(screen.getByLabelText('Create a Password'), {
      target: { value: 'password1' },
    });
    fireEvent.click(screen.getByLabelText(/I have read and agree/));
    fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));
    expect(await screen.findByText('Account created.')).toBeInTheDocument();
    expect(spy).toHaveBeenCalledWith('/api/signup', {
      first_name: 'Ada',
      last_name: 'Lovelace',
      email: 'ada@example.com',
      password: 'password1',
    });
  });
});
