import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
      <h1 className="font-heading text-[84px] font-[400] leading-none text-accent">404</h1>
      <div className="space-y-2">
        <h2 className="text-[24px] font-[600] text-foreground">Page Not Found</h2>
        <p className="text-[16px] text-muted-foreground">
          The page you are looking for does not exist or has been moved.
        </p>
      </div>
      <Button asChild>
        <Link to="/">Go to Home</Link>
      </Button>
    </div>
  )
}

export default NotFound
