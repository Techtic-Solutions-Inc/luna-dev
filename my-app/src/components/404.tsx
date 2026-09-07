import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
      <h1 className="font-['EB_Garamond'] text-[84px] font-[400] leading-none text-[#c8a47e]">404</h1>
      <div className="space-y-2">
        <h2 className="text-[24px] font-[600] text-[#ffffff]">Page Not Found</h2>
        <p className="text-[16px] text-[#828282]">
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
