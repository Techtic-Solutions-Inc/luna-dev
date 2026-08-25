import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from '@/routes/index';

export default function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}
