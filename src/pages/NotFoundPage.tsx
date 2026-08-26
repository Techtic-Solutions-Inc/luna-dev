import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-canvas p-8">
      <h1 className="text-[32px] font-medium leading-[41.76px] text-ink">Page Not Found</h1>
      <p className="text-[16px] text-muted">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link
        to="/"
        className="text-accent hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        Go home
      </Link>
    </div>
  );
}
