import { useNavigate } from 'react-router-dom';
import Button from './ui/Button';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-gap-16 bg-color-16 px-padding-24 text-center">
      <p className="typo-heading-xl-36 text-accent">404</p>
      <h1 className="typo-heading-lg-19 text-secondary">Page Not Found</h1>
      <p className="typo-body-15 text-color-15">The page you are looking for does not exist.</p>
      <Button type="button" onClick={() => navigate('/')}>
        Back to home
      </Button>
    </main>
  );
};

export default NotFound;
