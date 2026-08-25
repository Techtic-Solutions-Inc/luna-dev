import { Link } from 'react-router-dom';
import { cn } from '@/lib/cn';

interface LogoProps {
  tone?: 'light' | 'gold';
  className?: string;
}

export function Logo({ tone = 'light', className }: LogoProps) {
  const markColor = tone === 'gold' ? 'text-accent' : 'text-white';
  return (
    <Link to="/" className={cn('group inline-flex flex-col leading-none interactive-ring rounded-2', className)} aria-label="Agentwise home">
      <span className={cn('font-script text-[34px] leading-none tracking-tight', markColor)}>Agentwise</span>
      <span className="mt-1 font-public-sans text-[9px] font-semibold uppercase tracking-[0.22em] text-white">
        Real Estate Marketing
      </span>
    </Link>
  );
}
