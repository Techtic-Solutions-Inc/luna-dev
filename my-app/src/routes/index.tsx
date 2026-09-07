import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NotFound from '@/components/404'
import Dashboard from '@/components/features/Dashboard'
import Home from '@/components/features/Home'
import AppShell from '@/components/layout/AppShell'
import ProtectedRoute from '@/components/layout/ProtectedRoute'
import VisitorHome from '@/routes/visitor/home'

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/visitor/home" element={<VisitorHome />} />
      <Route element={<AppShell />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </Router>
)

export default AppRouter
