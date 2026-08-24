import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-24 bg-color-24 px-padding-32 text-secondary">
      <h1 tabIndex={-1} className="font-garamond text-heading-xl-37 text-center">
        404 — Page Not Found
      </h1>
      <p className="font-almarai text-body-34 text-color-14 text-center max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="rounded-radius-10000 bg-accent px-padding-24 py-padding-12 font-almarai text-body-77 text-secondary hover:bg-[#b8936a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        Back to home
      </Link>
    </main>
  );
}
