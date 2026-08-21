import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center gap-[var(--spacing-gap-16)] px-[var(--spacing-padding-24)] text-center">
      <p className="font-heading text-[length:var(--typography-heading-xl-36-font-size)] font-medium leading-[var(--typography-heading-xl-36-line-height)] text-accent">
        404
      </p>
      <h1 className="font-heading text-[length:var(--typography-heading-lg-19-font-size)] font-medium leading-[var(--typography-heading-lg-19-line-height)] text-secondary">
        404 - Not Found
      </h1>
      <p className="text-[length:var(--typography-body-15-font-size)] leading-[var(--typography-body-15-line-height)] text-[color:var(--color-text-secondary)]">
        The page you requested does not exist.
      </p>
      <Link
        to="/"
        className="rounded-[var(--radius-medium)] bg-accent px-[var(--spacing-padding-20)] py-[var(--spacing-padding-10)] text-[color:var(--color-color-16)]"
      >
        Back to home
      </Link>
    </section>
  );
};

export default NotFound;
