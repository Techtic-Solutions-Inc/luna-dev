import { useNavigate } from 'react-router-dom';
import { ArrowUpRightIcon, SparkIcon } from './icons';

export default function ToolsSection() {
  const navigate = useNavigate();

  return (
    <section aria-labelledby="dashboard-tools-heading">
      <div className="mb-4">
        <h2
          id="dashboard-tools-heading"
          className="font-display text-[24px] leading-none text-[#F8F2EB] sm:text-[28px]"
        >
          Your Tools
        </h2>
        <p className="mt-2 text-[14px] text-[#9A8F84]">
          Two places to do the work.
        </p>
      </div>

      <article className="rounded-[20px] border border-white/10 bg-[#14100d] px-5 py-5 sm:px-6 sm:py-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
              <SparkIcon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-[22px] leading-tight text-[#F8F2EB]">
                Agentwise Ultimate Mind
              </h3>
              <p className="mt-2 max-w-[620px] text-[14px] leading-7 text-[#A89B8E]">
                Agentwise Ultimate Mind is your strategic advisor and business
                partner customized for your business — not just a generic
                chatbot.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate('/ultimate-mind')}
            className="focus-ring inline-flex h-10 shrink-0 items-center justify-center rounded-full bg-primary px-5 text-[13px] text-[#0b0b0b] transition-colors duration-200 hover:bg-[#d4b089]"
            aria-label="Start an Ultimate Mind session"
          >
            Start a session
            <ArrowUpRightIcon className="ml-2 h-3.5 w-3.5" />
          </button>
        </div>
      </article>
    </section>
  );
}
