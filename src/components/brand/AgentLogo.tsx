interface AgentLogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

const AgentLogo = ({ className = '', variant = 'dark' }: AgentLogoProps) => (
  <div className={`text-center ${className}`}>
    <p
      className={`font-garamond text-[2.5rem] italic leading-none ${
        variant === 'light' ? 'text-color-20' : 'text-white'
      }`}
      aria-label="Agentwise"
    >
      Agentwise
    </p>
    <p
      className={`mt-2 font-almarai text-[0.55rem] font-light uppercase tracking-[0.35em] ${
        variant === 'light' ? 'text-color-57' : 'text-color-93'
      }`}
    >
      Real Estate Marketing
    </p>
  </div>
);

export default AgentLogo;
