import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { createElement, type ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ProfileRoute from '../src/routes/profile';
import { profileQueryKey } from '../src/hooks/useProfile';
import type { UserProfile } from '../src/types/api';

vi.mock('../src/lib/api/profile', async () => {
  const actual = await vi.importActual<typeof import('../src/lib/api/profile')>(
    '../src/lib/api/profile',
  );

  return {
    ...actual,
    getProfile: vi.fn(),
    updateProfile: vi.fn(),
    changePassword: vi.fn(),
  };
});

import {
  changePassword,
  getProfile,
  updateProfile,
} from '../src/lib/api/profile';

const mockedGetProfile = vi.mocked(getProfile);
const mockedUpdateProfile = vi.mocked(updateProfile);
const mockedChangePassword = vi.mocked(changePassword);

const sampleProfile: UserProfile = {
  id: 'user-1',
  first_name: 'Joseph',
  last_name: 'Stanley',
  email: 'joseph.stanley@example.com',
  mobile_number: '2025550147',
  bio: 'Luxury listing specialist in the DMV.',
  street: '1200 Pennsylvania Avenue',
  city: 'Washington',
  state: 'District of Columbia',
  zip: '20004',
  country: 'United States',
  time_zone: 'America/New_York',
  name: 'Joseph Stanley',
  avatar: '',
  created_at: '2024-03-12T12:00:00.000Z',
};

function renderProfile() {
  const client = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  function Wrapper({ children }: { children: ReactNode }) {
    return createElement(
      QueryClientProvider,
      { client },
      createElement(
        MemoryRouter,
        {
          initialEntries: ['/profile'],
          future: { v7_startTransition: true, v7_relativeSplatPath: true },
        },
        children,
      ),
    );
  }

  return render(createElement(ProfileRoute), { wrapper: Wrapper });
}

describe('profile query key', () => {
  it('uses the profile query key', () => {
    expect(profileQueryKey).toEqual(['profile']);
  });
});

describe('ProfileRoute states', () => {
  beforeEach(() => {
    mockedGetProfile.mockReset();
    mockedUpdateProfile.mockReset();
    mockedChangePassword.mockReset();
    mockedUpdateProfile.mockResolvedValue(sampleProfile);
    mockedChangePassword.mockResolvedValue({
      success: true,
      message: 'Password updated',
    });
  });

  it('renders loading skeletons', async () => {
    mockedGetProfile.mockImplementation(() => new Promise(() => undefined));

    renderProfile();

    expect(
      await screen.findByLabelText('Loading profile details'),
    ).toBeInTheDocument();
  });

  it('renders an error message', async () => {
    mockedGetProfile.mockRejectedValue(new Error('Profile unavailable'));

    renderProfile();

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Profile unavailable',
    );
  });

  it('renders an empty state', async () => {
    mockedGetProfile.mockResolvedValue(null);

    renderProfile();

    expect(
      await screen.findByText('No profile information is available.'),
    ).toBeInTheDocument();
  });

  it('renders the profile form on success', async () => {
    mockedGetProfile.mockResolvedValue(sampleProfile);

    renderProfile();

    expect(
      await screen.findByRole('heading', { name: 'Personal Details' }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('First Name')).toHaveValue('Joseph');
    expect(screen.getByLabelText('Last Name')).toHaveValue('Stanley');
    expect(screen.getByLabelText('Email')).toHaveValue(
      'joseph.stanley@example.com',
    );
    expect(screen.getByLabelText('Mobile Number')).toHaveValue('2025550147');
    expect(screen.getByLabelText('Bio')).toHaveValue(
      'Luxury listing specialist in the DMV.',
    );
    expect(screen.getByLabelText('Street')).toHaveValue(
      '1200 Pennsylvania Avenue',
    );
    expect(screen.getByLabelText('Time Zone')).toHaveValue('America/New_York');
    expect(screen.getByRole('link', { name: 'Profile' })).toHaveClass(
      'text-primary',
    );
    expect(
      screen.getByRole('button', { name: 'Change Password' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });

  it('validates required fields before saving', async () => {
    mockedGetProfile.mockResolvedValue(sampleProfile);

    renderProfile();

    const firstName = await screen.findByLabelText('First Name');
    fireEvent.change(firstName, { target: { value: '' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(await screen.findByText('First name is required.')).toBeInTheDocument();
    expect(mockedUpdateProfile).not.toHaveBeenCalled();
  });

  it('saves profile updates', async () => {
    mockedGetProfile.mockResolvedValue(sampleProfile);

    renderProfile();

    const firstName = await screen.findByLabelText('First Name');
    fireEvent.change(firstName, { target: { value: 'Joe' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(mockedUpdateProfile).toHaveBeenCalled();
      expect(mockedUpdateProfile.mock.calls[0]?.[0]).toEqual(
        expect.objectContaining({
          first_name: 'Joe',
          last_name: 'Stanley',
          email: 'joseph.stanley@example.com',
        }),
      );
    });
  });

  it('cancels unsaved edits', async () => {
    mockedGetProfile.mockResolvedValue(sampleProfile);

    renderProfile();

    const firstName = await screen.findByLabelText('First Name');
    fireEvent.change(firstName, { target: { value: 'Joe' } });
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(screen.getByLabelText('First Name')).toHaveValue('Joseph');
    expect(mockedUpdateProfile).not.toHaveBeenCalled();
  });

  it('changes the password after validation', async () => {
    mockedGetProfile.mockResolvedValue(sampleProfile);

    renderProfile();

    fireEvent.click(
      await screen.findByRole('button', { name: 'Change Password' }),
    );

    const dialog = screen.getByRole('dialog', { name: 'Change Password' });
    expect(dialog).toBeInTheDocument();

    fireEvent.change(within(dialog).getByLabelText('Current Password'), {
      target: { value: 'old-password' },
    });
    fireEvent.change(within(dialog).getByLabelText('New Password'), {
      target: { value: 'short' },
    });
    fireEvent.change(within(dialog).getByLabelText('Confirm New Password'), {
      target: { value: 'short' },
    });
    fireEvent.click(within(dialog).getByRole('button', { name: 'Save password' }));

    expect(
      await within(dialog).findByText(
        'New password must be at least 8 characters.',
      ),
    ).toBeInTheDocument();
    expect(mockedChangePassword).not.toHaveBeenCalled();

    fireEvent.change(within(dialog).getByLabelText('New Password'), {
      target: { value: 'new-password' },
    });
    fireEvent.change(within(dialog).getByLabelText('Confirm New Password'), {
      target: { value: 'new-password' },
    });
    fireEvent.click(within(dialog).getByRole('button', { name: 'Save password' }));

    await waitFor(() => {
      expect(mockedChangePassword).toHaveBeenCalled();
      expect(mockedChangePassword.mock.calls[0]?.[0]).toEqual({
        current_password: 'old-password',
        new_password: 'new-password',
        confirm_password: 'new-password',
      });
    });
  });
});
