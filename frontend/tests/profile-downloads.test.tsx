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

import {
  getProfileDownloads,
  reDownloadProfileFile,
} from '../src/lib/api/profileDownloads';

const mockedGetProfileDownloads = vi.mocked(getProfileDownloads);
const mockedReDownloadProfileFile = vi.mocked(reDownloadProfileFile);

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
    expect(screen.getByText('Guides · 4.2 MB · Jun 04, 2026')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Downloads' })).toHaveClass(
      'text-primary',
    );
    expect(
      screen.getByRole('button', {
        name: 'Re-download Luxury Listing Guide — 2026',
      }),
    ).toBeInTheDocument();
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
      expect(mockedReDownloadProfileFile).toHaveBeenCalledWith({ id: '1' });
    });
  });
});
