import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '@/hooks/useAuth';

export function AppHeader() {
  const { isAuthenticated, clearToken } = useAuth();

  return (
    <header className="flex h-16 items-center justify-between border-b border-white/10 bg-color-105 px-6">
      <p className="font-serif text-xl text-white">Agentwise</p>
      {isAuthenticated() ? (
        <button
          type="button"
          className="btn-outline px-4 py-2 text-sm"
          onClick={clearToken}
          aria-label="Log out"
        >
          <FontAwesomeIcon icon={faUser} className="mr-2" aria-hidden="true" />
          Log out
        </button>
      ) : null}
    </header>
  );
}

export default AppHeader;
