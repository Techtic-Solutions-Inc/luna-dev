import { logout as logoutApi } from '@/lib/api/auth';
import { clearSession } from './session';

export async function logout(navigate: (path: string) => void): Promise<void> {
  try {
    await logoutApi();
  } catch {
    // Session is cleared locally even when the server route is unavailable.
  } finally {
    clearSession();
    navigate('/signin');
  }
}
