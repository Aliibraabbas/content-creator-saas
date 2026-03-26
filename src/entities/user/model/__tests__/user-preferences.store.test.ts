import { describe, it, expect, beforeEach } from 'vitest'
import {
  useUserPreferencesStore,
  selectHasCustomPreferences,
} from '../user-preferences.store'
import { DEFAULT_PREFERENCES } from '../user.types'

describe('User Preferences Store', () => {
  beforeEach(() => {
    const store = useUserPreferencesStore.getState()
    store.resetPreferences()
  })

  it('should have default preferences initially', () => {
    const state = useUserPreferencesStore.getState()
    expect(state.theme).toBe(DEFAULT_PREFERENCES.theme)
    expect(state.defaultViewMode).toBe(DEFAULT_PREFERENCES.defaultViewMode)
    expect(state.showFavoritesOnlyByDefault).toBe(DEFAULT_PREFERENCES.showFavoritesOnlyByDefault)
  })

  it('should update multiple preferences at once', () => {
    useUserPreferencesStore.getState().updatePreferences({
      theme: 'dark',
      defaultViewMode: 'grid',
      showFavoritesOnlyByDefault: true,
    })

    const state = useUserPreferencesStore.getState()
    expect(state.theme).toBe('dark')
    expect(state.defaultViewMode).toBe('grid')
    expect(state.showFavoritesOnlyByDefault).toBe(true)
  })

  it('should reset all preferences to defaults', () => {
    useUserPreferencesStore.getState().updatePreferences({
      theme: 'dark',
      defaultViewMode: 'grid',
      showFavoritesOnlyByDefault: true,
    })

    useUserPreferencesStore.getState().resetPreferences()

    const state = useUserPreferencesStore.getState()
    expect(state.theme).toBe(DEFAULT_PREFERENCES.theme)
    expect(state.defaultViewMode).toBe(DEFAULT_PREFERENCES.defaultViewMode)
    expect(state.showFavoritesOnlyByDefault).toBe(DEFAULT_PREFERENCES.showFavoritesOnlyByDefault)
  })

  it('should use derived state to detect custom preferences', () => {
    // Default preferences should return false
    expect(selectHasCustomPreferences(useUserPreferencesStore.getState())).toBe(false)

    // Modified preferences should return true
    useUserPreferencesStore.getState().setTheme('dark')
    expect(selectHasCustomPreferences(useUserPreferencesStore.getState())).toBe(true)
  })
})
