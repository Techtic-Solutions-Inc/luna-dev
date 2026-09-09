import { useLocation } from 'react-router-dom';
import Header from './Header';

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
            <img
              src="/assets/figma/3917-8120.png"
              alt="Dashboard/Nav/Vertical"
              className="w-full h-auto"
            />
            <img
              src="/assets/figma/I3917-8120;1237-2083.png"
              alt="Dashboard/Nav/Vertical/Item"
              className="w-full h-auto"
            />
            <img
              src="/assets/figma/3795-12211.png"
              alt="Dashboard/Nav/Vertical"
              className="w-full h-auto"
            />
            <img
              src="/assets/figma/I3795-12211;1237-2083.png"
              alt="Dashboard/Nav/Vertical/Item"
              className="w-full h-auto"
            />
            <img
              src="/assets/figma/I3795-12211;1237-2102.png"
              alt="Dashboard/Nav/Vertical/Item"
              className="w-full h-auto"
            />
            <img
              src="/assets/figma/I3795-12211;1237-2121.png"
              alt="Dashboard/Nav/Vertical/Item"
              className="w-full h-auto"
            />
            <img
              src="/assets/figma/I3795-12211;1237-2144.png"
              alt="Dashboard/Nav/Vertical/Item"
              className="w-full h-auto"
            />
            <img
              src="/assets/figma/I3795-12211;1237-2170.png"
              alt="Dashboard/Nav/Vertical/Item"
              className="w-full h-auto"
            />
            <img
              src="/assets/figma/I3795-12211;1237-2201.png"
              alt="Dashboard/Nav/Vertical/Item"
              className="w-full h-auto"
            />
            <img
              src="/assets/figma/I3795-12211;1589-4732.png"
              alt="Dashboard/Nav/Vertical/Item"
              className="w-full h-auto"
            />
            <img
              src="/assets/figma/I3795-12211;1589-4789.png"
              alt="Dashboard/Nav/Vertical/Item"
              className="w-full h-auto"
            />
            <img
              src="/assets/figma/2295-3482.png"
              alt="Group 8"
              className="w-full h-auto"
            />
          </aside>
        )}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;
