import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { ContentCalendarContent } from '@/components/content-calendar/ContentCalendarContent';
import { useContentCalendar } from '@/hooks/useContentCalendar';

export function ContentCalendarDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, loading, error } = useContentCalendar();

  const handleClose = () => {
    navigate('/content-calendar');
  };

  if (!id) {
    return <Navigate to="/content-calendar" replace />;
  }

  const entryExists = data.some((entry) => entry.id === id);

  if (!loading && !error && !entryExists) {
    return <Navigate to="/content-calendar" replace />;
  }

  return (
    <AppLayout creditLoading={loading}>
      <ContentCalendarContent
        selectedEntryId={id}
        onCloseDetails={handleClose}
      />
    </AppLayout>
  );
}
