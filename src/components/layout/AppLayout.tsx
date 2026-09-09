import { useLocation } from 'react-router-dom';
import Header from './Header';
import { FigmaDashboardNavMockups } from './FigmaDashboardNavMockups';

const MARKETING_ROUTES = ['/home', '/signup', '/login', '/terms', '/privacy'];

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
        {!isMarketing && (
          <aside className="hidden w-64 shrink-0 flex-col md:flex" aria-label="Dashboard navigation">
            <FigmaDashboardNavMockups />
          </aside>
        )}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;
