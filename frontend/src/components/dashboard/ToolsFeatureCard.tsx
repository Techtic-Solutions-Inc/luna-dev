import { Link } from 'react-router-dom';
import { ArrowRightIcon, UltimateMindIcon } from '@/components/icons';

export function ToolsFeatureCard() {
  return (
    <section aria-labelledby="dashboard-tools-heading">
      <div className="mb-4">
        <h2
          id="dashboard-tools-heading"
          className="font-display text-[24px] font-medium text-white sm:text-[28px]"
        >
          Your Tools
        </h2>
        <p className="mt-1 text-sm text-[#A6A4A2] sm:text-base">
          Two places to do the work.
        </p>
      </div>

      <div className="rounded-[16px] border border-white/5 bg-[#1f1b17]/80 p-5 md:flex md:items-center md:justify-between md:rounded-[20px] md:p-6">
        <div className="flex gap-4 md:items-center">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
            <UltimateMindIcon className="h-5 w-5" />
          </span>
          <div>
            <h3 className="font-display text-[20px] text-white sm:text-[22px]">
              Agentwise Ultimate Mind
            </h3>
            <p className="mt-1 max-w-[520px] text-sm leading-6 text-[#A6A4A2]">
              Your AI advisor for listings, scripts, and brand strategy — start a
              session whenever inspiration strikes.
            </p>
          </div>
        </div>
        <Link
          to="/ultimate-mind"
          className="focus-ring mt-4 inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm text-white transition-colors hover:bg-[#b48a5d] md:mt-0 md:shrink-0"
        >
          Start a session
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
