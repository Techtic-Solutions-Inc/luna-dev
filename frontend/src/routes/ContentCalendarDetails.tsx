import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { ContentCalendarDetailsSkeleton } from '../components/ContentCalendarDetails';
import AppShell from '../components/layout/AppShell';
import ContentCalendarOverview from '../components/ContentCalendarOverview';
import { useContentCalendar } from '../hooks/useContentCalendar';

export default function ContentCalendarDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, loading, error } = useContentCalendar();

  const onCloseDetails = () => {
    navigate('/content-calendar');
  };

  if (!id) {
    return <Navigate to="/content-calendar" replace />;
  }

  return (
    <AppShell creditLoading={loading}>
      <ContentCalendarOverview
        selectedEntryId={id}
        onCloseDetails={onCloseDetails}
      />
      {loading ? (
        <ContentCalendarDetailsSkeleton onClose={onCloseDetails} />
      ) : null}
      {!loading && !error && !data.some((entry) => entry.id === id) ? (
        <Navigate to="/content-calendar" replace />
      ) : null}
    </AppShell>
  );
}
