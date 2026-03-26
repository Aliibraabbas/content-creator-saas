import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { RegisterPage } from '@pages/register'
import { LoginPage } from '@pages/login'
import { DashboardPage } from '@pages/dashboard'
import { SettingsPage } from '@pages/settings'
import { ContentDetailPage } from '@pages/content-detail'
import { ContentCreatePage } from '@pages/content-create'
import { ContentEditPage } from '@pages/content-edit'
import { ProtectedRoute, PublicRoute } from '@shared/lib/auth'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route 
          path="/register" 
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          } 
        />
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/settings" 
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/content/new" 
          element={
            <ProtectedRoute>
              <ContentCreatePage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/content/:id" 
          element={
            <ProtectedRoute>
              <ContentDetailPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/content/:id/edit" 
          element={
            <ProtectedRoute>
              <ContentEditPage />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  )
}
