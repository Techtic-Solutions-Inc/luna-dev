import { LuArrowRight, LuSparkles } from 'react-icons/lu';
import { Link } from 'react-router-dom';

import { SectionHeader } from '@/components/dashboard/DashboardSection';

export function ToolsSection() {
  return (
    <section aria-labelledby="tools-heading">
      <SectionHeader title="Your Tools" description="Two places to do the work." />

      <article className="rounded-16 border border-color-41 bg-color-36 p-20">
        <div className="flex flex-col gap-16 desktop:flex-row desktop:items-center desktop:justify-between">
          <div className="flex items-start gap-16">
            <span className="inline-flex h-44 w-44 shrink-0 items-center justify-center rounded-full bg-color-26 text-accent">
              <LuSparkles aria-hidden="true" size={20} />
            </span>
            <div>
              <h3 id="tools-heading" className="type-heading-lg-31 text-white">
                Agentwise Ultimate Mind
              </h3>
              <p className="type-body-sm-38 mt-8 max-w-[640px] text-color-14">
                Agentwise Ultimate Mind is your strategic advisor and business partner customized
                for your business — not just a generic chatbot.
              </p>
            </div>
          </div>

          <Link
            to="/ultimate-mind"
            className="type-body-sm-2 inline-flex h-40 shrink-0 items-center gap-8 self-start rounded-full bg-accent px-20 text-color-16 transition-colors duration-200 hover:bg-color-30 desktop:self-center"
          >
            Start a session
            <LuArrowRight aria-hidden="true" size={16} />
          </Link>
        </div>
      </article>
    </section>
  );
}

export default ToolsSection;
