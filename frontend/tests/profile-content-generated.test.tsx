import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { ReactElement } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import ContentHistoryGrid from '../src/components/ContentHistoryGrid';
import TabsNavigation from '../src/components/TabsNavigation';
import { profileContentQueryKey } from '../src/hooks/useProfileContent';
import ProfileContentGeneratedRoute from '../src/routes/profile-content-generated';
import type { ProfileContentItem } from '../src/types/api';

vi.mock('../src/lib/api/profileContent', () => ({
  getProfileContent: vi.fn(),
  getProfileContentErrorMessage: (error: unknown) =>
    error instanceof Error ? error.message : 'Failed to load generated content',
  createProfileContent: vi.fn(),
  updateProfileContent: vi.fn(),
  deleteProfileContent: vi.fn(),
}));

import {
  createProfileContent,
  deleteProfileContent,
  getProfileContent,
  updateProfileContent,
} from '../src/lib/api/profileContent';

const sampleItems: ProfileContentItem[] = [
  {
    id: '1',
    title: 'Just Listed — 12 Maple Ridge',
    description: 'Step into elevated living — a four-bedroom retreat...',
    date: '2026-06-05T13:42:00.000Z',
    content: 'Step into elevated living — a four-bedroom retreat...',
    created_at: '2026-06-05T13:42:00.000Z',
    updated_at: '2026-06-05T13:42:00.000Z',
  },
  {
    id: '2',
    title: 'Spring Market Snapshot',
    description: 'What buyers need to know this week.',
    date: '2026-06-04T15:10:00.000Z',
    content: '',
    created_at: '2026-06-04T15:10:00.000Z',
    updated_at: '2026-06-04T15:10:00.000Z',
  },
];

function renderWithQuery(
  ui: ReactElement,
  initialEntries = ['/profile/content-generated'],
) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter
        initialEntries={initialEntries}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        {ui}
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

describe('profile content query key', () => {
  it('uses the profile-content query key', () => {
    expect(profileContentQueryKey).toEqual(['profile-content']);
  });
});

describe('ProfileContentGeneratedRoute', () => {
  beforeEach(() => {
    vi.mocked(getProfileContent).mockReset();
    vi.mocked(createProfileContent).mockReset();
    vi.mocked(updateProfileContent).mockReset();
    vi.mocked(deleteProfileContent).mockReset();
    vi.mocked(createProfileContent).mockResolvedValue(sampleItems[0] ?? null);
    vi.mocked(updateProfileContent).mockResolvedValue(sampleItems[0] ?? null);
    vi.mocked(deleteProfileContent).mockResolvedValue(undefined);
  });

  it('renders loading skeletons', () => {
    vi.mocked(getProfileContent).mockReturnValue(new Promise(() => undefined));

    renderWithQuery(<ProfileContentGeneratedRoute />);

    expect(screen.getByLabelText('Loading content history')).toBeInTheDocument();
  });

  it('renders an error message at the top of the screen', async () => {
    vi.mocked(getProfileContent).mockRejectedValueOnce(
      new Error('Unable to load generated content'),
    );

    renderWithQuery(<ProfileContentGeneratedRoute />);

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Unable to load generated content',
    );
  });

  it('renders an empty state', async () => {
    vi.mocked(getProfileContent).mockResolvedValueOnce({ items: [], total: 0 });

    renderWithQuery(<ProfileContentGeneratedRoute />);

    expect(await screen.findByRole('status')).toHaveTextContent(
      'No generated content yet.',
    );
    expect(
      screen.getByRole('button', { name: 'Create generated content' }),
    ).toBeInTheDocument();
  });

  it('renders generated content history on success', async () => {
    vi.mocked(getProfileContent).mockResolvedValueOnce({
      items: sampleItems,
      total: 247,
    });

    renderWithQuery(<ProfileContentGeneratedRoute />);

    expect(
      await screen.findByRole('heading', { name: 'Content History' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Just Listed — 12 Maple Ridge')).toBeInTheDocument();
    expect(screen.getByText('247')).toBeInTheDocument();
    expect(screen.getByText('Showing 2 of 247')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Content Generated' }),
    ).toHaveAttribute('aria-current', 'page');
  });
});

describe('ContentHistoryGrid', () => {
  it('renders empty state', () => {
    render(<ContentHistoryGrid items={[]} total={0} />);

    expect(screen.getByRole('status')).toHaveTextContent(
      'No generated content yet.',
    );
  });

  it('paginates when there are more than five items', () => {
    const items = Array.from({ length: 6 }, (_, index) => ({
      id: String(index + 1),
      title: `Generated piece ${index + 1}`,
      description: 'Preview copy',
      date: '2026-06-05T13:42:00.000Z',
      content: '',
      created_at: '2026-06-05T13:42:00.000Z',
      updated_at: '2026-06-05T13:42:00.000Z',
    }));

    render(<ContentHistoryGrid items={items} total={6} />);

    expect(screen.getByText('Generated piece 1')).toBeInTheDocument();
    expect(screen.queryByText('Generated piece 6')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Next page' }));

    expect(screen.getByText('Generated piece 6')).toBeInTheDocument();
  });
});

describe('TabsNavigation', () => {
  it('marks Content Generated as the current tab', () => {
    render(
      <MemoryRouter
        initialEntries={['/profile/content-generated']}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <TabsNavigation />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('link', { name: 'Content Generated' }),
    ).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Profile' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Downloads' })).toBeInTheDocument();
  });
});

