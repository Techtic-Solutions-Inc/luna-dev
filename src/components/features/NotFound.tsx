import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#11161c] px-[20px] text-white">
      <h1 className="font-garamond text-[40px] font-medium">Page not found</h1>
      <Link to="/" className="type-body-115 mt-[20px] text-[#c8a47e] no-underline hover:underline">
        Return home
      </Link>
    </main>
  );
}
