import { clearSession } from './session';

export function logout(navigate: (path: string) => void): void {
  clearSession();
  navigate('/signin');
}
