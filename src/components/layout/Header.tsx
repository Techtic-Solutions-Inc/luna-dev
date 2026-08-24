import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b border-color-20 bg-color-16 px-padding-24 py-padding-16">
      <Link to="/" className="font-garamond text-heading-lg-26 text-secondary" aria-label="Agentwise home">
        Agentwise
      </Link>
      <span className="font-almarai text-body-sm-106 text-color-14">REAL ESTATE MARKETING</span>
      <FontAwesomeIcon icon={faBars} className="text-secondary desktop:hidden" aria-hidden="true" />
    </header>
  );
}
