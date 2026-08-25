import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const AppShell = () => (
  <div className="flex min-h-screen bg-color-106">
    <Sidebar />
    <main className="flex-1 overflow-x-hidden">
      <Outlet />
    </main>
  </div>
);

export default AppShell;
