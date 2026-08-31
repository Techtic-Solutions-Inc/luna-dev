import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-gap-16 bg-background px-padding-24 text-center">
      <p className="text-body-sm-2 font-semibold uppercase tracking-widest text-foreground">404</p>
      <h1 className="font-garamond text-heading-xl-35 text-foreground">Page not found</h1>
      <p className="max-w-[var(--spacing-gap-465)] text-body-15 text-muted-foreground">
        That route does not exist in Sofia Admin. Check the URL or return to the overview.
      </p>
      <Button asChild>
        <Link to="/">Back to overview</Link>
      </Button>
    </div>
  );
}
