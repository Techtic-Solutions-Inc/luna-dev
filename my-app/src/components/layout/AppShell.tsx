import { useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'

function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  const closeSidebar = () => setSidebarOpen(false)

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        menuButtonRef={menuButtonRef}
        onMenuClick={() => setSidebarOpen(true)}
      />
      <div className="relative flex flex-1">
        {sidebarOpen && (
          <button
            type="button"
            className="fixed inset-x-0 bottom-0 top-[var(--app-header-height,0px)] z-30 bg-overlay tablet:hidden"
            aria-label="Close navigation menu"
            onClick={closeSidebar}
          />
        )}
        <Sidebar
          isOpen={sidebarOpen}
          menuButtonRef={menuButtonRef}
          onNavigate={closeSidebar}
        />
        <main className="flex-1 px-layout-x py-layout-y tablet:ml-0">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AppShell
