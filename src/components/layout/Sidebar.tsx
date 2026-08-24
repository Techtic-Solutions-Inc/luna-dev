import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Overview' },
  { to: '/#content', label: 'Content Library' },
];

export default function Sidebar() {
  return (
    <nav
      aria-label="Main navigation"
      className="hidden tablet:flex w-full max-w-[240px] flex-col gap-16 bg-color-16 p-padding-24 text-secondary"
    >
      <p className="font-almarai text-caption-49 text-color-14 uppercase">Studio</p>
      <ul className="flex flex-col gap-8">
        {links.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              className="block rounded-radius-10 px-padding-12 py-padding-8 font-almarai text-body-77 hover:bg-color-20 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
