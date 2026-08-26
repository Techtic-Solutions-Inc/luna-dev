import { Link } from 'react-router-dom';

export function BrandMark({ gold = false }: { gold?: boolean }) {
  const tone = gold ? 'text-accent' : 'text-ink';
  return (
    <Link to="/" className="flex flex-col no-underline">
      <span className={`font-kalam text-[28px] font-normal leading-none ${tone}`}>Agentwise</span>
      <span
        className={`mt-[2px] font-public text-[9px] font-medium uppercase tracking-[0.14em] ${tone}`}
      >
        Real Estate Marketing
      </span>
    </Link>
  );
}
