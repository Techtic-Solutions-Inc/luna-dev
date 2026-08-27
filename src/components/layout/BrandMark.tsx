import { Link } from "react-router-dom";

export function BrandMark({
  compact = false,
  align = "center",
  tone = "light",
}: {
  compact?: boolean;
  align?: "center" | "start";
  tone?: "light" | "accent";
}) {
  const color = tone === "accent" ? "text-accent" : "text-secondary";
  return (
    <Link
      to="/"
      className={`inline-flex flex-col transition hover:opacity-90 focus-visible:opacity-90 active:opacity-80 ${align === "start" ? "items-start text-left" : "items-center text-center"} ${color}`}
    >
      <span
        className={`${compact ? "text-[28px] leading-none" : "text-[36px] leading-none"}`}
        style={{ fontFamily: "'Kalam', cursive" }}
      >
        Agentwise
      </span>
      <span
        className="font-space-grotesk mt-4 text-logo-sub uppercase"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        Real Estate Marketing
      </span>
    </Link>
  );
}
