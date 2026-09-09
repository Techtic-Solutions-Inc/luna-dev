import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NotFound = () => (
  <div className="flex flex-col items-center justify-center gap-4 px-8 py-24 text-center">
    <h1 className="font-garamond text-6xl font-semibold text-secondary">404</h1>
    <p className="font-almarai text-lg text-muted-foreground">Page not found.</p>
    <Button asChild>
      <Link to="/visitor-home">Go home</Link>
    </Button>
  </div>
);

export default NotFound;
