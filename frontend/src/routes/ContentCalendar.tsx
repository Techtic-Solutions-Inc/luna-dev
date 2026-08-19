import AppShell from '../components/layout/AppShell';
import ContentCalendarOverview from '../components/ContentCalendarOverview';
import { useContentCalendar } from '../hooks/useContentCalendar';

export default function ContentCalendar() {
  const { loading } = useContentCalendar();

  return (
    <AppShell creditLoading={loading}>
      <ContentCalendarOverview />
    </AppShell>
  );
}
