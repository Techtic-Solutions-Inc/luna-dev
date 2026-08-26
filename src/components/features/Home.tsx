import { Link } from 'react-router-dom';

export function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-color-103 px-[20px] text-ink">
      <h1 className="font-garamond text-[40px] font-medium">Agentwise</h1>
      <p className="type-body-15 mt-[16px] text-muted">Real estate marketing for agents.</p>
      <nav className="mt-[30px] flex gap-[24px]" aria-label="Account">
        <Link to="/signin" className="type-body-115 text-accent hover:underline">
          Sign in
        </Link>
        <Link to="/signup" className="type-body-115 text-accent hover:underline">
          Sign up
        </Link>
      </nav>
    </main>
  );
}