describe('profile content mutations', () => {
  beforeEach(() => {
    vi.mocked(getProfileContent).mockReset();
    vi.mocked(createProfileContent).mockReset();
    vi.mocked(updateProfileContent).mockReset();
    vi.mocked(deleteProfileContent).mockReset();
    vi.mocked(createProfileContent).mockResolvedValue(sampleItems[0] ?? null);
    vi.mocked(updateProfileContent).mockResolvedValue(sampleItems[0] ?? null);
    vi.mocked(deleteProfileContent).mockResolvedValue(undefined);
  });

  it('refetches after a successful retry', async () => {
    vi.mocked(getProfileContent)
      .mockRejectedValueOnce(new Error('Temporary outage'))
      .mockResolvedValueOnce({ items: sampleItems, total: 2 });

    renderWithQuery(<ProfileContentGeneratedRoute />);

    expect(await screen.findByRole('alert')).toHaveTextContent('Temporary outage');
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));

    await waitFor(() => {
      expect(screen.getByText('Just Listed — 12 Maple Ridge')).toBeInTheDocument();
    });
  });

  it('opens details from View and deletes the item', async () => {
    vi.mocked(getProfileContent).mockResolvedValue({
      items: sampleItems,
      total: 2,
    });
    vi.mocked(deleteProfileContent).mockResolvedValue(undefined);

    renderWithQuery(<ProfileContentGeneratedRoute />);

    fireEvent.click(
      await screen.findByRole('button', {
        name: 'View Just Listed — 12 Maple Ridge',
      }),
    );

    expect(
      await screen.findByRole('dialog', { name: 'Just Listed — 12 Maple Ridge' }),
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole('button', { name: 'Delete Just Listed — 12 Maple Ridge' }),
    );

    await waitFor(() => {
      expect(deleteProfileContent).toHaveBeenCalledWith('1');
    });
  });

  it('creates generated content from the empty state', async () => {
    vi.mocked(getProfileContent).mockResolvedValue({ items: [], total: 0 });
    vi.mocked(createProfileContent).mockResolvedValue(sampleItems[0] ?? null);

    renderWithQuery(<ProfileContentGeneratedRoute />);

    fireEvent.click(
      await screen.findByRole('button', { name: 'Create generated content' }),
    );

    fireEvent.change(screen.getByLabelText('Title'), {
      target: { value: 'Open House Invite — Sunday' },
    });
    fireEvent.change(screen.getByLabelText('Description'), {
      target: { value: 'Join us this weekend.' },
    });
    fireEvent.change(screen.getByLabelText('Content'), {
      target: { value: 'Join us this weekend.' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Create content' }));

    await waitFor(() => {
      expect(createProfileContent).toHaveBeenCalled();
    });
  });

  it('saves edits from the details panel', async () => {
    vi.mocked(getProfileContent).mockResolvedValue({
      items: sampleItems,
      total: 2,
    });
    vi.mocked(updateProfileContent).mockResolvedValue(sampleItems[0] ?? null);

    renderWithQuery(<ProfileContentGeneratedRoute />);

    fireEvent.click(
      await screen.findByRole('button', {
        name: 'View Spring Market Snapshot',
      }),
    );
    fireEvent.click(await screen.findByRole('button', { name: 'Edit Spring Market Snapshot' }));

    fireEvent.change(screen.getByLabelText('Title'), {
      target: { value: 'Updated snapshot' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save changes' }));

    await waitFor(() => {
      expect(updateProfileContent).toHaveBeenCalledWith(
        '2',
        expect.objectContaining({ title: 'Updated snapshot' }),
      );
    });
  });
});
