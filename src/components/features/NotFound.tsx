import { Link } from 'react-router-dom';
import { PATHS } from '../../routes/paths';

const NotFound = () => (
  <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-color-32 p-8 text-center">
    <h1 className="font-garamond text-4xl text-color-20">404</h1>
    <p className="text-color-57">Page not found</p>
    <Link
      to={PATHS.HOME}
      className="text-accent underline-offset-2 hover:underline"
    >
      Go home
    </Link>
  </div>
);

export default NotFound;
