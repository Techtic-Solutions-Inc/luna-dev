import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[var(--color-16)] px-6 text-center">
      <h1
        ref={headingRef}
        tabIndex={-1}
        className="font-garamond text-4xl font-medium text-secondary"
      >
        Page Not Found
      </h1>
      <p className="mt-4 max-w-md font-almarai text-sm text-[var(--color-57)]">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex rounded-full bg-accent px-8 py-3.5 font-almarai text-sm font-bold text-[var(--color-16)]"
      >
        Back to home
      </Link>
    </main>
  );
}
