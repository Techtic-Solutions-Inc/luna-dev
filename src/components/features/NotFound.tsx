import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[var(--color-16)] px-6 text-center">
    <p className="font-garamond text-8xl font-medium text-accent" aria-hidden="true">
      404
    </p>
    <h1 className="font-garamond text-3xl font-medium text-secondary">Page not found</h1>
    <p className="max-w-md font-almarai text-base text-[var(--color-57)]">
      The page you are looking for does not exist or has been moved.
    </p>
    <Link
      to="/"
      className="rounded-full bg-accent px-6 py-3 font-almarai text-sm font-bold text-[var(--color-16)] transition-opacity hover:opacity-90"
    >
      Back to home
    </Link>
  </div>
);

export default NotFound;
