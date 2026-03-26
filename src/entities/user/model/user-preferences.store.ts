import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserPreferences } from './user.types'
import { DEFAULT_PREFERENCES } from './user.types'

interface UserPreferencesState extends UserPreferences {
  setTheme: (theme: UserPreferences['theme']) => void
  setDefaultViewMode: (mode: UserPreferences['defaultViewMode']) => void
  setShowFavoritesOnlyByDefault: (show: boolean) => void
  updatePreferences: (preferences: Partial<UserPreferences>) => void
  resetPreferences: () => void
}

export const useUserPreferencesStore = create<UserPreferencesState>()(
  persist(
    (set) => ({
      ...DEFAULT_PREFERENCES,
      
      setTheme: (theme) => set({ theme }),
      setDefaultViewMode: (mode) => set({ defaultViewMode: mode }),
      setShowFavoritesOnlyByDefault: (show) => set({ showFavoritesOnlyByDefault: show }),
      
      updatePreferences: (preferences) => set((state) => ({
        ...state,
        ...preferences,
      })),
      
      resetPreferences: () => set(DEFAULT_PREFERENCES),
    }),
    {
      name: 'user-preferences',
    }
  )
)

export const selectTheme = (state: UserPreferencesState) => state.theme
export const selectDefaultViewMode = (state: UserPreferencesState) => state.defaultViewMode
export const selectShowFavoritesOnlyByDefault = (state: UserPreferencesState) => state.showFavoritesOnlyByDefault

export function selectHasCustomPreferences(state: UserPreferencesState): boolean {
  return (
    state.theme !== DEFAULT_PREFERENCES.theme ||
    state.defaultViewMode !== DEFAULT_PREFERENCES.defaultViewMode ||
    state.showFavoritesOnlyByDefault !== DEFAULT_PREFERENCES.showFavoritesOnlyByDefault
  )
}

export function selectIsDefaultView(state: UserPreferencesState): boolean {
  return state.defaultViewMode === 'list'
}
