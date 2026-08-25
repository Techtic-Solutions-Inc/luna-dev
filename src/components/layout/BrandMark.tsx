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
      <span className={`font-kalam ${compact ? "text-[28px] leading-none" : "text-[36px] leading-none"}`}>Agentwise</span>
      <span className="mt-4 text-logo-sub uppercase">Real Estate Marketing</span>
    </Link>
  );
}
