import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import type { NavLink } from './constants'

interface LinkListProps {
  links: NavLink[]
  className?: string
  linkClassName?: string
  variant?: 'header' | 'footer'
}

export function LinkList({ links, className, linkClassName, variant = 'header' }: LinkListProps) {
  if (links.length === 0) {
    return null
  }

  const baseLinkClass =
    variant === 'header'
      ? 'vh-font-public-sans text-[16px] font-[400] leading-[18.8px] text-[#ffffff] transition-colors hover:text-[var(--vh-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--vh-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--vh-color-105)] active:text-[color-mix(in_srgb,var(--vh-accent)_80%,transparent)]'
      : 'vh-font-almarai vh-body text-[#ffffff] transition-colors hover:text-[var(--vh-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--vh-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--vh-color-101)] active:text-[color-mix(in_srgb,var(--vh-accent)_80%,transparent)]'

  return (
    <nav aria-label={variant === 'header' ? 'Main navigation' : 'Footer navigation'}>
      <ul className={cn('flex flex-wrap items-center gap-[24px]', className)}>
        {links.map((link) => (
          <li key={link.label}>
            {link.href.startsWith('/') ? (
              <Link to={link.href} className={cn(baseLinkClass, linkClassName)}>
                {link.label}
              </Link>
            ) : (
              <a href={link.href} className={cn(baseLinkClass, linkClassName)}>
                {link.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
