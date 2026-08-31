import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-gap-16 bg-background px-padding-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">404</p>
      <h1 className="font-garamond text-heading-xl-35 text-foreground">Page not found</h1>
      <p className="max-w-md text-body-15 text-muted-foreground">
        That route does not exist in Sofia Admin. Check the URL or return to the overview.
      </p>
      <Button asChild>
        <Link to="/">Back to overview</Link>
      </Button>
    </div>
  );
}
