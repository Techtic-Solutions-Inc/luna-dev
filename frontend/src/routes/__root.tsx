import { Navigate, Route, Routes } from 'react-router-dom'
import EmailVerification from './EmailVerification'
import ForgotPassword from './ForgotPassword'
import Home from './Home'

export default function RootRoutes() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/email-verification" element={<EmailVerification />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  )
}
