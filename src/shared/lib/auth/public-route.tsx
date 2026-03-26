import { Navigate } from 'react-router-dom'
import { useAuthStore, selectIsAuthenticated } from '@features/auth'

interface PublicRouteProps {
  children: React.ReactNode
}

export function PublicRoute({ children }: PublicRouteProps) {
  const isAuthenticated = useAuthStore(selectIsAuthenticated)

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}
