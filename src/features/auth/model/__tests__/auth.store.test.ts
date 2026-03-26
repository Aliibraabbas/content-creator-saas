import { describe, it, expect, beforeEach } from 'vitest'
import { useAuthStore, selectIsAuthenticated } from '../auth.store'
import { createMockUser } from '@shared/test/mocks'

describe('Auth Store', () => {
  beforeEach(() => {
    const store = useAuthStore.getState()
    store.logout()
  })

  it('should have null user and not authenticated initially', () => {
    const state = useAuthStore.getState()
    expect(state.user).toBeNull()
    expect(state.isAuthenticated).toBe(false)
  })

  it('should set user and mark as authenticated', () => {
    const mockUser = createMockUser({
      id: 'user-123',
      email: 'test@example.com',
    })

    useAuthStore.getState().setUser(mockUser)

    const state = useAuthStore.getState()
    expect(state.user).toEqual(mockUser)
    expect(state.isAuthenticated).toBe(true)
  })

  it('should clear user on logout', () => {
    const mockUser = createMockUser({
      id: 'user-123',
      email: 'test@example.com',
    })

    useAuthStore.getState().setUser(mockUser)
    expect(useAuthStore.getState().isAuthenticated).toBe(true)

    useAuthStore.getState().logout()

    const state = useAuthStore.getState()
    expect(state.user).toBeNull()
    expect(state.isAuthenticated).toBe(false)
  })

  it('should use selector to check authentication status', () => {
    expect(selectIsAuthenticated(useAuthStore.getState())).toBe(false)

    const mockUser = createMockUser({
      id: 'user-123',
      email: 'test@example.com',
    })
    useAuthStore.getState().setUser(mockUser)

    expect(selectIsAuthenticated(useAuthStore.getState())).toBe(true)
  })
})
