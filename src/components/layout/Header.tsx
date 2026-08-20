import { LuMenu } from 'react-icons/lu';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onOpenNavigation?: () => void;
}

export function Header({ onOpenNavigation }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-16 py-12 desktop:hidden">
      <Link to="/" className="type-heading-lg-108 text-white" aria-label="Agentwise home">
        Agentwise
      </Link>
      {onOpenNavigation ? (
        <button
          type="button"
          onClick={onOpenNavigation}
          className="inline-flex h-36 w-36 items-center justify-center rounded-full text-white"
          aria-label="Open navigation"
        >
          <LuMenu aria-hidden="true" size={22} />
        </button>
      ) : null}
    </header>
  );
}

export default Header;
