interface BrandLogoProps {
  align?: 'center' | 'start';
  tone?: 'light' | 'accent';
}

export default function BrandLogo({ align = 'center', tone = 'light' }: BrandLogoProps) {
  const colorClassName = tone === 'accent' ? 'text-accent' : 'text-secondary';

  return (
    <div className={`flex flex-col ${align === 'start' ? 'items-start' : 'items-center'}`}>
      <p className={`font-kalam text-[28px] font-bold leading-none ${colorClassName}`}>Agentwise</p>
      <p
        className={`mt-1 font-almarai text-[10px] font-normal tracking-[0.22em] ${colorClassName}`}
      >
        REAL ESTATE MARKETING
      </p>
    </div>
  );
}
