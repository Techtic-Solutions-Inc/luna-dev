import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import type { ReactElement } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ContentCalendarOverview from '../src/components/ContentCalendarOverview';
import ContentList from '../src/components/ContentList';
import ScheduledPostsList from '../src/components/ScheduledPostsList';
import AICreditUsageDisplay from '../src/components/AICreditUsageDisplay';
import type { ContentCalendarItem } from '../src/types/api';
import { mapItemsToScheduledPosts } from '../src/lib/contentCalendarDisplay';

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

beforeEach(() => {
  vi.mocked(getContentCalendar).mockReset();
  vi.mocked(getContentCalendar).mockResolvedValue([]);
  vi.mocked(getContentCalendarEntries).mockReset();
  vi.mocked(getContentCalendarEntries).mockResolvedValue([]);
});

const sampleItems: ContentCalendarItem[] = [
  {
    id: '1',
    title: 'Market update — Austin Q2',
    date: '2026-06-01T17:30:00.000Z',
    content: 'facebook post',
    description: '',
    full_name: 'Joseph Stanley',
    phone: '',
    link: 'https://example.com/house.jpg',
    error: null,
    is_active: true,
    created_at: '2026-06-01T12:00:00.000Z',
    updated_at: '2026-06-01T12:00:00.000Z',
  },
  {
    id: '2',
    title: 'Market update — Austin Q2',
    date: '2026-06-02T17:30:00.000Z',
    content: 'instagram story',
    description: '',
    full_name: 'Joseph Stanley',
    phone: '',
    link: 'https://example.com/house-2.jpg',
    error: null,
    is_active: true,
    created_at: '2026-06-02T12:00:00.000Z',
    updated_at: '2026-06-02T12:00:00.000Z',
  },
];

function renderWithQuery(ui: ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        {ui}
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

describe('ContentCalendarOverview', () => {
  it('renders loading skeleton', async () => {
    vi.mocked(getContentCalendar).mockReturnValue(new Promise(() => undefined));

    renderWithQuery(<ContentCalendarOverview />);

    expect(
      screen.getByLabelText('Loading content calendar overview'),
    ).toBeInTheDocument();
  });

  it('renders an error message at the top of the screen', async () => {
    vi.mocked(getContentCalendar).mockRejectedValueOnce(
      new Error('Calendar unavailable'),
    );

    renderWithQuery(<ContentCalendarOverview />);

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Calendar unavailable',
    );
  });

  it('renders success state with heading and calendar', async () => {
    vi.mocked(getContentCalendar).mockResolvedValueOnce(sampleItems);

    renderWithQuery(<ContentCalendarOverview />);

    expect(
      await screen.findByRole('heading', {
        name: /Joseph.s Personal Content Calendar/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Scheduled posts/i)).toBeInTheDocument();
  });
});

describe('ScheduledPostsList', () => {
  it('renders loading skeleton', () => {
    renderWithQuery(<ScheduledPostsList items={[]} loading />);

    expect(screen.getByLabelText(/Loading scheduled posts/i)).toBeInTheDocument();
  });

  it('renders empty state message', () => {
    renderWithQuery(<ScheduledPostsList items={[]} loading={false} />);

    expect(screen.getByText(/No scheduled posts yet/i)).toBeInTheDocument();
  });

  it('renders scheduled posts in calendar grid', () => {
    renderWithQuery(<ScheduledPostsList items={sampleItems} loading={false} />);

    expect(screen.getByLabelText(/Scheduled posts/i)).toBeInTheDocument();
    expect(screen.getByText('June 2026')).toBeInTheDocument();
  });
});

describe('ContentList', () => {
  it('renders empty message', () => {
    render(<ContentList items={[]} emptyMessage="No scheduled posts yet." />);

    expect(screen.getByText('No scheduled posts yet.')).toBeInTheDocument();
  });

  it('renders list items from scheduled posts', () => {
    const posts = mapItemsToScheduledPosts(sampleItems);

    render(<ContentList items={posts} />);

    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });
});

describe('AICreditUsageDisplay', () => {
  it('renders credit usage values', () => {
    render(<AICreditUsageDisplay used={1420} limit={5000} />);

    expect(screen.getByText('AI Credit Usage')).toBeInTheDocument();
    expect(screen.getByText('1,420 / 5,000')).toBeInTheDocument();
  });

  it('renders loading skeleton', () => {
    render(<AICreditUsageDisplay loading />);

    expect(screen.getByLabelText(/AI credit usage/i)).toBeInTheDocument();
  });
});
