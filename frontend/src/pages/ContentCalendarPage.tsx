import { AppLayout } from '@/components/layout/AppLayout';
import { ContentCalendarContent } from '@/components/content-calendar/ContentCalendarContent';
import { useContentCalendar } from '@/hooks/useContentCalendar';

export function ContentCalendarPage() {
  const { loading } = useContentCalendar();

  return (
    <AppLayout creditLoading={loading}>
      <ContentCalendarContent />
    </AppLayout>
  );
}
