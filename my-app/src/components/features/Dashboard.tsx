import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function Dashboard() {
  return (
    <div className="flex flex-col px-[60px] py-[40px]">
      <div className="mb-8">
        <Badge className="mb-4">Protected Route</Badge>
        <h1 className="font-['EB_Garamond'] text-[32px] font-medium leading-[41.76px] text-foreground">
          Dashboard
        </h1>
        <p className="mt-2 text-base text-muted-foreground">
          This page is only accessible to authenticated users.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FontAwesomeIcon icon={faChartLine} className="text-primary" aria-hidden="true" />
            Getting Started
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Build your features here using the established project structure, design tokens, and
            shared components.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default Dashboard;
