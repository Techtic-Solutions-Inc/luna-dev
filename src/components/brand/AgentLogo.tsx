interface AgentLogoProps {
  className?: string;
}

const AgentLogo = ({ className = '' }: AgentLogoProps) => (
  <div className={`text-center ${className}`}>
    <p
      className="font-garamond text-[2.5rem] italic leading-none text-white"
      aria-label="Agentwise"
    >
      Agentwise
    </p>
    <p className="mt-2 font-almarai text-[0.55rem] font-light uppercase tracking-[0.35em] text-color-93">
      Real Estate Marketing
    </p>
  </div>
);

export default AgentLogo;
