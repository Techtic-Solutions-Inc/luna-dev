import { Link } from 'react-router-dom';
import type { HomeLink } from '../types/home';
import { List } from './List';

export type LinkListVariant = 'inline' | 'footer' | 'stacked';

export interface LinkListProps {
  links: HomeLink[];
  className?: string;
  ariaLabel?: string;
  variant?: LinkListVariant;
}

const VARIANT_CLASSES: Record<LinkListVariant, string> = {
  inline: 'flex flex-wrap items-center gap-x-gap-20 gap-y-gap-12',
  footer: 'flex flex-wrap items-center gap-x-gap-20 gap-y-gap-12',
  stacked: 'flex flex-col gap-gap-16',
};

export function LinkList({
  links,
  className,
  ariaLabel = 'Page links',
  variant = 'inline',
}: LinkListProps) {
  const listClass = className ?? VARIANT_CLASSES[variant];

  if (links.length === 0) {
    return (
      <p className="font-almarai text-almarai-16 text-color-134" role="status">
        No links are available.
      </p>
    );
  }

  return (
    <List className={listClass} ariaLabel={ariaLabel}>
      {links.map((link) => (
        <li key={`${link.href}-${link.label}`}>
          <Link
            to={link.href}
            className={
              variant === 'footer'
                ? 'text-link font-almarai text-almarai-16 text-color-134 hover:text-white'
                : 'text-link'
            }
          >
            {link.label}
          </Link>
        </li>
      ))}
    </List>
  );
}
