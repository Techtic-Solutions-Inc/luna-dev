import { cn } from '@/lib/utils/cn';

export interface LogoProps {
  className?: string;
  /** Size of the script wordmark; the tagline scales with it. */
  size?: 'sm' | 'md';
}

const wordmarkClasses: Record<'sm' | 'md', string> = {
  sm: 'text-[22px]',
  md: 'text-[26px]',
};

export function Logo({ className, size = 'md' }: LogoProps) {
  return (
    <span className={cn('inline-flex flex-col items-center leading-none', className)}>
      <span className={cn('font-kalam font-bold leading-none', wordmarkClasses[size])}>
        Agentwise
      </span>
      <span className="type-caption-96 mt-3 uppercase tracking-[0.2em] text-white/90">
        Real Estate Marketing
      </span>
    </span>
  );
}

export default Logo;
