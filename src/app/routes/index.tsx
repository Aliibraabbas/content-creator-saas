import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { RegisterPage } from '@pages/register'
import { LoginPage } from '@pages/login'
import { DashboardPage } from '@pages/dashboard'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  )
}
