import { QueryProvider } from './query-provider'
import { AuthProvider } from './auth-provider'
import { ErrorBoundary } from './error-boundary'

interface AppProvidersProps {
  children: React.ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ErrorBoundary>
      <QueryProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </QueryProvider>
    </ErrorBoundary>
  )
}
