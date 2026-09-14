import Header from './Header';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

function AppShell() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex min-h-0 flex-1">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppShell;
