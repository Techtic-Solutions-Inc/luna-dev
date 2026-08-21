import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-ink px-6 text-center text-white">
      <h1 tabIndex={-1} className="font-serif text-5xl">
        Page Not Found
      </h1>
      <p className="mt-4 text-white/70">The page you are looking for does not exist.</p>
      <Link
        to="/"
        className="mt-8 inline-flex h-11 items-center justify-center rounded-full bg-gold px-6 font-bold text-[#1a1210]"
      >
        Back to home
      </Link>
    </main>
  );
}
