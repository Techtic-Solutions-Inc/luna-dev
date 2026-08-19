import React from 'react';
import { useContentCalendar } from '../hooks/useContentCalendar';
import { NavigationMenu } from '../components/NavigationMenu';
import { CalendarComponent } from '../components/CalendarComponent';
import { ContentCalendarOverview } from '../components/ContentCalendarOverview';
import { ScheduledPostsList } from '../components/ScheduledPostsList';
import { AICreditUsageDisplay } from '../components/AICreditUsageDisplay';

const ContentCalendar: React.FC = () => {
  const { data, isLoading, isError } = useContentCalendar();

  if (isLoading) {
    return <div>Loading...</div>; // Replace with skeleton components
  }

  if (isError) {
    return <div>Error loading content calendar.</div>;
  }

  if (!data || data.items.length === 0) {
    return <div>No scheduled posts available.</div>;
  }

  return (
    <div>
      <NavigationMenu />
      <ContentCalendarOverview data={data} />
      <ScheduledPostsList items={data.items} />
      <AICreditUsageDisplay />
    </div>
  );
};

export default ContentCalendar;