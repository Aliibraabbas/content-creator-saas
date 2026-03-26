export { userPreferencesSchema, DEFAULT_PREFERENCES } from './model'
export type { UserPreferences } from './model'
export {
  useUserPreferencesStore,
  selectTheme,
  selectDefaultViewMode,
  selectShowFavoritesOnlyByDefault,
  selectHasCustomPreferences,
  selectIsDefaultView,
} from './model'
