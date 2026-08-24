import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './home';
import { PlaceholderPage } from '../components/PlaceholderPage';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<PlaceholderPage title="About" />} />
        <Route path="/content" element={<PlaceholderPage title="Content" />} />
        <Route path="/blog" element={<PlaceholderPage title="Blog" />} />
        <Route path="/pricing" element={<PlaceholderPage title="Pricing" />} />
        <Route path="/contact" element={<PlaceholderPage title="Contact Us" />} />
        <Route path="/signin" element={<PlaceholderPage title="Log in" />} />
        <Route path="/signup" element={<PlaceholderPage title="Get Started" />} />
        <Route path="/learn-more" element={<PlaceholderPage title="Learn More" />} />
        <Route path="/privacy" element={<PlaceholderPage title="Privacy Policy" />} />
        <Route path="/terms" element={<PlaceholderPage title="Terms of Service" />} />
        <Route path="*" element={<PlaceholderPage title="Page Not Found" notFound />} />
      </Routes>
    </BrowserRouter>
  );
}
