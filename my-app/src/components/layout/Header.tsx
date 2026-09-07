import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'

function Header() {
  const { isAuthenticated, logout } = useAuth()
  const authenticated = isAuthenticated()

  return (
    <header className="flex items-center justify-between border-b border-[#3a3541] bg-[#0e0d0d] px-[24px] py-[16px]">
      <div>
        <h1 className="font-['EB_Garamond'] text-[32px] font-[500] text-[#ffffff]">Application</h1>
        <p className="text-[16px] font-[400] text-[#828282]">Frontend workspace</p>
      </div>
      {authenticated && (
        <Button variant="outline" onClick={logout} type="button">
          Sign out
        </Button>
      )}
    </header>
  )
}

export default Header
