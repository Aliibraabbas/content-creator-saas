import type { User } from '@supabase/supabase-js'

export function createMockUser(overrides?: Partial<User>): User {
  const defaultUser: User = {
    id: 'test-user-id',
    email: 'test@example.com',
    aud: 'authenticated',
    role: 'authenticated',
    created_at: new Date().toISOString(),
    app_metadata: {},
    user_metadata: {},
    updated_at: new Date().toISOString(),
    email_confirmed_at: new Date().toISOString(),
    phone: undefined,
    confirmed_at: new Date().toISOString(),
    last_sign_in_at: new Date().toISOString(),
    identities: [],
    factors: [],
  }

  return {
    ...defaultUser,
    ...overrides,
  }
}
