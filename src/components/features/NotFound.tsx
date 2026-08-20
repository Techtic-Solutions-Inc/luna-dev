import { useEffect, useRef } from 'react';
import { LuArrowRight } from 'react-icons/lu';
import { Link } from 'react-router-dom';

/** Catch-all screen for unknown routes. */
export function NotFound() {
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Move focus to the heading so screen readers announce the 404 on arrival.
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div className="surface-aurora flex min-h-screen flex-col items-center justify-center px-20 py-60 text-center">
      <p className="type-heading-xl-53 text-accent">404</p>

      <h1
        ref={headingRef}
        tabIndex={-1}
        className="type-heading-xl-44 mt-12 text-white outline-none tablet:text-heading-xl-46"
      >
        Page Not Found
      </h1>

      <p className="type-body-68 mt-16 max-w-[440px] text-white/70">
        The page you are looking for has moved or never existed. Head back to the homepage to keep
        building your marketing.
      </p>

      <Link
        to="/"
        className="type-body-sm-2 mt-30 inline-flex h-36 items-center gap-8 rounded-full bg-accent px-20 text-white transition-colors duration-200 hover:bg-color-30"
      >
        Back to home
        <LuArrowRight aria-hidden="true" size={16} />
      </Link>
    </div>
  );
}

export default NotFound;
