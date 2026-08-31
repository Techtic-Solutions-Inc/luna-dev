import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { visitorColors, visitorFonts } from './visitorTokens';

export interface NavLinkItem {
  href: string;
  label: string;
}

interface LinkListProps {
  links: NavLinkItem[];
  className?: string;
  itemClassName?: string;
  ariaLabel: string;
}

function isHashOrExternal(href: string): boolean {
  return href.startsWith('#') || href.startsWith('http://') || href.startsWith('https://');
}

export function LinkList({ links, className, itemClassName, ariaLabel }: LinkListProps) {
  if (links.length === 0) {
    return (
      <p
        className="text-[16px] font-[400] leading-[22px] text-[#637381]"
        style={{ fontFamily: visitorFonts.almarai, color: visitorColors.background }}
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
            'text-[16px] font-[600] leading-[18.8px] text-[#ffffff] transition-colors',
            'hover:text-[#c8a47e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a47e]',
            'focus-visible:ring-offset-2 focus-visible:ring-offset-[#11161c] active:opacity-80',
            itemClassName,
          );
          const itemStyle = {
            fontFamily: visitorFonts.publicSans,
            color: '#ffffff',
          };

          return (
            <li key={`${link.href}-${link.label}`}>
              {isHashOrExternal(link.href) ? (
                <a href={link.href} className={classNameForItem} style={itemStyle}>
                  {link.label}
                </a>
              ) : (
                <Link to={link.href} className={classNameForItem} style={itemStyle}>
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
