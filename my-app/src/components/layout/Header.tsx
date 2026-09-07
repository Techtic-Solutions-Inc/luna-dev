import { useLayoutEffect, useRef, useState } from 'react'
import { Menu } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { Button } from '@/components/ui/button'

interface HeaderProps {
  menuButtonRef?: React.RefObject<HTMLButtonElement | null>
  onMenuClick?: () => void
}

function Header({ menuButtonRef, onMenuClick }: HeaderProps) {
  const { isAuthenticated, logout } = useAuth()
  const authenticated = isAuthenticated()
  const [signOutOpen, setSignOutOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const header = headerRef.current
    if (!header) return

    const syncHeaderHeight = () => {
      document.documentElement.style.setProperty(
        '--app-header-height',
        `${header.offsetHeight}px`,
      )
    }

    syncHeaderHeight()
    const observer = new ResizeObserver(syncHeaderHeight)
    observer.observe(header)
    return () => observer.disconnect()
  }, [])

  const handleSignOut = () => {
    logout()
    setSignOutOpen(false)
  }

  return (
    <>
      <header
        ref={headerRef}
        className="relative z-50 flex items-center justify-between border-b border-shell-border bg-shell px-layout-x py-layout-y"
      >
        <div className="flex items-center gap-3">
          {onMenuClick && (
            <Button
              ref={menuButtonRef}
              type="button"
              variant="ghost"
              size="icon"
              className="tablet:hidden"
              onClick={onMenuClick}
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <div>
            <h1 className="font-heading text-heading-xl font-heading-xl text-foreground">Application</h1>
            <p className="font-body text-body text-muted-foreground">Frontend workspace</p>
          </div>
        </div>
        {authenticated && (
          <Button variant="outline" onClick={() => setSignOutOpen(true)} type="button">
            Sign out
          </Button>
        )}
      </header>

      <ConfirmDialog
        open={signOutOpen}
        onOpenChange={setSignOutOpen}
        title="Sign out?"
        description="You will be signed out of your session. You can sign in again at any time."
        confirmLabel="Sign out"
        onConfirm={handleSignOut}
      />
    </>
  )
}

export default Header
