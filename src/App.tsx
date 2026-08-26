import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { StubPage } from '@/pages/StubPage';

export default function App() {
  return (
    <Routes>
      <Route element={<HomePage />}>
        <Route index />
        <Route path="contact" />
      </Route>
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="/signin" element={<StubPage />} />
      <Route path="/signup" element={<StubPage />} />
      <Route path="/blog" element={<StubPage />} />
      <Route path="/content" element={<StubPage />} />
      <Route path="/pricing" element={<StubPage />} />
      <Route path="/privacy-policy" element={<StubPage />} />
      <Route path="/terms-of-service" element={<StubPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
