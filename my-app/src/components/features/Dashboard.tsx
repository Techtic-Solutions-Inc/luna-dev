import { useNavigate } from 'react-router-dom'
import { LayoutDashboard } from 'lucide-react'
import { EmptyState } from '@/components/EmptyState'

function Dashboard() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-heading text-heading-lg font-heading-lg text-foreground">Dashboard</h2>
      <EmptyState
        icon={LayoutDashboard}
        title="No dashboard data yet"
        description="This protected route is ready. Dashboard widgets and metrics will appear here once backend endpoints are available."
        actionLabel="Back to Home"
        onAction={() => navigate('/')}
      />
    </div>
  )
}

export default Dashboard
