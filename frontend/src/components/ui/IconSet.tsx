import type { ReactNode } from 'react';

export interface IconSetItem {
  href: string;
  icon: ReactNode;
  label: string;
}

interface IconSetProps {
  className?: string;
  icons: IconSetItem[];
}

export default function IconSet({ className = '', icons }: IconSetProps) {
  return (
    <div className={className}>
      {icons.map((item) => (
        <a
          key={item.label}
          aria-label={item.label}
          className="grid h-9 w-9 place-items-center rounded-full text-color-14 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          href={item.href}
          rel="noopener noreferrer"
          target="_blank"
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
}
