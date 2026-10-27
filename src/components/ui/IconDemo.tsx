import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

export function IconDemo() {
  return (
    <div className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm text-card-foreground">
      <FontAwesomeIcon icon={faCoffee} aria-hidden="true" />
      <span>Font Awesome is configured.</span>
    </div>
  );
}
