import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { authApi } from '../api/auth.api'
import { useAuthStore } from '../model/auth.store'
import type { LoginInput, RegisterInput } from '../model/auth.types'

export function useLogin() {
  const setUser = useAuthStore((state) => state.setUser)

  return useMutation({
    mutationFn: (credentials: LoginInput) => authApi.login(credentials),
    onSuccess: (data) => {
      setUser(data.user)
    },
  })
}

export function useRegister() {
  const setUser = useAuthStore((state) => state.setUser)

  return useMutation({
    mutationFn: (credentials: RegisterInput) => authApi.register(credentials),
    onSuccess: (data) => {
      setUser(data.user)
    },
  })
}

export function useLogout() {
  const logout = useAuthStore((state) => state.logout)

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      logout()
    },
  })
}

export function useSession() {
  const setUser = useAuthStore((state) => state.setUser)
  const setLoading = useAuthStore((state) => state.setLoading)

  const query = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const user = await authApi.getCurrentUser()
      return user
    },
    staleTime: Infinity,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  useEffect(() => {
    if (query.isSuccess) {
      setUser(query.data)
    } else if (query.isError) {
      setUser(null)
    }
    
    if (!query.isLoading) {
      setLoading(false)
    }
  }, [query.isSuccess, query.isError, query.isLoading, query.data, setUser, setLoading])

  return query
}
