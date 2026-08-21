import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const NotFound = () => (
  <div className="flex min-h-screen flex-col items-center justify-center gap-gap-24 bg-color-23 px-padding-32 text-secondary">
    <h1 className="font-garamond text-heading-xl-45">404</h1>
    <p className="font-almarai text-body-34 text-color-14 text-center max-w-md">
      The page you are looking for does not exist.
    </p>
    <Link to="/">
      <Button aria-label="Return to home page">Back to Home</Button>
    </Link>
  </div>
);

export default NotFound;
