import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createElement, type ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import DashboardRoute from '../src/routes/dashboard';
import {
  dashboardAnalyticsQueryKey,
  dashboardAnnouncementsQueryKey,
} from '../src/hooks/useDashboard';
import { contentCalendarQueryKey } from '../src/hooks/useContentCalendar';
import type {
  ContentCalendarItem,
  DashboardAnalytics,
  DashboardAnnouncement,
} from '../src/types/api';

vi.mock('../src/lib/api/contentCalendar', async () => {
  const actual = await vi.importActual<
    typeof import('../src/lib/api/contentCalendar')
  >('../src/lib/api/contentCalendar');

  return {
    ...actual,
    getContentCalendar: vi.fn(),
    getContentCalendarEntries: vi.fn(),
    createContentEntry: vi.fn(),
    updateContentEntry: vi.fn(),
    deleteContentEntry: vi.fn(),
  };
});

vi.mock('../src/lib/api/dashboard', async () => {
  const actual = await vi.importActual<typeof import('../src/lib/api/dashboard')>(
    '../src/lib/api/dashboard',
  );

  return {
    ...actual,
    getDashboardAnnouncements: vi.fn(),
    createDashboardAnnouncement: vi.fn(),
    getDashboardAnalytics: vi.fn(),
  };
});

import { getContentCalendar } from '../src/lib/api/contentCalendar';
import {
  createDashboardAnnouncement,
  getDashboardAnalytics,
  getDashboardAnnouncements,
} from '../src/lib/api/dashboard';

const mockedGetContentCalendar = vi.mocked(getContentCalendar);
const mockedGetAnnouncements = vi.mocked(getDashboardAnnouncements);
const mockedCreateAnnouncement = vi.mocked(createDashboardAnnouncement);
const mockedGetAnalytics = vi.mocked(getDashboardAnalytics);

const sampleCalendarItem: ContentCalendarItem = {
  id: 'cal-1',
  title: 'Market update — Austin Q2',
  date: '2026-06-01T17:30:00.000Z',
  content: 'facebook reel',
  description: 'Quarterly snapshot',
  full_name: 'Ava Stone',
  phone: '',
  link: 'https://example.com/house.jpg',
  error: null,
  is_active: true,
  created_at: '2026-06-01T12:00:00.000Z',
  updated_at: '2026-06-01T12:00:00.000Z',
};

const sampleAnnouncement: DashboardAnnouncement = {
  id: 'ann-1',
  title: 'Spring listing template pack is live',
  description: 'New templates for luxury listings.',
  date: new Date().toISOString(),
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const sampleAnalytics: DashboardAnalytics = {
  downloads: 312,
  content_generated: 247,
  ai_credits_used: 1420,
  ai_credits_limit: 5000,
  activities: [
    {
      id: 'act-1',
      title: 'What should I post this week to stand out in Austin?',
      description: '',
      date: new Date().toISOString(),
    },
  ],
};

function renderDashboard() {
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
          initialEntries: ['/dashboard'],
          future: { v7_startTransition: true, v7_relativeSplatPath: true },
        },
        children,
      ),
    );
  }

  return render(createElement(DashboardRoute), { wrapper: Wrapper });
}

describe('dashboard query keys', () => {
  it('uses dashboard and calendar query keys', () => {
    expect(dashboardAnnouncementsQueryKey).toEqual(['dashboard-announcements']);
    expect(dashboardAnalyticsQueryKey).toEqual(['dashboard-analytics']);
    expect(contentCalendarQueryKey).toEqual(['content-calendar']);
  });
});

describe('DashboardRoute states', () => {
  beforeEach(() => {
    mockedGetContentCalendar.mockReset();
    mockedGetAnnouncements.mockReset();
    mockedCreateAnnouncement.mockReset();
    mockedGetAnalytics.mockReset();
    mockedGetContentCalendar.mockResolvedValue([sampleCalendarItem]);
    mockedGetAnnouncements.mockResolvedValue([sampleAnnouncement]);
    mockedGetAnalytics.mockResolvedValue(sampleAnalytics);
    mockedCreateAnnouncement.mockResolvedValue({
      ...sampleAnnouncement,
      id: 'ann-2',
      title: 'Live workshop',
    });
  });

  it('renders loading skeletons', async () => {
    mockedGetContentCalendar.mockImplementation(() => new Promise(() => undefined));
    mockedGetAnnouncements.mockImplementation(() => new Promise(() => undefined));
    mockedGetAnalytics.mockImplementation(() => new Promise(() => undefined));

    renderDashboard();

    expect(
      await screen.findByLabelText('Loading dashboard overview'),
    ).toBeInTheDocument();
  });

  it('renders an error message at the top of the screen', async () => {
    mockedGetAnnouncements.mockRejectedValue(new Error('Announcements unavailable'));

    renderDashboard();

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Announcements unavailable',
    );
  });

  it('renders empty states when there is no data', async () => {
    mockedGetContentCalendar.mockResolvedValue([]);
    mockedGetAnnouncements.mockResolvedValue([]);
    mockedGetAnalytics.mockResolvedValue(null);

    renderDashboard();

    expect(
      await screen.findByText('No analytics are available yet.'),
    ).toBeInTheDocument();
    expect(screen.getByText('No scheduled posts this week.')).toBeInTheDocument();
    expect(screen.getByText('No scheduled posts yet.')).toBeInTheDocument();
    expect(screen.getByText('No announcements yet.')).toBeInTheDocument();
    expect(screen.getByText('No recent activity yet.')).toBeInTheDocument();
  });

  it('renders dashboard sections on success', async () => {
    renderDashboard();

    expect(
      await screen.findByRole('heading', { name: /Good (Morning|Afternoon|Evening), Ava\./i }),
    ).toBeInTheDocument();
    expect(screen.getByText('Your Tools')).toBeInTheDocument();
    expect(screen.getByText('Your Content Calendar')).toBeInTheDocument();
    expect(screen.getByText('Recent Activity')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Announcements' }),
    ).toBeInTheDocument();
    expect(screen.getByText('312')).toBeInTheDocument();
    expect(screen.getByText('247')).toBeInTheDocument();
    expect(
      screen.getByText('Spring listing template pack is live'),
    ).toBeInTheDocument();
    expect(screen.getAllByText('Market update — Austin Q2').length).toBeGreaterThan(
      0,
    );
  });

  it('posts a new announcement', async () => {
    renderDashboard();

    await screen.findByText('Spring listing template pack is live');

    fireEvent.change(screen.getByLabelText('Announcement title'), {
      target: { value: 'Live workshop' },
    });
    fireEvent.click(screen.getByLabelText('Post announcement'));

    await waitFor(() => {
      expect(mockedCreateAnnouncement).toHaveBeenCalledWith(
        {
          title: 'Live workshop',
          description: '',
        },
        expect.anything(),
      );
    });
  });
});
