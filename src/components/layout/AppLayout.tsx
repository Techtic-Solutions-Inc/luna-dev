import { useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const MARKETING_ROUTES = ['/home', '/signup', '/'];

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const location = useLocation();
  const isMarketing = MARKETING_ROUTES.includes(location.pathname);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        {!isMarketing && <Sidebar />}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;
