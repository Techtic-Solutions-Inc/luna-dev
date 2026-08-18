import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createElement, type ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ProfileDownloadsRoute from '../src/routes/profile-downloads';
import { profileDownloadsQueryKey } from '../src/hooks/useProfileDownloads';
import type { ProfileDownloadItem } from '../src/types/api';

vi.mock('../src/lib/api/profileDownloads', async () => {
  const actual = await vi.importActual<
    typeof import('../src/lib/api/profileDownloads')
  >('../src/lib/api/profileDownloads');

  return {
    ...actual,
    getProfileDownloads: vi.fn(),
    reDownloadProfileFile: vi.fn(),
  };
});

vi.mock('../src/lib/api/profile', async () => {
  const actual = await vi.importActual<typeof import('../src/lib/api/profile')>(
    '../src/lib/api/profile',
  );

  return {
    ...actual,
    getProfile: vi.fn(),
  };
});

import {
  getProfileDownloads,
  reDownloadProfileFile,
} from '../src/lib/api/profileDownloads';
import { getProfile } from '../src/lib/api/profile';

const mockedGetProfileDownloads = vi.mocked(getProfileDownloads);
const mockedReDownloadProfileFile = vi.mocked(reDownloadProfileFile);
const mockedGetProfile = vi.mocked(getProfile);

const sampleItem: ProfileDownloadItem = {
  id: '1',
  title: 'Luxury Listing Guide — 2026',
  file_type: 'Guides',
  size: '4.2 MB',
  date: '2026-06-04T12:00:00.000Z',
  created_at: '2026-06-04T12:00:00.000Z',
  updated_at: '2026-06-04T12:00:00.000Z',
  url: '',
};

function renderProfileDownloads() {
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
          initialEntries: ['/profile/downloads'],
          future: { v7_startTransition: true, v7_relativeSplatPath: true },
        },
        children,
      ),
    );
  }

  return render(createElement(ProfileDownloadsRoute), { wrapper: Wrapper });
}

describe('profile downloads query key', () => {
  it('uses the profile-downloads query key', () => {
    expect(profileDownloadsQueryKey).toEqual(['profile-downloads']);
  });
});

describe('ProfileDownloadsRoute states', () => {
  beforeEach(() => {
    mockedGetProfileDownloads.mockReset();
    mockedReDownloadProfileFile.mockReset();
    mockedReDownloadProfileFile.mockResolvedValue(undefined);
    mockedGetProfile.mockReset();
    mockedGetProfile.mockResolvedValue({
      id: 'user-1',
      first_name: 'Joseph',
      last_name: 'Stanley',
      email: 'joseph.stanley@example.com',
      mobile_number: '',
      bio: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      time_zone: '',
      name: 'Joseph Stanley',
      avatar: '',
      created_at: '2024-03-12T12:00:00.000Z',
    });
  });

  it('renders loading skeletons', async () => {
    mockedGetProfileDownloads.mockImplementation(
      () => new Promise(() => undefined),
    );

    renderProfileDownloads();

    expect(
      await screen.findByLabelText('Loading download history'),
    ).toBeInTheDocument();
  });

  it('renders an error message', async () => {
    mockedGetProfileDownloads.mockRejectedValue(
      new Error('Downloads unavailable'),
    );

    renderProfileDownloads();

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Downloads unavailable',
    );
  });

  it('renders an empty state', async () => {
    mockedGetProfileDownloads.mockResolvedValue({ items: [], total: 0 });

    renderProfileDownloads();

    expect(await screen.findByText('No downloads available.')).toBeInTheDocument();
  });

  it('renders download history on success', async () => {
    mockedGetProfileDownloads.mockResolvedValue({
      items: [sampleItem],
      total: 312,
    });

    renderProfileDownloads();

    await waitFor(() => {
      expect(
        screen.getByText('Luxury Listing Guide — 2026'),
      ).toBeInTheDocument();
    });

    expect(
      screen.getByRole('heading', { name: 'Download History' }),
    ).toBeInTheDocument();
    expect(screen.getByText('312')).toBeInTheDocument();
    expect(screen.getAllByText('Joseph Stanley').length).toBeGreaterThan(0);
    expect(screen.getByText('Guides · 4.2 MB · Jun 04, 2026')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Downloads' })).toHaveClass(
      'text-primary',
    );
    expect(
      screen.getByRole('button', {
        name: 'Re-download Luxury Listing Guide — 2026',
      }),
    ).toBeInTheDocument();
    expect(screen.getByText('Showing 1 of 312')).toBeInTheDocument();
  });

  it('triggers a re-download request', async () => {
    mockedGetProfileDownloads.mockResolvedValue({
      items: [sampleItem],
      total: 1,
    });

    renderProfileDownloads();

    const button = await screen.findByRole('button', {
      name: 'Re-download Luxury Listing Guide — 2026',
    });

    fireEvent.click(button);

    await waitFor(() => {
      expect(mockedReDownloadProfileFile).toHaveBeenCalledWith({
        id: '1',
        url: '',
        title: 'Luxury Listing Guide — 2026',
      });
    });
  });

  it('paginates download history', async () => {
    mockedGetProfileDownloads.mockResolvedValue({
      items: [
        sampleItem,
        { ...sampleItem, id: '2', title: 'Open House Story Pack' },
        { ...sampleItem, id: '3', title: 'Just Sold — Reel Template' },
        { ...sampleItem, id: '4', title: 'Buyer Consultation Checklist' },
        { ...sampleItem, id: '5', title: 'Neighborhood Postcard Set' },
        { ...sampleItem, id: '6', title: 'Listing Video B-Roll' },
      ],
      total: 6,
    });

    renderProfileDownloads();

    expect(await screen.findByText('Luxury Listing Guide — 2026')).toBeInTheDocument();
    expect(screen.queryByText('Listing Video B-Roll')).not.toBeInTheDocument();
    expect(screen.getByText('Showing 5 of 6')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Next page' }));

    expect(await screen.findByText('Listing Video B-Roll')).toBeInTheDocument();
    expect(screen.queryByText('Luxury Listing Guide — 2026')).not.toBeInTheDocument();
    expect(screen.getByText('Showing 1 of 6')).toBeInTheDocument();
  });
});
