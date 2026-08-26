import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-color-105 px-[20px] text-center">
      <h1 className="font-garamond text-[40px] font-medium text-ink">Page not found</h1>
      <p className="type-body-15 mt-[12px] text-muted">That page is not part of this screen yet.</p>
      <Link
        to="/"
        className="type-body-115 mt-[24px] text-accent no-underline hover:underline"
      >
        Back to Home
      </Link>
    </main>
  );
}
