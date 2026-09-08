import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-[var(--spacing-padding-60)] py-[var(--spacing-padding-40)] text-center">
      <h1 className="font-['EB_Garamond'] text-6xl font-medium text-primary">404</h1>
      <p className="mt-4 text-lg text-muted-foreground">Page Not Found</p>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        The page you are looking for does not exist or has been moved.
      </p>
      <Button asChild className="mt-8">
        <Link to="/">Return to Home</Link>
      </Button>
    </div>
  );
}

export default NotFound;
