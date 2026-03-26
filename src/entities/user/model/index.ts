export { userPreferencesSchema, DEFAULT_PREFERENCES } from './user.types'
export type { UserPreferences } from './user.types'
export {
  useUserPreferencesStore,
  selectTheme,
  selectDefaultViewMode,
  selectShowFavoritesOnlyByDefault,
  selectHasCustomPreferences,
  selectIsDefaultView,
} from './user-preferences.store'
