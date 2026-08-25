import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from '@/routes/Home';
import { InnerPage } from '@/routes/inner';
import { NotFound } from '@/components/404';
import { AppShell } from '@/components/layout/AppShell';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="/about" element={<InnerPage title="About">Agentwise is built for residential real estate agents who want marketing that actually matches their market.</InnerPage>} />
      <Route path="/content" element={<InnerPage title="Content">Browse the continuously updated collection of social, email, and listing templates.</InnerPage>} />
      <Route path="/blog" element={<InnerPage title="Blog">Stories, playbooks, and market notes from the Agentwise studio.</InnerPage>} />
      <Route path="/pricing" element={<InnerPage title="Pricing">Every plan includes a custom business dashboard and a personalized AI advisor.</InnerPage>} />
      <Route path="/contact" element={<Navigate to="/#contact" replace />} />
      <Route path="/learn-more" element={<Navigate to="/#learn-more" replace />} />
      <Route path="/signup" element={<InnerPage title="Get Started">Join the waitlist to be first in line when Agentwise opens in your market.</InnerPage>} />
      <Route path="/signin" element={<InnerPage title="Log in">Welcome back. Use your Agentwise email and password to continue.</InnerPage>} />
      <Route path="/privacy" element={<InnerPage title="Privacy Policy">We collect only what we need to deliver Agentwise and never sell your data.</InnerPage>} />
      <Route path="/terms" element={<InnerPage title="Terms of Service">By using Agentwise you agree to use the platform for lawful real estate marketing only.</InnerPage>} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <AppShell>
              <h1 className="font-serif text-4xl text-white">Dashboard</h1>
              <p className="mt-4 font-sans text-step-desc text-color-131">Your Agentwise workspace.</p>
            </AppShell>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRouter;
