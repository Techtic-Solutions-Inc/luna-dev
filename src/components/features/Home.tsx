import { Link } from 'react-router-dom';
import { FaBeer } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

const Home = () => (
  <div className="flex flex-col items-center gap-6 px-8 py-16 text-center">
    <FaBeer className="h-10 w-10 text-accent" aria-hidden="true" />
    <h1 className="font-garamond text-3xl font-semibold text-secondary">Welcome</h1>
    <p className="max-w-lg font-almarai text-base text-muted-foreground">
      Explore featured content on the visitor home page or create an account to get started.
    </p>
    <div className="flex gap-4">
      <Button asChild>
        <Link to="/">Browse content</Link>
      </Button>
      <Button variant="outline" asChild>
        <Link to="/signup">Sign up</Link>
      </Button>
    </div>
  </div>
);

export default Home;
