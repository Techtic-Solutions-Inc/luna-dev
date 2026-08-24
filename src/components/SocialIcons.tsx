interface SocialIconsProps {
  className?: string;
}

const icons = [
  {
    name: 'Facebook',
    href: 'https://facebook.com',
    bg: 'bg-facebook',
    path: 'M15 8h-2.5C11.67 8 11 8.67 11 9.5V11H9v3h2v7h3v-7h2.2l.8-3H14V9.7c0-.4.3-.7.7-.7H17V6h-2z',
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com',
    bg: 'bg-gradient-to-br from-color-108 via-color-122 to-color-109',
    path: 'M12 7.2A4.8 4.8 0 1 0 16.8 12 4.81 4.81 0 0 0 12 7.2zm0 7.92A3.12 3.12 0 1 1 15.12 12 3.12 3.12 0 0 1 12 15.12zM17.84 6.96a1.12 1.12 0 1 1-1.12-1.12 1.12 1.12 0 0 1 1.12 1.12zM21 7.2a6.24 6.24 0 0 0-1.7-4.42A6.3 6.3 0 0 0 14.88 1H9.12A6.3 6.3 0 0 0 4.7 2.78 6.24 6.24 0 0 0 3 7.2v5.76a6.24 6.24 0 0 0 1.7 4.42A6.3 6.3 0 0 0 9.12 23h5.76a6.3 6.3 0 0 0 4.42-1.62A6.24 6.24 0 0 0 21 16.8zM19.32 16.8a4.56 4.56 0 0 1-1.26 3.22 4.62 4.62 0 0 1-3.22 1.26H9.16a4.62 4.62 0 0 1-3.22-1.26 4.56 4.56 0 0 1-1.26-3.22V7.2A4.56 4.56 0 0 1 5.94 4a4.62 4.62 0 0 1 3.22-1.26h5.68A4.62 4.62 0 0 1 18.06 4a4.56 4.56 0 0 1 1.26 3.22z',
  },
  {
    name: 'X',
    href: 'https://x.com',
    bg: 'bg-color-136',
    path: 'M17.6 4H20l-6.16 7.04L21 20h-5.36l-4.2-5.48L6.6 20H4.16l6.6-7.52L3 4h5.48l3.8 5.04zm-.96 14.4h1.32L7.44 5.52H6.04z',
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com',
    bg: 'bg-color-120',
    path: 'M7.5 9.5H4.7V20h2.8zm-1.4-1.16A1.64 1.64 0 1 0 4.46 6.7a1.64 1.64 0 0 0 1.64 1.64zM20 20h-2.8v-5.12c0-1.22-.02-2.8-1.7-2.8s-1.96 1.34-1.96 2.72V20H10.76V9.5h2.68v1.44h.04a2.94 2.94 0 0 1 2.64-1.46c2.82 0 3.34 1.86 3.34 4.28z',
  },
  {
    name: 'TikTok',
    href: 'https://tiktok.com',
    bg: 'bg-color-105',
    path: 'M16.5 6.2a4.7 4.7 0 0 0 2.9 1V9.4a6.7 6.7 0 0 1-2.9-.72v5.5a5.18 5.18 0 1 1-5.18-5.18c.14 0 .28 0 .42.02v2.1a3.1 3.1 0 1 0 2.16 2.96V4h2.6c0 .76.28 1.5.78 2.08z',
  },
] as const;

export function SocialIcons({ className = 'flex items-center gap-gap-12' }: SocialIconsProps) {
  return (
    <ul className={className}>
      {icons.map((icon) => (
        <li key={icon.name}>
          <a
            href={icon.href}
            target="_blank"
            rel="noreferrer"
            aria-label={icon.name}
            className={`flex h-10 w-10 items-center justify-center rounded-1000 ${icon.bg} text-white shadow-tiny hover:brightness-110 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent`}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
              <path d={icon.path} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
