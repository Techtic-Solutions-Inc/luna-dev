const iconClass =
  "inline-flex h-36 w-36 items-center justify-center rounded-1000 transition hover:scale-105 hover:opacity-90 focus-visible:ring-2 focus-visible:ring-accent active:scale-95";

export function HeroSocialIcons() {
  return (
    <ul className="mt-24 flex items-center gap-12" aria-label="Platforms">
      <li>
        <a className={`${iconClass} bg-color-13`} href="#contact" aria-label="Facebook">
          <FacebookMark />
        </a>
      </li>
      <li>
        <a
          className={`${iconClass} bg-gradient-to-br from-color-117 via-color-122 to-color-109`}
          href="#contact"
          aria-label="Instagram"
        >
          <InstagramMark />
        </a>
      </li>
      <li>
        <a className={`${iconClass} bg-color-16`} href="#contact" aria-label="TikTok">
          <TikTokMark />
        </a>
      </li>
      <li>
        <a className={`${iconClass} bg-secondary`} href="#contact" aria-label="Gmail">
          <GmailMark />
        </a>
      </li>
      <li>
        <a className={`${iconClass} bg-color-120`} href="#contact" aria-label="LinkedIn">
          <LinkedInMark />
        </a>
      </li>
    </ul>
  );
}

export function FooterSocialIcons({ tone = "light" }: { tone?: "light" | "accent" }) {
  const color = tone === "accent" ? "text-accent" : "text-secondary";
  const item = `${color} transition hover:opacity-80 focus-visible:text-accent active:opacity-70`;
  return (
    <ul className="flex items-center gap-20" aria-label="Social">
      <li>
        <a className={item} href="#contact" aria-label="Facebook">
          <FacebookOutline />
        </a>
      </li>
      <li>
        <a className={item} href="#contact" aria-label="X">
          <XMark />
        </a>
      </li>
      <li>
        <a className={item} href="#contact" aria-label="LinkedIn">
          <LinkedInOutline />
        </a>
      </li>
      <li>
        <a className={item} href="#contact" aria-label="Instagram">
          <InstagramOutline />
        </a>
      </li>
    </ul>
  );
}

function FacebookMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" fill="#ffffff">
      <path d="M14.5 8.5V6.8c0-.7.5-1.3 1.6-1.3H18V3h-2.3C13.2 3 12 4.5 12 6.6v1.9H9.5V11H12v10h2.5V11H17l.5-2.5h-3Z" />
    </svg>
  );
}

function InstagramMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="#ffffff" strokeWidth="1.8">
      <rect x="4" y="4" width="16" height="16" rx="5" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="#ffffff" stroke="none" />
    </svg>
  );
}

function TikTokMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#00f7ef" d="M14.2 4c.4 2.6 1.9 4.2 4.3 4.5v2.3c-1.5 0-2.9-.5-4.1-1.4v6.4c0 3.3-2.6 5.7-6.1 5.7S2.2 19.1 2.2 15.8 4.8 10 8.3 10c.4 0 .8 0 1.2.1v2.5c-.4-.2-.8-.2-1.2-.2-1.9 0-3.3 1.4-3.3 3.4s1.4 3.4 3.3 3.4 3.3-1.4 3.3-3.4V4h2.6Z" />
      <path fill="#ffffff" d="M13.4 4c.4 2.4 1.7 3.9 3.9 4.3v1.8c-1.3.1-2.6-.3-3.7-1.1v6.7c0 2.9-2.3 5.1-5.4 5.1S2.8 18.6 2.8 15.7 5.1 10.6 8.2 10.6c.3 0 .7 0 1 .1v1.9c-.3-.1-.6-.2-1-.2-1.7 0-3 1.3-3 3.3s1.3 3.3 3 3.3 3-1.3 3-3.3V4h2.2Z" />
    </svg>
  );
}

function GmailMark() {
  return (
    <svg width="18" height="14" viewBox="0 0 24 18" aria-hidden="true">
      <path fill="#4285f4" d="M1.5 16.5V6l6.5 4.9v7.1H3A1.5 1.5 0 0 1 1.5 16.5Z" />
      <path fill="#34a853" d="M22.5 16.5V6L16 10.9v7.1h4.5a1.5 1.5 0 0 0 1.5-1.5Z" />
      <path fill="#fbbc04" d="M16 10.9 22.5 6V3.8c0-1.3-1.5-2.1-2.6-1.3L16 5.5v5.4Z" />
      <path fill="#ea4335" d="M8 10.9 1.5 6V3.8c0-1.3 1.5-2.1 2.6-1.3L8 5.5v5.4Z" />
      <path fill="#c5221f" d="M8 10.9 12 14l4-3.1V5.5L12 8.6 8 5.5v5.4Z" />
    </svg>
  );
}

function LinkedInMark() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" fill="#ffffff">
      <path d="M6.5 9H4v11h2.5V9ZM5.2 4C4.3 4 3.5 4.8 3.5 5.8S4.3 7.6 5.2 7.6 7 6.8 7 5.8 6.2 4 5.2 4ZM20 13.3c0-3-1.6-4.4-3.7-4.4-1.7 0-2.5 1-2.9 1.6V9H11v11h2.5v-6.1c0-1.6.3-3.1 2.3-3.1s2 1.8 2 3.2V20H20v-6.7Z" />
    </svg>
  );
}

function FacebookOutline() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M14.5 8.5V6.8c0-.7.5-1.3 1.6-1.3H18V3h-2.3C13.2 3 12 4.5 12 6.6v1.9H9.5V11H12v10h2.5V11H17l.5-2.5h-3Z" />
    </svg>
  );
}

function XMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M17.4 3h3.1l-6.8 7.8L22 21h-6.2l-4.8-6.3L5.5 21H2.4l7.3-8.3L2 3h6.4l4.4 5.8L17.4 3Zm-1.1 16.2h1.7L7.8 4.7H6L16.3 19.2Z" />
    </svg>
  );
}

function LinkedInOutline() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M6.5 9H4v11h2.5V9ZM5.2 4C4.3 4 3.5 4.8 3.5 5.8S4.3 7.6 5.2 7.6 7 6.8 7 5.8 6.2 4 5.2 4ZM20 13.3c0-3-1.6-4.4-3.7-4.4-1.7 0-2.5 1-2.9 1.6V9H11v11h2.5v-6.1c0-1.6.3-3.1 2.3-3.1s2 1.8 2 3.2V20H20v-6.7Z" />
    </svg>
  );
}

function InstagramOutline() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="4" y="4" width="16" height="16" rx="5" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}
