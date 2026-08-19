import { useNavigate } from 'react-router-dom';
import { ArrowUpRightIcon, BrainIcon } from './icons';

function ToolsSectionSkeleton() {
  return (
    <section aria-busy="true" aria-label="Loading tools section">
      <span className="sr-only">Loading tools</span>
      <div className="h-8 w-32 animate-pulse rounded bg-white/10" />
      <div className="mt-2 h-4 w-48 animate-pulse rounded bg-white/10" />
      <div className="mt-6 h-[160px] animate-pulse rounded-[16px] bg-white/10" />
    </section>
  );
}

interface ToolsSectionProps {
  loading?: boolean;
}

export default function ToolsSection({ loading = false }: ToolsSectionProps) {
  const navigate = useNavigate();

  if (loading) {
    return <ToolsSectionSkeleton />;
  }

  return (
    <section aria-labelledby="dashboard-tools-heading">
      <header>
        <h2
          id="dashboard-tools-heading"
          className="font-display text-[26px] font-medium leading-tight text-white sm:text-[30px]"
        >
          Your Tools
        </h2>
        <p className="mt-1 text-[14px] text-[#A6A4A2]">
          Two places to do the work.
        </p>
      </header>

      <article className="mt-6 rounded-[16px] border border-white/5 bg-[#14100d] p-5 sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
              <BrainIcon className="h-6 w-6 text-primary" />
            </span>
            <div>
              <h3 className="font-display text-[20px] font-medium text-white sm:text-[22px]">
                Agentwise Ultimate Mind
              </h3>
              <p className="mt-2 max-w-[620px] text-[14px] leading-6 text-[#A6A4A2]">
                Agentwise Ultimate Mind is your strategic advisor and business
                partner customized for your business — not just a generic
                chatbot.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate('/ultimate-mind')}
            className="focus-ring inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-6 text-[13px] font-semibold text-[#201816] transition-opacity hover:opacity-90"
            aria-label="Start an Ultimate Mind session"
          >
            Start a session
            <ArrowUpRightIcon className="h-4 w-4" />
          </button>
        </div>
      </article>
    </section>
  );
}
