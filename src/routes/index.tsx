import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../components/features/Home';
import NotFound from '../components/features/NotFound';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default AppRouter;
