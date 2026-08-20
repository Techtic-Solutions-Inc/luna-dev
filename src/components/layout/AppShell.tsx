import Header from './Header';
import Sidebar from './Sidebar';

interface AppShellProps {
  children: React.ReactNode;
}

const AppShell = ({ children }: AppShellProps) => (
  <div className="flex min-h-screen flex-col bg-color-20 text-white">
    <Header />
    <div className="flex flex-1">
      <Sidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  </div>
);

export default AppShell;
