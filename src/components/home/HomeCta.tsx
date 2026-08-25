import { Link } from "react-router-dom";

const pill =
  "inline-flex h-44 items-center justify-center rounded-1000 px-24 text-almarai-16-bold transition focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2";

export function HomeCta({
  to = "/sign-up",
  children = "Get Started",
  variant = "solid",
}: {
  to?: string;
  children?: string;
  variant?: "solid" | "outline";
}) {
  const styles =
    variant === "solid"
      ? `${pill} bg-accent text-color-101 hover:bg-color-102 active:brightness-90 ring-offset-color-16`
      : `${pill} border border-secondary text-secondary hover:border-accent hover:text-accent active:bg-secondary/10 ring-offset-color-16`;
  return (
    <Link to={to} className={styles}>
      {children}
    </Link>
  );
}
