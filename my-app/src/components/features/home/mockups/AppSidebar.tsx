import { LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

const SIDEBAR_AVATAR =
  '/assets/figma/attlgjgqkngefohwz-large-img6232-1-I2295-3482-65-2289.png';

function SidebarItem({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <div
      className={cn(
        'rounded-[8px] px-[12px] py-[8px] font-[\'Almarai\'] text-[13px]',
        active ? 'bg-[#ffffff]/10 text-[#ffffff]' : 'text-[#ffffff]/60',
      )}
    >
      {label}
    </div>
  );
}

export type AppSidebarActive =
  | 'Overview'
  | 'Content Library'
  | 'Content Calendar'
  | 'Ultimate Mind';

interface AppSidebarProps {
  active: AppSidebarActive;
  variant?: 'dark' | 'light';
  className?: string;
}

export function AppSidebar({ active, variant = 'dark', className }: AppSidebarProps) {
  const isLight = variant === 'light';

  return (
    <aside
      className={cn(
        'hidden w-[180px] shrink-0 border-r p-[16px] md:block',
        isLight
          ? 'border-[#eaeaea] bg-[#f7f2ec] text-[#1a1a1a]'
          : 'border-[#ffffff]/10 bg-[#1d1818]',
        className,
      )}
    >
      <p
        className={cn(
          'mb-[20px] font-[\'Kalam\'] text-[18px]',
          isLight ? 'text-[#1a1a1a]' : 'text-[#ffffff]',
        )}
      >
        Agentwise
      </p>
      <p
        className={cn(
          'mb-[8px] font-[\'Public_Sans\'] text-[10px] font-[600] uppercase tracking-wider',
          isLight ? 'text-[#637381]' : 'text-[#ffffff]/40',
        )}
      >
        Studio
      </p>
      <div className="mb-[16px] space-y-[2px]">
        <SidebarItem label="Overview" active={active === 'Overview'} />
        <SidebarItem label="Content Library" active={active === 'Content Library'} />
        <SidebarItem label="Content Calendar" active={active === 'Content Calendar'} />
      </div>
      <p
        className={cn(
          'mb-[8px] font-[\'Public_Sans\'] text-[10px] font-[600] uppercase tracking-wider',
          isLight ? 'text-[#637381]' : 'text-[#ffffff]/40',
        )}
      >
        Tools
      </p>
      <SidebarItem label="Ultimate Mind" active={active === 'Ultimate Mind'} />
      {!isLight && (
        <>
          <div className="mt-[24px] rounded-[8px] bg-[#ffffff]/5 p-[10px]">
            <p className="font-['Almarai'] text-[10px] text-[#ffffff]/50">AI Credit Usage</p>
            <div className="mt-[6px] h-[4px] rounded-full bg-[#ffffff]/10">
              <div className="h-full w-[28%] rounded-full bg-[#c8a47e]" />
            </div>
            <p className="mt-[4px] font-['Almarai'] text-[10px] text-[#ffffff]/40">1,420 / 5,000</p>
          </div>
          <div className="mt-[16px] flex items-center gap-[8px]">
            <img
              src={SIDEBAR_AVATAR}
              alt="Joseph Stanley headshot"
              className="h-[28px] w-[28px] rounded-full object-cover"
            />
            <div>
              <p className="font-['Almarai'] text-[11px] font-[700] text-[#ffffff]">Joseph Stanley</p>
              <span className="flex items-center gap-[4px] font-['Almarai'] text-[10px] text-[#ffffff]/40">
                <LogOut className="h-3 w-3" aria-hidden="true" />
                Logout
              </span>
            </div>
          </div>
        </>
      )}
    </aside>
  );
}
