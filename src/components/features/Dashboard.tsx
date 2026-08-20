import { ContentCalendar } from '@/components/dashboard/ContentCalendar';
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';
import { RecentActivityFeed } from '@/components/dashboard/RecentActivityFeed';
import { ToolsSection } from '@/components/dashboard/ToolsSection';

export function Dashboard() {
  return (
    <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-32">
      <DashboardOverview />
      <ToolsSection />
      <ContentCalendar />
      <RecentActivityFeed />
    </div>
  );
}

export default Dashboard;
