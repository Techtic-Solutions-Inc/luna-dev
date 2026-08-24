import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface HeaderProps {
  title?: string;
}

export default function Header({ title = 'Agentwise' }: HeaderProps) {
  const { isAuthenticated, clearToken } = useAuth();
  const navigate = useNavigate();
  const signedIn = isAuthenticated();

  const handleLogout = () => {
    clearToken();
    navigate('/', { replace: true });
  };

  return (
    <header className="flex min-h-padding-60 items-center justify-between border-b border-color-26 bg-color-16 px-padding-24 py-padding-16">
      <h1 className="typo-heading-lg-26 text-secondary">{title}</h1>
      <div className="flex items-center gap-gap-16">
        {signedIn ? (
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-gap-8 rounded-radius-12 px-padding-12 py-padding-8 typo-body-sm-106 text-color-15 hover:bg-color-89 hover:text-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:bg-color-81 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FontAwesomeIcon icon={faRightFromBracket} aria-hidden="true" />
            Logout
          </button>
        ) : (
          <NavLink
            to="/"
            className="rounded-radius-12 px-padding-12 py-padding-8 typo-body-sm-106 text-color-15 hover:bg-color-89 hover:text-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Home
          </NavLink>
        )}
      </div>
    </header>
  );
}
