export interface NavLinkItem {
  label: string;
  href: string;
}

interface LinkListProps {
  links: NavLinkItem[];
  ariaLabel: string;
  className?: string;
  itemClassName?: string;
}

export function LinkList({ links, ariaLabel, className = '', itemClassName = '' }: LinkListProps) {
  const defaultItemClass =
    'font-almarai text-body-77 text-secondary hover:text-accent active:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-radius-4 px-padding-8 py-padding-4 transition-colors';

  if (links.length === 0) {
    return (
      <nav aria-label={ariaLabel}>
        <p className="font-almarai text-body-77 text-color-14">No links available.</p>
      </nav>
    );
  }

  return (
    <nav aria-label={ariaLabel}>
      <ul className={className}>
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href} className={itemClassName || defaultItemClass}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default LinkList;
