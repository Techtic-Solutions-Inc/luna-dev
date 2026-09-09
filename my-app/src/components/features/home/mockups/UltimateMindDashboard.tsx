import { Plus, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AppSidebar } from './AppSidebar';
import { MockWindow } from './MockWindow';

const MIND_PROMPTS = [
  'What should I post this week to stand out in Austin?',
  'Draft a positioning statement for my luxury buyer niche.',
  'How do I price the new Travis Heights listing?',
  'Build me a 30-day content plan around relocations.',
] as const;

interface UltimateMindDashboardProps {
  className?: string;
  sidebar?: 'dark' | 'light';
}

export function UltimateMindDashboard({
  className,
  sidebar = 'light',
}: UltimateMindDashboardProps) {
  return (
    <MockWindow className={cn('min-h-[420px]', className)}>
      <div className="flex min-h-[420px]">
        <AppSidebar active="Ultimate Mind" variant={sidebar} />
        <div className="flex min-w-0 flex-1 flex-col items-center bg-[#ffffff] px-[24px] py-[28px] text-center">
          <span
            className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#c8a47e] font-['Kalam'] text-[22px] text-[#ffffff]"
            aria-hidden="true"
          >
            a
          </span>
          <h3 className="mt-[12px] font-['EB_Garamond'] text-[24px] font-[500] text-[#1a1a1a]">
            Agentwise Ultimate Mind
          </h3>
          <p className="mt-[6px] max-w-[420px] font-['Almarai'] text-[13px] leading-[20px] text-[#666666]">
            Your strategic advisor — trained on your business, your market, and your voice. Ask
            anything.
          </p>
          <div
            className="mt-[18px] flex h-[48px] w-full max-w-[520px] items-center gap-[10px] rounded-[100px] border border-[#eaeaea] bg-[#ffffff] px-[16px] shadow-[0_4px_40px_#00000019]"
            role="presentation"
            aria-hidden="true"
          >
            <Plus className="h-[16px] w-[16px] text-[#828282]" aria-hidden="true" />
            <span className="flex-1 text-left font-['Almarai'] text-[13px] text-[#828282]">
              Ask the Mind anything about your business...
            </span>
            <span className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#c8a47e] text-[#ffffff]">
              <Sparkles className="h-[14px] w-[14px]" aria-hidden="true" />
            </span>
          </div>
          <div className="mt-[16px] grid w-full max-w-[520px] grid-cols-1 gap-[10px] md:grid-cols-2">
            {MIND_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                className="rounded-[12px] bg-[#efe4d9] p-[12px] text-left font-['Almarai'] text-[12px] leading-[18px] text-[#1a1a1a] transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a47e]"
              >
                <Sparkles className="mb-[6px] h-[12px] w-[12px] text-[#c8a47e]" aria-hidden="true" />
                {prompt}
              </button>
            ))}
          </div>
          <p className="mt-auto pt-[16px] font-['Almarai'] text-[11px] text-[#828282]">
            Trained on your business data · Austin, TX dataset active
          </p>
        </div>
      </div>
    </MockWindow>
  );
}
