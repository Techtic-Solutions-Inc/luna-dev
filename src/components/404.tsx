import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="flex min-h-screen flex-col items-center justify-center gap-gap-16 bg-color-16 px-padding-24 text-secondary">
    <h1 className="font-garamond text-[80px] font-normal leading-[104.4px]">404</h1>
    <p className="font-garamond text-[30px] font-medium leading-[39.15px]">
      Page Not Found
    </p>
    <p className="max-w-md text-center font-almarai text-base leading-[26px] text-color-15">
      The page you are looking for does not exist or has been moved.
    </p>
    <Link
      to="/"
      className="rounded-radius-10000 bg-accent px-padding-24 py-padding-12 font-public-sans text-base font-semibold text-color-16 transition-[filter] hover:brightness-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:brightness-75"
      aria-label="Return to home page"
    >
      Back to Home
    </Link>
  </div>
);

export default NotFound;
