import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import ContentCalendarRoute from '../src/routes/content-calendar';

vi.mock('../src/lib/api/contentCalendar', () => ({
  getContentCalendar: vi.fn(),
  getContentCalendarEntries: vi.fn(),
  getContentCalendarErrorMessage: (error: unknown) =>
    error instanceof Error ? error.message : 'Failed to load calendar',
  createContentEntry: vi.fn(),
  updateContentEntry: vi.fn(),
  deleteContentEntry: vi.fn(),
}));

import { getContentCalendar } from '../src/lib/api/contentCalendar';

function renderPage() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter
        initialEntries={['/content-calendar']}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <ContentCalendarRoute />
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

describe('ContentCalendarRoute', () => {
  it('renders error alert when API fails', async () => {
    vi.mocked(getContentCalendar).mockRejectedValueOnce(
      new Error('Unable to fetch content calendar'),
    );

    renderPage();

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(
        'Unable to fetch content calendar',
      );
    });
  });
});
