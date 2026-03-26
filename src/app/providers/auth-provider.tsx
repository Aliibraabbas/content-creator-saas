import { useEffect } from 'react'
import { useSession, useAuthStore } from '@features/auth'
import { supabase } from '@shared/api'

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { isLoading } = useSession()

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        useAuthStore.getState().setUser(session.user)
      } else {
        useAuthStore.getState().logout()
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
