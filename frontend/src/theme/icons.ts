import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCheck,
  faChevronRight,
  faCircleExclamation,
  faEye,
  faEyeSlash,
  faSpinner,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

/**
 * Registers commonly used Font Awesome icons for the design system.
 * Import this module once at app bootstrap; use FontAwesomeIcon in components as needed.
 */
library.add(
  faCheck,
  faChevronRight,
  faCircleExclamation,
  faEye,
  faEyeSlash,
  faSpinner,
  faUser,
);

export {
  faCheck,
  faChevronRight,
  faCircleExclamation,
  faEye,
  faEyeSlash,
  faSpinner,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

export { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
