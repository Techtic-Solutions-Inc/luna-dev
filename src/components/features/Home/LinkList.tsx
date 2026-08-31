import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export interface NavLinkItem {
  href: string;
  label: string;
}

interface LinkListProps {
  links: NavLinkItem[];
  className?: string;
  itemClassName?: string;
  ariaLabel: string;
  onNavigate?: () => void;
}

function isHashOrExternal(href: string): boolean {
  return href.startsWith('#') || href.startsWith('http://') || href.startsWith('https://');
}

export function LinkList({
  links,
  className,
  itemClassName,
  ariaLabel,
  onNavigate,
}: LinkListProps) {
  if (links.length === 0) {
    return (
      <p
        className="font-almarai text-[16px] font-[400] leading-[22px] text-sofia-background"
        role="status"
      >
        No Content Available
      </p>
    );
  }

  return (
    <nav aria-label={ariaLabel}>
      <ul className={cn('flex flex-wrap items-center', className)}>
        {links.map((link) => {
          const classNameForItem = cn(
            'font-public-sans text-[16px] font-[600] leading-[18.8px] text-sofia-secondary transition-colors',
            'hover:text-sofia-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sofia-accent',
            'focus-visible:ring-offset-2 focus-visible:ring-offset-sofia-color-103 active:opacity-80',
            itemClassName,
          );

          return (
            <li key={`${link.href}-${link.label}`}>
              {isHashOrExternal(link.href) ? (
                <a href={link.href} className={classNameForItem} onClick={onNavigate}>
                  {link.label}
                </a>
              ) : (
                <Link to={link.href} className={classNameForItem} onClick={onNavigate}>
                  {link.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
