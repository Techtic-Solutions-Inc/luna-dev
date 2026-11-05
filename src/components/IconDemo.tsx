import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

/** JAW-9705 Font Awesome acceptance demo (hidden from layout, used in tests). */
export function IconDemo() {
  return (
    <VisuallyHidden aria-hidden>
      <FontAwesomeIcon icon={faCoffee} />
    </VisuallyHidden>
  );
}
