import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-color-105 px-6 text-center">
      <h1 className="font-serif text-5xl text-white">404 - Page Not Found</h1>
      <p className="mt-4 font-sans text-step-desc text-color-131">The page you are looking for does not exist.</p>
      <Link to="/" className="btn-gold mt-8">
        Back to Home
      </Link>
    </main>
  );
}

export default NotFound;
