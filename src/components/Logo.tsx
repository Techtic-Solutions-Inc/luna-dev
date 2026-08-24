import { Link } from 'react-router-dom';

interface LogoProps {
  to?: string;
  accent?: boolean;
  className?: string;
}

export function Logo({ to = '/home', accent = false, className = '' }: LogoProps) {
  const color = accent ? 'text-accent' : 'text-white';

  return (
    <Link
      to={to}
      className={`inline-flex flex-col leading-none ${color} ${className}`.trim()}
      aria-label="Agentwise home"
    >
      <span className="font-kalam text-[32px] font-bold tracking-tight">Agentwise</span>
      <span className="mt-1 font-almarai text-[8px] font-normal uppercase tracking-[0.28em] text-white">
        Real Estate Marketing
      </span>
    </Link>
  );
}
