import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { HomeItemsTable } from '@/components/features/HomeItemsTable';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function Dashboard() {
  return (
    <div className="flex w-full flex-col px-[var(--spacing-padding-60)] py-[var(--spacing-padding-40)]">
      <div className="mb-8">
        <Badge className="mb-4">Protected Route</Badge>
        <h1 className="font-['EB_Garamond'] text-[32px] font-medium leading-[41.76px] text-foreground">
          Dashboard
        </h1>
        <p className="mt-2 text-base text-muted-foreground">
          Manage visitor home content and monitor API responses.
        </p>
      </div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FontAwesomeIcon icon={faChartLine} className="text-primary" aria-hidden="true" />
            Getting Started
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Use the table below to browse paginated visitor home records from{' '}
            <code className="text-xs">GET /api/visitor/home</code>.
          </p>
        </CardContent>
      </Card>
      <HomeItemsTable />
    </div>
  );
}

export default Dashboard;
