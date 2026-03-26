import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUserPreferencesStore, userPreferencesSchema } from '@entities/user'
import type { UserPreferences } from '@entities/user'
import { Button, Form, FormField, FormLabel, FormMessage } from '@shared/ui'

export function PreferencesForm() {
  const preferences = useUserPreferencesStore()
  const updatePreferences = useUserPreferencesStore((state) => state.updatePreferences)
  const resetPreferences = useUserPreferencesStore((state) => state.resetPreferences)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserPreferences>({
    resolver: zodResolver(userPreferencesSchema),
    defaultValues: {
      theme: preferences.theme,
      defaultViewMode: preferences.defaultViewMode,
      showFavoritesOnlyByDefault: preferences.showFavoritesOnlyByDefault,
    },
  })

  const onSubmit: SubmitHandler<UserPreferences> = (data) => {
    updatePreferences(data)
    alert('Preferences saved successfully!')
  }

  const handleReset = () => {
    resetPreferences()
    reset({
      theme: 'system',
      defaultViewMode: 'list',
      showFavoritesOnlyByDefault: false,
    })
    alert('Preferences reset to defaults!')
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        <FormField>
          <FormLabel htmlFor="theme">Theme</FormLabel>
          <select
            id="theme"
            {...register('theme')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
          {errors.theme && <FormMessage>{errors.theme.message}</FormMessage>}
        </FormField>

        <FormField>
          <FormLabel htmlFor="defaultViewMode">Default View Mode</FormLabel>
          <select
            id="defaultViewMode"
            {...register('defaultViewMode')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="list">List</option>
            <option value="grid">Grid</option>
          </select>
          {errors.defaultViewMode && <FormMessage>{errors.defaultViewMode.message}</FormMessage>}
        </FormField>

        <FormField>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="showFavoritesOnlyByDefault"
              {...register('showFavoritesOnlyByDefault')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <FormLabel htmlFor="showFavoritesOnlyByDefault" className="ml-2 mb-0">
              Show favorites only by default
            </FormLabel>
          </div>
          {errors.showFavoritesOnlyByDefault && (
            <FormMessage>{errors.showFavoritesOnlyByDefault.message}</FormMessage>
          )}
        </FormField>

        <div className="flex gap-4 pt-4">
          <Button type="submit" isLoading={isSubmitting} className="flex-1">
            Save Preferences
          </Button>
          <Button type="button" variant="secondary" onClick={handleReset} className="flex-1">
            Reset to Defaults
          </Button>
        </div>
      </div>
    </Form>
  )
}
