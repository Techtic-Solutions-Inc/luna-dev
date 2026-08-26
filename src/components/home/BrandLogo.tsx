import { Link } from 'react-router-dom';

interface BrandLogoProps {
  gold?: boolean;
}

export function BrandLogo({ gold = false }: BrandLogoProps) {
  const color = gold ? 'text-accent' : 'text-ink';
  return (
    <Link to="/" className="flex flex-col no-underline">
      <span className={`font-kalam text-[28px] font-normal leading-none ${color}`}>Agentwise</span>
      <span className={`mt-[2px] font-public text-[9px] font-medium uppercase tracking-[0.14em] ${color}`}>
        Real Estate Marketing
      </span>
    </Link>
  );
}
