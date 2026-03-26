import { z } from 'zod'

export const userPreferencesSchema = z.object({
  theme: z.enum(['light', 'dark', 'system']),
  defaultViewMode: z.enum(['list', 'grid']),
  showFavoritesOnlyByDefault: z.boolean(),
})

export type UserPreferences = z.infer<typeof userPreferencesSchema>

export const DEFAULT_PREFERENCES: UserPreferences = {
  theme: 'system',
  defaultViewMode: 'list',
  showFavoritesOnlyByDefault: false,
}
