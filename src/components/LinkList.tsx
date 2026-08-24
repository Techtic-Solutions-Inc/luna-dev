import { Link } from 'react-router-dom';
import { cn } from '@/lib/cn';
import type { NavLinkItem } from '@/types/home';

export interface LinkListProps {
  links: NavLinkItem[];
  className?: string;
  itemClassName?: string;
  ariaLabel: string;
}

function isInternal(href: string): boolean {
  return href.startsWith('/') || href.startsWith('#');
}

export function LinkList({ links, className, itemClassName, ariaLabel }: LinkListProps) {
  if (links.length === 0) {
    return (
      <p className="font-sans text-almarai text-color-135" role="status">
        No links are available.
      </p>
    );
  }

  return (
    <nav aria-label={ariaLabel}>
      <ul className={cn('flex flex-wrap items-center', className)}>
        {links.map((link) => (
          <li key={`${link.label}-${link.href}`}>
            {isInternal(link.href) ? (
              <Link to={link.href} className={cn('nav-link', itemClassName)}>
                {link.label}
              </Link>
            ) : (
              <a href={link.href} className={cn('nav-link', itemClassName)} rel="noreferrer">
                {link.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
