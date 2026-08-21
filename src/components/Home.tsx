import { useAuth } from '../lib/auth/AuthProvider';
import ContentCalendar from './features/ContentCalendar';
import LoginForm from './features/LoginForm';

const Home = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <section className="flex flex-col gap-[var(--spacing-gap-24)]">
      <header className="flex flex-col gap-[var(--spacing-gap-8)]">
        <h1 className="font-heading text-[length:var(--typography-heading-xl-35-font-size)] font-medium leading-[var(--typography-heading-xl-35-line-height)] text-secondary">
          Content calendar
        </h1>
        <p className="text-[length:var(--typography-body-15-font-size)] leading-[var(--typography-body-15-line-height)] text-[color:var(--color-text-secondary)]">
          Active entries from the content calendar.
        </p>
      </header>
      <ContentCalendar />
    </section>
  );
};

export default Home;
