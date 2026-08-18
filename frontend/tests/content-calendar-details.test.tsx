import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { ReactElement } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ContentCalendarDetails from '../src/components/ContentCalendarDetails';
import ContentManagementActions from '../src/components/ContentManagementActions';
import ContentCalendarDetailsRoute from '../src/routes/content-calendar-details';
import type { ContentCalendarItem } from '../src/types/api';

vi.mock('../src/lib/api/contentCalendar', () => ({
  getContentCalendar: vi.fn(),
  getContentCalendarEntries: vi.fn(),
  getContentCalendarErrorMessage: (error: unknown) =>
    error instanceof Error ? error.message : 'Failed to load calendar',
  createContentEntry: vi.fn(),
  updateContentEntry: vi.fn(),
  deleteContentEntry: vi.fn(),
}));

import {
  getContentCalendar,
  getContentCalendarEntries,
} from '../src/lib/api/contentCalendar';

const sampleItems: ContentCalendarItem[] = [
  {
    id: '1',
    title: 'Market update — Austin Q2',
    date: '2026-06-01T17:30:00.000Z',
    content: 'Austin stayed competitive this quarter.',
    description: 'A ready-made market snapshot for your social channels.',
    full_name: 'Joseph Stanley',
    phone: '',
    link: 'https://example.com/house.jpg',
    error: null,
    is_active: true,
    created_at: '2026-06-01T12:00:00.000Z',
    updated_at: '2026-06-01T12:00:00.000Z',
  },
];

function renderWithQuery(
  ui: ReactElement,
  initialEntries = ['/content-calendar/details?id=1'],
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

beforeEach(() => {
  vi.mocked(getContentCalendar).mockReset();
  vi.mocked(getContentCalendarEntries).mockReset();
  vi.mocked(getContentCalendar).mockResolvedValue(sampleItems);
  vi.mocked(getContentCalendarEntries).mockResolvedValue(sampleItems);
});

describe('ContentCalendarDetailsRoute', () => {
  it('renders loading skeletons', () => {
    vi.mocked(getContentCalendar).mockReturnValue(new Promise(() => undefined));
    vi.mocked(getContentCalendarEntries).mockReturnValue(
      new Promise(() => undefined),
    );

    renderWithQuery(<ContentCalendarDetailsRoute />);

    expect(
      screen.getByLabelText('Loading content calendar details'),
    ).toBeInTheDocument();
  });

  it('renders an error message at the top of the screen', async () => {
    vi.mocked(getContentCalendarEntries).mockRejectedValueOnce(
      new Error('Unable to load calendar entries'),
    );

    renderWithQuery(<ContentCalendarDetailsRoute />);

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Unable to load calendar entries',
    );
  });

  it('renders empty state when no entries exist', async () => {
    vi.mocked(getContentCalendarEntries).mockResolvedValueOnce([]);
    vi.mocked(getContentCalendar).mockResolvedValueOnce([]);

    renderWithQuery(<ContentCalendarDetailsRoute />, [
      '/content-calendar/details',
    ]);

    expect(
      await screen.findByRole('heading', {
        name: 'No personal content scheduled',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/No posts are scheduled yet. Create a calendar entry/i),
    ).toBeInTheDocument();
  });

  it('renders personal content details on success', async () => {
    renderWithQuery(<ContentCalendarDetailsRoute />);

    expect(
      await screen.findByRole('heading', { name: 'Market update — Austin Q2' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'About This Template' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Help real estate professionals create content faster/i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Customize/i }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole('button', { name: /Copy Caption/i }).length,
    ).toBeGreaterThan(0);
    expect(screen.getByRole('link', { name: /Download/i })).toBeInTheDocument();
    expect(screen.getByLabelText('Sidebar')).toBeInTheDocument();
    expect(screen.getByText('AI Credit Usage')).toBeInTheDocument();
  });
});

describe('ContentCalendarDetails', () => {
  const noopAsync = async () => true;

  it('opens customize form from the details panel', async () => {
    render(
      <ContentCalendarDetails
        item={sampleItems[0]}
        items={sampleItems}
        error={null}
        isBusy={false}
        isDeleting={false}
        isSaving={false}
        onClose={() => undefined}
        onCreate={noopAsync}
        onDelete={noopAsync}
        onSave={noopAsync}
        onSelectItem={() => undefined}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: /Customize/i }));

    expect(screen.getByLabelText('Content title')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Save changes' }),
    ).toBeInTheDocument();
  });

  it('copies the caption text', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: { writeText },
    });

    render(
      <ContentCalendarDetails
        item={sampleItems[0]}
        items={sampleItems}
        error={null}
        isBusy={false}
        isDeleting={false}
        isSaving={false}
        onClose={() => undefined}
        onCreate={noopAsync}
        onDelete={noopAsync}
        onSave={noopAsync}
        onSelectItem={() => undefined}
      />,
    );

    fireEvent.click(screen.getAllByRole('button', { name: /Copy Caption/i })[0]);

    await waitFor(() => {
      expect(writeText).toHaveBeenCalledWith(
        'Austin stayed competitive this quarter.',
      );
    });
  });
});

describe('ContentManagementActions', () => {
  it('renders customize, copy, and download controls', () => {
    render(
      <ContentManagementActions
        downloadHref="https://example.com/asset.jpg"
        onCopyCaption={() => undefined}
        onCustomize={() => undefined}
      />,
    );

    expect(screen.getByRole('button', { name: /Customize/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Copy Caption/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Download/i })).toHaveAttribute(
      'href',
      'https://example.com/asset.jpg',
    );
  });
});
