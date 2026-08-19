import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-4 bg-color-16 px-8 text-center text-secondary">
      <p className="font-almarai text-sm uppercase tracking-wide text-accent">404</p>
      <h1 className="font-garamond text-4xl">Page not found</h1>
      <p className="max-w-md text-color-18">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-4 rounded-full bg-accent px-6 py-3 font-almarai font-bold text-color-16"
      >
        Back to home
      </Link>
    </section>
  );
}
