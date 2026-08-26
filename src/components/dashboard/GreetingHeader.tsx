function getGreetingPrefix(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour <= 11) return 'Good Morning';
  if (hour >= 12 && hour <= 16) return 'Good Afternoon';
  return 'Good Evening';
}

interface GreetingHeaderProps {
  fullName: string;
}

export function GreetingHeader({ fullName }: GreetingHeaderProps) {
  return (
    <h1 className="text-[32px] font-medium leading-[41.76px] text-ink">
      {getGreetingPrefix()}, {fullName}.
    </h1>
  );
}
