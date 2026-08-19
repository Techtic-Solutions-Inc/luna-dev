import { getGreetingHeadline } from '@/utils/dashboard';

interface DashboardGreetingProps {
  subtext: string;
}

export function DashboardGreeting({ subtext }: DashboardGreetingProps) {
  return (
    <header>
      <h1
        id="dashboard-greeting-heading"
        className="font-display text-[28px] font-medium leading-tight text-white sm:text-[42px]"
      >
        {getGreetingHeadline()}
      </h1>
      <p className="mt-3 max-w-[720px] text-base leading-7 text-[#A6A4A2] sm:text-lg">
        {subtext}
      </p>
    </header>
  );
}
