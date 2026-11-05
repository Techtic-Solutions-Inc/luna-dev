import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope } from "@fortawesome/free-solid-svg-icons";

/** JAW-9705 Font Awesome acceptance demo (hidden from layout, used in tests). */
export function IconDemo() {
  return (
    <span aria-hidden className="sr-only">
      <FontAwesomeIcon icon={faUser} />
      <FontAwesomeIcon icon={faEnvelope} />
    </span>
  );
}
