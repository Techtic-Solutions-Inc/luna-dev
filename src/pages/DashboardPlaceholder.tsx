import { Link } from 'react-router-dom';
import { clearSession, readToken } from '@/lib/auth/token';
import { logout } from '@/lib/api/auth';

export function DashboardPlaceholder() {
  async function onLogout() {
    try {
      await logout();
    } catch {
      // Session is still cleared locally if the API is unavailable.
    } finally {
      clearSession();
      window.location.assign('/signin');
    }
  }

  const signedIn = Boolean(readToken());

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#11161c] px-[20px] text-white">
      <h1 className="font-garamond text-[32px] font-medium">Signed in</h1>
      <p className="type-body-15 mt-[16px] text-[#637381]">
        {signedIn ? 'Your session is active.' : 'No session token was found.'}
      </p>
      <div className="mt-[30px] flex gap-[16px]">
        <Link to="/" className="text-[#c8a47e] underline">
          Home
        </Link>
        <button type="button" onClick={() => void onLogout()} className="text-[#c8a47e] underline">
          Sign out
        </button>
      </div>
    </main>
  );
}
