import { useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'
import { NavLink } from 'react-router-dom'
import { breakpoints } from '@/theme/breakpoints'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/dashboard', label: 'Dashboard' },
]

interface SidebarProps {
  isOpen: boolean
  menuButtonRef?: RefObject<HTMLButtonElement | null>
  onNavigate?: () => void
}

function Sidebar({ isOpen, menuButtonRef, onNavigate }: SidebarProps) {
  const navRef = useRef<HTMLElement>(null)
  const wasOpenRef = useRef(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const query = `(max-width: ${breakpoints.tablet})`
    const mediaQuery = window.matchMedia(query)
    const update = () => setIsMobile(mediaQuery.matches)
    update()
    mediaQuery.addEventListener('change', update)
    return () => mediaQuery.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!isOpen || !isMobile) return

    const firstLink = navRef.current?.querySelector('a')
    firstLink?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onNavigate?.()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, isMobile, onNavigate])

  useEffect(() => {
    if (wasOpenRef.current && !isOpen && isMobile) {
      menuButtonRef?.current?.focus()
    }
    wasOpenRef.current = isOpen
  }, [isOpen, isMobile, menuButtonRef])

  return (
    <aside
      className={cn(
        'flex w-sidebar shrink-0 flex-col border-r border-shell-border bg-shell px-sidebar-x py-sidebar-y',
        'fixed top-[var(--app-header-height,0px)] bottom-0 left-0 z-40 transform transition-transform duration-200',
        'tablet:static tablet:top-auto tablet:bottom-auto tablet:z-auto tablet:transform-none',
        isOpen ? 'translate-x-0' : '-translate-x-full tablet:translate-x-0',
      )}
      aria-label="Sidebar navigation"
      aria-hidden={isMobile && !isOpen ? true : undefined}
    >
      <div className="mb-8">
        <span className="font-heading text-heading-lg-sm font-heading-lg-sm text-accent">Sofia</span>
      </div>
      <nav ref={navRef} className="flex flex-col gap-2" aria-label="Main navigation">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                'rounded-md px-3 py-2 font-body text-body text-foreground transition-colors hover:bg-shell-border/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                isActive && 'bg-shell-border text-accent',
              )
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
